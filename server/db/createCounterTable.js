// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
const { REGION, APIVERSION } = require("./config");

AWS.config.update({ region: REGION });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB(APIVERSION);

var params = {
  AttributeDefinitions: [
    {
      AttributeName: "counterId",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "counterId",
      KeyType: "HASH",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "counterTable",
  StreamSpecification: {
    StreamEnabled: false,
  },
};

// Call DynamoDB to create the table
ddb.createTable(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});
