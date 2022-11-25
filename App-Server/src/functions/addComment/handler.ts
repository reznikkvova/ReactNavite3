import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import addComment from '../../../db/DAO/comment';
import Commentx from 'db/entities/comments';
// import Memo from 'db/entities/memo';

const aComment: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const m = new Commentx(
    'comment',
    event.body.id,
    event.body.memo_id,
    event.body.date,
    event.body.user,
    event.body.message
  );
  const d = await addComment(m);
  return formatJSONResponse({data:d, event});
}

export const main = middyfy(aComment);
