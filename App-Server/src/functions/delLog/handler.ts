import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { deletStuff } from '../../../db/DAO';

const dLog: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const d = await deletStuff(event.body.id, 'log');
  return formatJSONResponse({data:d, event});
}

export const main = middyfy(dLog);
