import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getAll } from '../../../db/DAO';

const register: ValidatedEventAPIGatewayProxyEvent<never> = async (event) => {
  const d = await getAll('register');
  return formatJSONResponse({data:d, event});
}

export const main = middyfy(register);
