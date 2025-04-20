export class LoginMoldel {
  constructor(public username: string,
              private _token: string,
              private _tokenExpiredDate: Date) {
  }

  get token() {
    let now = new Date();
    if (!this._tokenExpiredDate || now > this._tokenExpiredDate)
      return null;
    return this._token;
  }
}
