import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import addMemo from '../../../db/DAO/memo';
import Memo from 'db/entities/memo';
// import Memo from 'db/entities/memo';

const aMemo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const m = new Memo(
    'memo',
    event.body.id,
    event.body.date,
    event.body.user,
    event.body.message
  );
  const d = await addMemo(m);
  return formatJSONResponse({data:d, event});
}

export const main = middyfy(aMemo);
