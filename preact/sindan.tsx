import { h, render } from "/homepage/web_modules/preact.js";

import SindanApp from "./SindanApp.js";

const appMount = document.querySelector("#sindan");
if (appMount) render(<SindanApp />, appMount);

export default SindanApp;