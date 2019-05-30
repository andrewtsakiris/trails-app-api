import uuid from "uuid";
import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import { createDeflate } from "zlib";


export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "trails",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            entryId: uuid.v1(),
            trailId: data.trailId,
            status: data.status,
            comment: data.comment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch(e) {
        return failure({status:false});
    }
}