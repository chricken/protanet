'use strict';

import elements from "./elements.js";

import ViewMainMenu from "./views/mainmenu/mainmenu.js";
import ViewTabs from "./views/tabs/tabs.js";

const prefill = {
    basic(){
        ViewMainMenu();
       ViewTabs();
    }
}

export default prefill;