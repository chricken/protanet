"use strict";

import db from "./db.js";
import data from "./data.js";
import Person from "./classes/Person.js";
import dom from "./dom.js";
import prefill from "./prefill.js";

const init = () => {
    dom.mapping();
    db.init().then(
        () => {
            prefill.basic();
            return 'prefill done'
        }
    ).then(
        console.log
    ).catch(
        console.error
    );
}

init()