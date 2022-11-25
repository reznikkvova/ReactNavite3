import dynamo from '../connection/connectionService';
import Commentx from '../entities/comments';

const docClient = dynamo;
const tableName = 'p2-stuff';

export default async function addComment(com:Commentx): Promise<string> {
    const params = {
      TableName: tableName,
      Item: {
        'category': 'comment',
        'id': com.id,
        'memo_id': com.memo_id,
        'date': com.date,
        'user': com.user,
        'message': com.message,
      },
    };
    const data = await docClient.put(params).promise();
    console.log('Added item:', JSON.stringify(data, null, 2));
    if(data) {
      return 'success';
    }
    return 'failed';
  }