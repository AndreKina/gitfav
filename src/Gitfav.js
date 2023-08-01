import { GithubUser } from "./GithubUser.js"

export class Gitfav {
  constructor(table) {
    this.table = document.querySelector(table)
    this.tbody = this.table.querySelector("tbody")
    this.insertBtn = document.querySelector("#search-btn")
    this.insertInput = document.querySelector("#gitfav-search")

    this.localStorageKey = "@github-fav:"

    this.entries = this.load()
    this.updateTb()
    this.onAdd()
  }

  // add event listener to btn
  onAdd() {
    this.insertBtn.addEventListener("click", () => {
      const { value } = this.insertInput

      this.addGitFav(value)
    })
  }

  async addGitFav(username) {
    try {
      // check if user already exists
      const userExists = this.entries.find((entry) => {
        return entry.login.toUpperCase() === username.toUpperCase()
      })
      if (userExists) {
        throw new Error("Usuário já cadastrado")
      }

      const githubUser = await GithubUser.getUserinfo(username)

      if (githubUser === undefined || !githubUser) {
        throw new Error("Usuário não encontrado")
      }

      this.entries = [githubUser, ...this.entries]
      this.updateTb()
    } catch (err) {
      alert(err.message)
    }
  }

  save() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.entries))
  }

  // update table
  updateTb() {
    // remove previous entries
    this.removeAllTr()

    // create new element and append
    this.entries.forEach(({ login, name, public_repos, followers }) => {
      const row = this.createRow(login, name, public_repos, followers)

      row.querySelector(".remove").addEventListener("click", () => {
        const isOk = confirm(
          `Tem certeza que deseja deletar o usuário ${login} ?`
        )

        if (isOk) {
          this.delete(login)
        }
      })

      this.tbody.append(row)
    })

    this.save()
  }

  // retrieves data from local storage
  load() {
    return JSON.parse(localStorage.getItem(this.localStorageKey)) || []
  }

  async getUser() {}

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove()
    })
  }

  delete(login) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== login
    )
    this.entries = filteredEntries

    this.updateTb()
  }

  createRow(login, name, public_repos, followers) {
    const tr = document.createElement("tr")
    tr.innerHTML = `
    <td class="user">
                <img
                  src="https://github.com/${login}.png"
                  alt="Imagem do usuário ${name}"
                />
                <div>
                  <a href="https://github.com/${login}" target="_blank">
                    <p>${name}</p>
                    <span>/${name}</span>
                  </a>
                </div>
              </td>
              <td>${public_repos}</td>
              <td>${followers}</td>
              <td><span class="remove">Remover</span></td>
    `

    return tr
  }
}
