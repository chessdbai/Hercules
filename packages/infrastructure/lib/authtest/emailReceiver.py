import boto3
import json

def handle(event, context):
  print('Received event:')
  print(json.dumps(event))