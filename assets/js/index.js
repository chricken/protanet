"use strict";

import db from "./db.js";
import dom from "./dom.js";
import prefill from "./prefill.js";
import Work from "./classes/Work.js";
import ViewEditWork from "./views/EditWork/EditWork.js";
import Tabs from "./views/Tabs/Tabs.js";
import Worktitle from "./components/Worktitle/Worktitle.js";

const init = () => {
    dom.mapping();
    db.init().then(
        () => {
            prefill.basic();
            return 'prefill done'
        }
    ).then(
        () => {
            let loaded = localStorage.getItem('loadedWorkID');
            if (loaded) {
                db.listAllData({
                    dbName: 'works',
                }).then(
                    works => {
                        let work = works.find(work => work.id === loaded);
                        return new Work(work);
                    }
                ).then(
                    ViewEditWork
                ).then(
                    Tabs
                ).then(
                    Worktitle
                )
            }
        }
    ).then(
        console.log

    ).catch(
        console.error
    );
}

init()