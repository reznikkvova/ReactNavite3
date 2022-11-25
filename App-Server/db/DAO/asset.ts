import dynamo from '../connection/connectionService';
import Asset from '../entities/asset';

const docClient = dynamo;
const tableName = 'p2-stuff';

export default async function addAsset(asset:Asset): Promise<string> {
    const params = {
      TableName: tableName,
      Item: {
        'category': 'asset',
        'id': asset.id,
        'asset_tag': asset.asset_tag,
        'assignee': asset.assignee,
        'date_decomission': asset.date_decomission,
        'date_issued': asset.date_issued,
        'department': asset.department,
        'deviceGroup': asset.deviceGroup,
        'roomNumber': asset.roomNumber,
        'typeOS': asset.typeOS,
        'model': asset.model,
      },
    };
    const data = await docClient.put(params).promise();
    console.log('Added item:', JSON.stringify(data, null, 2));
    if(data) {
      return 'success';
    }
    return 'failed';
  }