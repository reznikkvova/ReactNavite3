import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { putUser } from '../../../db/DAO';
import User from 'db/entities/User';

const register: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const user = new User(event.body.id, event.body.role)
  const d = await putUser(user);
  return formatJSONResponse({data:d, event});
}

export const main = middyfy(register);
