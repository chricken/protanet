"use strict";

import db from "./db.js";
import data from "./data.js";
import Person from "./classes/Person.js";


const init = () => {
    db.init().then(
        () => {


        }
    ).then(
        console.log
    ).catch(
        console.error
    );
}

init()