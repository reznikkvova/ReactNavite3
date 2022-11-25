/* eslint-disable */
export default class Log{
  constructor(
    public category = 'log',
    public id:string,
    public asset_tag: string, 
    public date:string, 
    public tech: string, 
    public description: string,
    public problemType: string,
    ){}
}