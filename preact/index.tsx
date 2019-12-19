import { h, render } from "/homepage/web_modules/preact.js";

import App from "./App.js";

const appMount = document.querySelector("#preact");
if (appMount) render(<App />, appMount);

export default App;
