import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (_) {
      return null
    }
  }

  constructor ({ user_id, email, username, exp }) { // eslint-disable-line camelcase
    this.id = user_id // eslint-disable-line camelcase
    this.email = email
    this.username = username
    this.exp = exp
  }

  tokenActive () {
    let date = new Date()
    let timeNow = date.getTime()
    return this.exp > timeNow
  }
}
