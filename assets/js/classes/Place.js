"use strict"

import helpers from "../helpers";
import db from "../db.js";

class Place {
    constructor({
                    id = null,
                    name = null,
                    description = null,
                    partOf = [],    // Eine Kneipe kann Teil einer Stadt sein, eine Stadt kann Teil eines Landes sein
                    crDate = null,
                    chDate = null,
                }) {

        Object.assign(this, {id, name, description, partOf, chDate, crDate});

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
            dbName: 'places',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'places',
            id: this.id
        })
    }
}

export default Place;