import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import addRegister from '../../../db/DAO/register';
import Register from 'db/entities/register';

const aRegister: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const r = new Register(
    'register',
    event.body.id,
    event.body.password,
    event.body.name,
    event.body.role,
    event.body.status
  );
  const d = await addRegister(r);
  return formatJSONResponse({data:d, event});
}

export const main = middyfy(aRegister);
