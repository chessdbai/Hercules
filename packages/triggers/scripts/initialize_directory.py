import boto3
from datetime import datetime

dev = boto3.session.Session(profile_name='zugzwang-app')
clouddir = dev.client('clouddirectory')

print('Creating schema...')
# Create Schema
create_response = clouddir.create_schema(
  Name='ZugzwangStudyData'
)
dev_schema_arn = create_response['SchemaArn']
print('Created schema: ' + dev_schema_arn + '. Uploading schema JSON...')
with open('zugzwang-schema.json', 'r') as file:
    schema_data = file.read()
response = clouddir.put_schema_from_json(
    SchemaArn=dev_schema_arn,
    Document=schema_data
)

print('Publishing schema...')
response = clouddir.publish_schema(
    DevelopmentSchemaArn=dev_schema_arn,
    Version='1.0',
    MinorVersion='001',
    Name='ZugzwangStudyData-prod'
)
published_arn = response['PublishedSchemaArn']
print('Published schema: ' + published_arn + '. Creating directory...')
response = clouddir.create_directory(
    Name='ZugzwangStudyDatabase',
    SchemaArn=published_arn
)
directory_arn = response['DirectoryArn']
root_id = response['ObjectIdentifier']
applied_arn = response['AppliedSchemaArn']

print('Creating users bucket...')

response = clouddir.create_object(
    DirectoryArn=directory_arn,
    ParentReference={
        'Selector': '$' + root_id
    },
    SchemaFacets=[
        {
            'SchemaArn': applied_arn,
            'FacetName': 'UserBucket'
        },
    ],
    ObjectAttributeList=[
        {
            'Key': {
                'SchemaArn': applied_arn,
                'FacetName': 'UserBucket',
                'Name': 'createDate'
            },
            'Value': {
                'DatetimeValue': datetime(2015, 1, 1)
            }
        },
    ],
    LinkName='users'
)