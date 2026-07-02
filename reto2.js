import { BASE_URL } from "./config.js";
export function reto2() {
  const $customSelect = document.querySelector(".custom-select");
  let languages = [];

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
      markupC2(data);
    })
    .catch((error) => console.log("Error", error));

  const optionList = $customSelect.querySelector(".custom-select__option-list");
  function markupC2(data) {
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

    const $inputSearch = $customSelect.querySelector(".custom-select__input");
    const $optionRows = $customSelect.querySelectorAll(
      ".custom-select__option-row",
    );
    const $optionLabels = $customSelect.querySelectorAll(".option__label");
    const $inputContainer = $customSelect.querySelector(
      ".custom-select__input-container",
    );

    $optionRows.forEach((row, i) => {
      row.querySelector("[data-label]").textContent = data.items[i].label;

      row.addEventListener("click", (e) => {
        if (e.currentTarget.firstElementChild.classList.contains("hidden")) {
          e.currentTarget.firstElementChild.classList.remove("hidden");
          $inputSearch.parentElement.insertAdjacentHTML(
            "afterbegin",
            `<span class="custom-select__item"
                >${e.currentTarget.lastElementChild.textContent}<button type="button" class="remove-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-x"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" /></svg
              ></button></span>`,
          );

          const $removeItem = $customSelect.querySelector(".remove-item");
          $removeItem.addEventListener("click", (e) => {
            e.currentTarget.parentElement.remove();
            row.firstElementChild.classList.add("hidden");
          });
        }
      });
    });

    $inputSearch.addEventListener("input", (e) => {
      const value = e.target.value;
      e.currentTarget.parentElement.nextElementSibling.classList.remove(
        "hidden",
      );

      $optionLabels.forEach((label, i) => {
        if (label.textContent.toLowerCase().includes(value.toLowerCase())) {
          label.parentElement.removeAttribute("hidden");
        } else {
          label.parentElement.setAttribute("hidden", true);
        }
      });

      e.target.parentElement.classList.add(
        "custom-select__input-container--active",
      );
    });

    $inputSearch.addEventListener("click", (e) => {
      e.target.parentElement.classList.add(
        "custom-select__input-container--active",
      );
      e.currentTarget.parentElement.nextElementSibling.classList.remove(
        "hidden",
      );
      $inputSearch.parentElement.nextElementSibling.classList.remove("hidden");
    });

    document.querySelector("html").addEventListener("click", (e) => {
      if (
        !e.target.matches(".custom-select__input") &&
        !e.target.matches(".custom-select__input-container")
      ) {
        $inputSearch.parentElement.classList.remove(
          "custom-select__input-container--active",
        );
        $inputSearch.parentElement.nextElementSibling.classList.add("hidden");
      }
    });

    $inputContainer.addEventListener("click", (e) => {
      $inputSearch.focus();
      e.currentTarget.classList.add("custom-select__input-container--active");
    });
  }
}
