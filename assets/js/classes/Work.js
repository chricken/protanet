"use strict"

import helpers from "../helpers.js";
import db from "../db.js";

class Work {
    constructor({
                    id = null,
                    title = null,
                    description = null,
                    image = null,
                    summary = null,
                    roles = [],
                    crDate = null,
                    chDate = null,
                }) {
        Object.assign(this, {id, title, description, image, summary, roles, chDate, crDate});

        if (!crDate) this.crDate = Date.now();
        if (!chDate) this.chDate = Date.now();

        if (!id) this.id = helpers.createID();
    }

    update() {

    }

    render() {

    }

    connect() {

    }

    save() {
        this.chDate = Date.now();
        return db.storeData({
            dbName: 'works',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'works',
            id: this.id
        })
    }

}

export default Work;