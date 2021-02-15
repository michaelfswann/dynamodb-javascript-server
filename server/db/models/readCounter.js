// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
// Set the region
const { REGION, APIVERSION } = require("../config");

AWS.config.update({ region: REGION });

// Create DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient(APIVERSION);

const getCounter = (event, context, callback) => {
  const params = {
    TableName: "counterTable",
    Key: {
      counterId: "visitors",
    },
  };

  return docClient
    .get(params)
    .promise()
    .then((res) => {
      if (res.Item) {
        return res.Item;
      }
    });
};

module.exports = getCounter;
