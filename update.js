import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "trails",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            entryId: event.pathParameters.entryId
        },
        UpdateExpression: "SET trailId = :trailId, userComment = :userComment, trailStatus = :trailStatus",
        ExpressionAttributeValues: {
            ":trailId": data.trailId || null,
            ":userComment": data.userComment || null,
            ":trailStatus": data.trailStatus || null
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        return success({status: true});
    } catch (e) {
        console.log(e);
        return failure({status:false});
    }
}