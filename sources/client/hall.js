console.log(localStorage)

document.querySelector(".buying__info-title").textContent =
  localStorage.getItem("filmName")
document
  .querySelector(".buying__info-start")
  .insertAdjacentText("beforeend", localStorage.getItem("seanceStart"))
document.querySelector(".buying__info-hall").textContent =
  localStorage.getItem("hallName")

// Получение актуальной схемы посадочных мест (Стабильно возвращает null)
async function getConfig() {
  const response = await fetch("https://jscp-diplom.netoserver.ru/", {
    method: "POST",
    body: `event=get_hallConfig&timestamp=${localStorage.getItem(
      "timestamp"
    )}&hallId=${localStorage.getItem("hallId")}&seanceId=${localStorage.getItem(
      "seanceId"
    )}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })

  return await response.json()
}

let config = getConfig().then((data) => console.log(data))

Array.from(
  document
    .querySelector(".conf-step__wrapper")
    .querySelectorAll(".conf-step__chair")
).forEach((element) => {
  if (element.classList.contains("conf-step__chair_taken")) {
    element.style.cursor = "default"
  }

  element.onclick = function () {
    if (element.classList.contains("conf-step__chair_taken")) {
      return false
    }

    if (element.classList.contains("conf-step__chair_selected")) {
      element.classList.remove("conf-step__chair_selected")
    } else {
      element.classList.add("conf-step__chair_selected")
    }
  }
})

document
  .querySelector(".acceptin-button")
  .addEventListener("click", (event) => {
    Array.from(
      document
        .querySelector(".conf-step__wrapper")
        .querySelectorAll(".conf-step__chair_selected")
    ).forEach((element) => {
      element.classList.remove("conf-step__chair_selected")
      element.classList.add("conf-step__chair_taken")
    })

    //     //     // fetch("https://jscp-diplom.netoserver.ru/", {
    //     //     // method: "POST",
    //     //     // body: "event=sale_add&timestamp=${value1}&hallId=${value2}&seanceId=${value3}&hallConfiguration=${value4}",
    //     //     // headers: {
    //     //     //   "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    //     //     // }
    //     //   })
  })
