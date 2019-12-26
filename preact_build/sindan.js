import { h, render } from "/homepage/web_modules/preact.js";
import SindanApp from "./SindanApp.js";
var appMount = document.querySelector("#sindan");
if (appMount)
    render(h(SindanApp, null), appMount);
export default SindanApp;
