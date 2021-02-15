// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
// Set the region
const { REGION, APIVERSION } = require("../config");

AWS.config.update({ region: REGION });

// Create the DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient(APIVERSION);

const incrementCounter = (event, context, callback) => {
  const params = {
    TableName: "counterTable",
    Key: {
      counterId: "visitors",
    },
    UpdateExpression: "set counterValue = counterValue + :val",
    ExpressionAttributeValues: {
      ":val": 1,
    },
    ReturnValues: "UPDATED_NEW",
  };

  docClient.update(params, function (err, data) {
    if (err) {
      console.log(
        "Unable to update: " + "\n" + JSON.stringify(err, undefined, 2)
      );
    } else {
      const result = JSON.stringify(data, undefined, 2);
      console.log("Increase Rating succeeded: " + "\n" + result);
    }
  });
};

module.exports = incrementCounter;
