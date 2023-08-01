import { Gitfav } from "./Gitfav.js"

const searchBtn = document.querySelector("#search-btn")

searchBtn.addEventListener("mouseover", () => {
  document.querySelector(".button-star").classList.add("display-none")
  document.querySelector(".button-star-hover").classList.remove("display-none")
})

searchBtn.addEventListener("mouseleave", () => {
  document.querySelector(".button-star-hover").classList.add("display-none")
  document.querySelector(".button-star").classList.remove("display-none")
})

new Gitfav("#main-tb")
