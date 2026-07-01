import { BASE_URL } from "./config.js";

export default function reto1() {
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
      console.log(data);
      markupC1(data);
    })
    .catch((error) => console.error("Error", error));

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
            data-label
          >
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
              <h1 data-heading></h1>
              <p data-content></p>
            </section>
          </div>`;
    });

    $tabsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="tablist" role="tablist" aria-label="Tabs de contenido">
    ${tabsHTML.join(" ")}
    <div class="tab__indicator" aria-hidden="true"></div>
    </div>
    <div class="tab-panels">
    ${tabpanelsHTML.join(" ")}
    </div>  
    `,
    );

    const $tabs = $tabsContainer.querySelectorAll(".tab");
    const $tabpanels = $tabsContainer.querySelectorAll(".tabpanel");

    $tabpanels.forEach((tabpanel, i) => {
      const $data_heading = tabpanel.querySelector("[data-heading]");
      const $data_content = tabpanel.querySelector("[data-content]");

      $data_heading.textContent = data.tabs[i].heading;
      $data_content.textContent = data.tabs[i].content;
      $tabs[i].textContent = data.tabs[i].label;
    });

    showSelected(0, false);

    $tabsContainer.addEventListener("click", (e) => {
      if (e.target.matches(".tab")) {
        removeSelected();

        const indexOfSelected = Array.from($tabpanels).findIndex(
          (tabpanel) =>
            tabpanel.getAttribute("id") ===
            e.target.getAttribute("aria-controls"),
        );

        showSelected(indexOfSelected, false);
      }
    });

    $tabsContainer.addEventListener("keydown", (e) => {
      const currentTab = e.target;
      const index = Array.from($tabs).indexOf(currentTab);

      if (index === -1) return;

      let newIndex = 0;
      switch (e.key) {
        case "ArrowLeft":
          newIndex = (index - 1 + $tabs.length) % $tabs.length;
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

      removeSelected();

      e.preventDefault(); // Cancela la acción nativa de la tecla
      e.stopPropagation(); //Evita que el evento suba a elementos padre

      showSelected(newIndex, true);
    });

    function removeSelected() {
      $tabpanels.forEach((tabpanel) => {
        tabpanel.setAttribute("hidden", "true");
      });

      $tabs.forEach((tab) => {
        tab.setAttribute("tabindex", "-1");
        tab.setAttribute("aria-selected", "false");
      });
    }

    function showSelected(i, isFocus) {
      $tabpanels[i].removeAttribute("hidden");
      $tabs[i].setAttribute("tabindex", "0");
      $tabs[i].setAttribute("aria-selected", "true");

      if (isFocus) {
        $tabs[i].focus();
      }
    }
  }
}
