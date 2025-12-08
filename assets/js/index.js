"use strict";

import db from "./db.js";
import data from "./data.js";
import Person from "./classes/Person.js";


const init = () => {
    db.init().then(
        () => {
            /*
            let person = new Person({
                prename: 'Max',
                surname: 'Mustermann',
                altNames: ['Maximilian']
            })
            */

            db.loadData({
                dbName: 'persons',
                id: "4zpt_miwrkk5u_1"
            }).then(
                payload => new Person(payload)
            ).then(
                data => {
                    data.surname = 'Krawwall'
                    return data;
                }
            ).then(
                data => data.save()
            ).then(
                console.log
            )

        }
    ).then(
        console.log
    ).catch(
        console.error
    );
}

init()