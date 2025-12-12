"use strict"

import helpers from "../helpers.js";
import db from "../db.js";

class Image {
    constructor({
                    id = null,
                    name = null,
                    url = null,
                    description = null,
                    crDate = null,
                    chDate = null,
                }) {
        Object.assign(this, {id, name, url, description, chDate, crDate});

        if (!crDate) this.crDate = Date.now();
        if (!chDate) this.chDate = Date.now();

        if(!id) this.id = helpers.createID()
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
            dbName: 'images',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'images',
            id: this.id
        })
    }
}

export default Image;