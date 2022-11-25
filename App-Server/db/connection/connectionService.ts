var AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-2',
  endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
  apiVersion: 'latest',
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
}); 

export default docClient;
