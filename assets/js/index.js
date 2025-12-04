"use strict";

import db from "./db.js";

const init = () => {
    db.init().then(
        console.log
    ).catch(
        console.error
    );
}

init()