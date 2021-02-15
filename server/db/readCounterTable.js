// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
const { REGION, APIVERSION } = require("./config");

AWS.config.update({ region: REGION });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB(APIVERSION);

var params = {
  TableName: "counterTable",
  Key: {
    counterId: { S: "visitors" },
  },
};

// Call DynamoDB to read the item from the table
ddb.getItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Item);
  }
});
