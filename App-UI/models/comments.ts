export default class Commentx {
    constructor(
      public category = 'comment',
      public id: string,
      public memo_id: string,
      public date: string,
      public user: string,
      public message:string,
    ) {}
  }
  