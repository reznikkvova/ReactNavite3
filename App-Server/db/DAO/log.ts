import dynamo from '../connection/connectionService';
import Log from '../entities/log';

const docClient = dynamo;
const tableName = 'p2-stuff';

export default async function addLog(log:Log): Promise<string> {
    const params = {
      TableName: tableName,
      Item: {
        'category': 'log',
        'id': log.id,
        'asset_tag': log.asset_tag,
        'date': log.date,
        'tech': log.tech,
        'problemType': log.problemType,
        'description': log.description,
      },
    };
    const data = await docClient.put(params).promise();
    console.log('Added item:', JSON.stringify(data, null, 2));
    if(data) {
      return 'success';
    }
    return 'failed';
  }