import uuid from "uuid";
import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import { createDeflate } from "zlib";


export async function main(event, context) {
    console.log(event.body);
    const data = JSON.parse(event.body);
    const params = {
        TableName: "trails",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            entryId: uuid.v1(),
            trailId: data.trailId,
            trailStatus: data.trailStatus,
            userComment: data.userComment,
            createdAt: Date.now()
        }
    };
    console.log("Middle")
    try {
        await dynamoDbLib.call("put", params);
        console.log("success")
        return success(params.Item);
    } catch(e) {
        console.log(e);
        return failure({status:false});
    }
}