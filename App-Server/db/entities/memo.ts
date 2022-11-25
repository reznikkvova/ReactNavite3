export default class Memo {
  constructor(
    public category = 'memo',
    public id: string,
    public date: string,
    public user: string,
    public message:string,
  ) {}
}
