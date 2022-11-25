/* eslint-disable */
export default class Tickets {
  constructor(
    public category = 'ticket',
    public id: string,
    public date: string,
    public asset_tag: string,
    public issue: string,
    public room:string,
    public technician:string,
    public status:string = 'waiting' || 'fixing' || 'resolved',
  ) {}
}