"use strict"

import helpers from "../helpers.js";
import db from "../db.js";

class Volume {
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
        Object.assign(this, {id,title, description, image, summary, roles, chDate, crDate});

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
            dbName: 'volumes',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'volumes',
            id: this.id
        })
    }


}

export default Volume;