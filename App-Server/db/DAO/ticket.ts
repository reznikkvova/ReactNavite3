import dynamo from '../connection/connectionService';
import Tickets from '../entities/tickets';

const docClient = dynamo;
const tableName = 'p2-stuff';

export default async function addTicket(ticket:Tickets): Promise<string> {
    const params = {
      TableName: tableName,
      Item: {
        'category': 'ticket',
        'id': ticket.id,
        'date': ticket.date,
        'asset_tag': ticket.asset_tag,
        'issue': ticket.issue,
        'room': ticket.room,
        'technician': ticket.technician,
        'status': ticket.status,
      },
    };
    const data = await docClient.put(params).promise();
    console.log('Added item:', JSON.stringify(data, null, 2));
    if(data) {
      return 'success';
    }
    return 'failed';
  }