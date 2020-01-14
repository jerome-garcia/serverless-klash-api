import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    IndexName: 'hashGSI-points-index',
    KeyConditionExpression: 'hashGSI = :hash',
    ExpressionAttributeValues: { ':hash': 'USER' },
    ScanIndexForward: false
  };

  try {
    const result = await call("query", params);

    return success(result.Items);
  } catch (e) {
    return failure({
      status: false
    });
  }
}