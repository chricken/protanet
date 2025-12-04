"use strict";

import db from "./db.js";

const person = {
    id:2,
    prename: 'Mark',
    surname: 'smith',
};

const init = () => {
    db.init().then(
        ()=>{


        }
    ).then(
        console.log
    ).catch(
        console.error
    );
}

init()