import { BASE_URL } from "./config.js";
export function reto2() {
  const $customSelect = document.querySelectorAll(".custom-select");

  // FETCH al enpoint
  fetch(BASE_URL + "/challenges/reto2", { credentials: "include" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("No connection, something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.items);
    })
    .catch((error) => console.log("Error", error));

  $customSelect.forEach((customSelect) => {
    const optionList = customSelect.querySelector(
      ".custom-select__option-list",
    );

    function markupC2() {
      const rowsHTML = data.items.map((label) => {
        return `<li class="custom-select__option-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-check hidden">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <label for="${label.id}" class="option__label" data-label></label>
              </li>`;
      });

      optionList.insertAdjacentHTML("beforeend", `${rowsHTML.join(" ")}`);
    }
  });

  // const $inputSearch = $customSelect.querySelector(".custom-select__input");
  // const $optionRows = $customSelect.querySelectorAll(
  //   ".custom-select__option-row",
  // );
  // const $optionLabels = $customSelect.querySelectorAll(".option__label");

  // $inputSearch.addEventListener("input", (e) => {
  //   const value = e.target.value;

  //   $optionLabels.forEach((label, i) => {
  //     if (label.textContent.toLowerCase().includes(value.toLowerCase())) {
  //       label.parentElement.removeAttribute("hidden");
  //       console.log("remove hidden");
  //     } else {
  //       label.parentElement.setAttribute("hidden", true);
  //       console.log("add hidden");
  //     }
  //   });

  //   e.target.parentElement.classList.add(
  //     "custom-select__input-container--active",
  //   );
  // });

  // $inputSearch.addEventListener("click", (e) => {
  //   e.target.parentElement.classList.add(
  //     "custom-select__input-container--active",
  //   );
  // });

  // document.addEventListener("click", (e) => {
  //   if (!e.target.matches(".custom-select__input")) {
  //     $inputSearch.parentElement.classList.remove(
  //       "custom-select__input-container--active",
  //     );
  //   }
  // });

  // $optionRows.forEach((row) => {
  //   row.addEventListener("click", (e) => {
  //     e.currentTarget.firstElementChild.classList.remove("hidden");
  //     $inputSearch.parentElement.insertAdjacentHTML(
  //       "afterbegin",
  //       `
  //                     <span class="custom-select__item"
  //               >${e.currentTarget.lastElementChild.textContent}<svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="24"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 stroke-width="1.25"
  //                 stroke-linecap="round"
  //                 stroke-linejoin="round"
  //                 class="icon icon-tabler icons-tabler-outline icon-tabler-x"
  //               >
  //                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  //                 <path d="M18 6l-12 12" />
  //                 <path d="M6 6l12 12" /></svg
  //             ></span>`,
  //     );
  //   });
  // });
}
