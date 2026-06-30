import { BASE_URL } from "./config.js";

export default function ejemplo() {}

const $tabsContainer = document.querySelector(".tabs");

// FETCH al enpoint
fetch(BASE_URL + "/challenges/reto1", { credentials: "include" })
  .then((response) => {
    if (!response.ok) {
      throw new Error("No connection, something went wrong");
    }
    return response.json();
  })
  .then((data) => {
    markupC1(data);
  })
  .catch((error) => console.log("Error", error));

function markupC1(data) {
  const tabsHTML = data.tabs.map((tab) => {
    return `<button
            class="tab"
            role="tab"
            aria-selected="false"
            aria-controls="${tab.id}"
            tabindex="-1"
            type="button"
            id="tab-${tab.id}"
          >
            ${tab.label}
          </button>`;
  });

  const tabpanelsHTML = data.tabs.map((tabpanel) => {
    return `
          <div
            role="tabpanel"
            class="tabpanel"
            tabindex="0"
            aria-labelledby="tab-${tabpanel.id}"
            id="${tabpanel.id}"
            hidden
          >
            <section>
              <h1>${tabpanel.heading}</h1>
              <p>${tabpanel.content}</p>
            </section>
          </div>`;
  });

  $tabsContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="tablist" role="tablist">
    ${tabsHTML.join(" ")}
    <div class="tab__indicator"></div>
    </div>
    <div class="tab-panels">
    ${tabpanelsHTML.join(" ")}
    </div>  
    `,
  );

  const $tabs = $tabsContainer.querySelectorAll(".tab");
  const $tabpanels = $tabsContainer.querySelectorAll(".tabpanel");

  $tabpanels[0].removeAttribute("hidden");
  $tabs[0].setAttribute("tabindex", "0");
  $tabs[0].setAttribute("aria-selected", "true");
}

$tabsContainer.addEventListener("click", (e) => {
  const $tabs = $tabsContainer.querySelectorAll(".tab");
  const $tabpanels = $tabsContainer.querySelectorAll(".tabpanel");

  if (e.target.matches(".tab")) {
    $tabpanels.forEach((tabpanel) => {
      tabpanel.setAttribute("hidden", "true");
    });

    $tabs.forEach((tab) => {
      tab.setAttribute("tabindex", "-1");
      tab.setAttribute("aria-selected", "false");
    });

    const indexOfSelected = Array.from($tabpanels).findIndex(
      (tabpanel) =>
        tabpanel.getAttribute("id") === e.target.getAttribute("aria-controls"),
    );

    $tabpanels[indexOfSelected].removeAttribute("hidden");
    $tabs[indexOfSelected].setAttribute("tabindex", "0");
    $tabs[indexOfSelected].setAttribute("aria-selected", "true");
  }
});

$tabsContainer.addEventListener("keydown", (e) => {
  const $tabs = $tabsContainer.querySelectorAll(".tab");
  const currentTab = e.target;
  const index = Array.from($tabs).indexOf(currentTab);

  if (index === -1) return;

  let newIndex = 0;
  switch (e.key) {
    case "ArrowLeft":
      newIndex = (index - 1) % $tabs.length;
      break;
    case "ArrowRight":
      newIndex = (index + 1) % $tabs.length;
      break;
    case "Home":
      newIndex = 0;
      break;
    case "End":
      newIndex = $tabs.length - 1;
      break;
    default:
      return;
  }

  e.preventDefault();
  e.stopPropagation();
  $tabs[newIndex].focus();
});
