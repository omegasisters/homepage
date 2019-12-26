import { h, render } from "preact";

import SindanApp from "./SindanApp";

const appMount = document.querySelector("#sindan");
if (appMount) render(<SindanApp />, appMount);

export default SindanApp;