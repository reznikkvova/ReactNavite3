import dynamo from '../connection/connectionService';
import Memo from '../entities/memo';

const docClient = dynamo;
const tableName = 'p2-stuff';

export default async function addMemo(memo:Memo): Promise<string> {
    const params = {
      TableName: tableName,
      Item: {
        'category': 'memo',
        'id': memo.id,
        'date': memo.date,
        'user': memo.user,
        'message': memo.message,
      },
    };
    const data = await docClient.put(params).promise();
    console.log('Added item:', JSON.stringify(data, null, 2));
    if(data) {
      return 'success';
    }
    return 'failed';
  }