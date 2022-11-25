import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
// eslint-disable-next-line max-len
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => ({
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'content-type, X-Amx-Date, Authorization, X-Api-Key, X-Amx-Security-Token, X-Amz-User-Agent',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIOMS',
  },
  body: JSON.stringify(response),
});
