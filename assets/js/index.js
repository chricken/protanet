"use strict";

import db from "./db.js";
import dom from "./dom.js";
import prefill from "./prefill.js";
import Work from "./classes/Work.js";

const init = () => {
    dom.mapping();
    db.init().then(
        () => {
            prefill.basic();
            /*
                        let myWork = new Work({
                            title: "Feuer und Eis",
                            Description: 'Nur ein Test',
                            summary: 'Dummi geht zu bummy und sagt, gib mir Deinen Flummi',
                            author: 'C. Heisch'
                        })

                        db.storeData({
                            dbName: 'works',
                            payload: myWork
                        })

             */
            return 'prefill done'
        }
    ).then(
        console.log
    ).catch(
        console.error
    );
}

init()