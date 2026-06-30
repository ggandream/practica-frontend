import { BASE_URL } from "./config.js";
export function reto2() {}

// FETCH al enpoint

fetch(BASE_URL + "/challenges/reto2", { credentials: "include" })
  .then((response) => {
    if (!response.ok) {
      throw new Error("No connection, something went wrong");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log("Error", error));
