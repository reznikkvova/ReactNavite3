import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import addTicket from '../../../db/DAO/ticket';
import Tickets from 'db/entities/tickets';

const aTicket: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const t = new Tickets(
    'ticket',
    event.body.id,
    event.body.date,
    event.body.asset_tag,
    event.body.issue,
    event.body.room,
    event.body.technician,
    event.body.status
  );
  const d = await addTicket(t);
  return formatJSONResponse({data:d, event});
}

export const main = middyfy(aTicket);
