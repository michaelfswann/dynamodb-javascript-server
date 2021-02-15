// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
const { REGION, APIVERSION } = require("./config");

AWS.config.update({ region: REGION });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB(APIVERSION);

var params = {
  TableName: "counterTable",
  Item: {
    counterId: { S: "visitors" },
    counterValue: { N: "0" },
  },
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
