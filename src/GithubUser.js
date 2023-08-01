export class GithubUser {
  constructor() {
    this.endpoint = `https://api.github.com/users/`
  }

  static async getUserinfo(username) {
    const userinfoEndpoint = `https://api.github.com/users/${username}`

    const reqData = await fetch(userinfoEndpoint)
    const { login, name, public_repos, followers } = await reqData.json()

    return { login, name, public_repos, followers }
  }
}
