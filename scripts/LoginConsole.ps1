#!/usr/bin/env pwsh
param (
    [Parameter(Mandatory=$true)][string]$profile
)

$TokenHopperRoleName = "TokenHopperConsoleRole"

Import-Module AWS.Tools.SecurityToken
Import-Module AWS.Tools.IdentityManagement

Function Create-SelfTrustingAssumeRolePolicyDocument {
  $callerId = Get-STSCallerIdentity
  $accountId = $callerId.Account
  $trustPolicy = @"
{
    `"Version`": `"2012-10-17`",
    `"Statement`": [
      {
        `"Effect`": `"Allow`",
        `"Principal`": {
          `"AWS`": `"arn:aws:iam::$accountId`:root`"
        },
        `"Action`": `"sts:AssumeRole`"
      }
    ]
  }
"@
  $trustPolicy
}

Function Check-ConsoleRoleExists {
  try {
    Get-IAMRole -RoleName $TokenHopperRoleName
    $True
  } catch {
    $False
  }
}

Function Create-ConsoleRole {
  $trustPolicy = Create-SelfTrustingAssumeRolePolicyDocument
  New-IAMRole `
      -Path '/' `
      -RoleName $TokenHopperRoleName `
      -AssumeRolePolicyDocument $trustPolicy `
      -Description "Role for Console access via the Token Hopper tool." `
      -MaxSessionDuration 43200
  Register-IAMRolePolicy `
      -RoleName TokenHopperConsoleRole `
      -PolicyArn "arn:aws:iam::aws:policy/AdministratorAccess"
}

Function Get-ConsoleLoginRole {
  Write-Host "Checking if TokenHopper console login IAM role already exists..."
  $roleExists = Check-ConsoleRoleExists
  if ($roleExists -eq $False) {
    Write-Host "Role does not exists, creating role."
    Create-ConsoleRole
  }
  $callerId = Get-STSCallerIdentity
  $accountId = $callerId.Account
  $roleArn = "arn:aws:iam::$accountId`:role/$TokenHopperRoleName"
  Write-Host "Using role $roleArn"
  $roleArn.ToString()
}

Set-AWSCredential -ProfileName $profile
Set-DefaultAWSRegion -Region us-east-2

$roleArn = Get-ConsoleLoginRole
$roleResponse = Use-STSRole -RoleArn $roleArn `
    -RoleSessionName pwsh-console `
    -DurationInSeconds 43200
$roleCreds = $roleResponse.Credentials
$accessKeyId = $roleCreds.AccessKeyId
$secretAccessKey = $roleCreds.SecretAccessKey
$sessionToken = $roleCreds.SessionToken
$loginJson = @"
{"sessionId":"$accessKeyId",
"sessionKey":"$secretAccessKey",
"sessionToken":"$sessionToken"}
"@
$encodedLoginJson = [System.Web.HTTPUtility]::UrlEncode($loginJson)

$federationUri = "https://signin.aws.amazon.com/federation?Action=getSigninToken&SessionDuration=43200&Session=$encodedLoginJson"
$federationResponse = Invoke-RestMethod -Method GET -Uri $federationUri
$signinToken = $federationResponse.SigninToken
$issuer = "tokens.chessdb.ai"
$destination = "https://us-east-2.console.aws.amazon.com/codesuite/codepipeline/start?region=us-east-2"

$encodedIssuer = [System.Web.HTTPUtility]::UrlEncode($issuer)
$encodedDestination = [System.Web.HTTPUtility]::UrlEncode($destination)

$signinUrl = "https://signin.aws.amazon.com/federation?Action=login&Issuer=$encodedIssuer&SigninToken=$signinToken&Destination=$encodedDestination"
Write-Host "Federated sign-in URL:"
Write-Host $signinUrl
$escapedUrl = [System.Web.HTTPUtility]::UrlEncode($signinUrl)
$privateArg = "ext+container:name=$Profile&url=$escapedUrl"
[System.Diagnostics.Process]::Start([System.Diagnostics.ProcessStartInfo] @{ FileName = '/Applications/Firefox.app/Contents/MacOS/firefox'; Arguments = @($privateArg) })