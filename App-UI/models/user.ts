export default class User {
  constructor(
    public id: string,
    public role = 'tech' || 'admin' || 'user',
  ) {}
}