'use strict';

import elements from "./elements.js";

import ViewMainMenu from "./views/MainMenu/MainMenu.js";
import ViewTabs from "./views/Tabs/tabs.js";

const prefill = {
    basic() {
        ViewMainMenu();
        ViewTabs();
    }
}

export default prefill;