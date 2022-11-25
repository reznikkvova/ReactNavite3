import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import addAsset from '../../../db/DAO/asset';
import Asset from 'db/entities/asset';

const aAsset: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const as = new Asset(
    'asset',
    event.body.id,
    event.body.assetName,
    event.body.asset_tag,
    event.body.deviceGroup,
    event.body.model,
    event.body.assignee,
    event.body.date_issued,
    event.body.date_decomission,
    event.body.department,
    event.body.typeOS,
    event.body.roomNumber,
    event.body.make,
  );
  const d = await addAsset(as);
  return formatJSONResponse({data:d, event});
}

export const main = middyfy(aAsset);
