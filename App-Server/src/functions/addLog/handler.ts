import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import addLog from '../../../db/DAO/log';
import Log from 'db/entities/log';

const aLog: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const l = new Log(
    'log',
    event.body.id,
    event.body.asset_tag,
    event.body.date,
    event.body.tech,
    event.body.description,
    event.body.problemType
  );
  const d = await addLog(l);
  return formatJSONResponse({data:d, event});
}

export const main = middyfy(aLog);
