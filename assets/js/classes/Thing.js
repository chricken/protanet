"use strict"

import helpers from "../helpers.js";
import db from "../db";

class Thing {
    constructor({
                    id = null,
                    name = null,
                    description = null,
                    roles = [],
                    crDate = null,
                    chDate = null,
                }) {
        Object.assign(this, {id, name, description, roles, chDate, crDate});

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
            dbName: 'things',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'things',
            id: this.id
        })
    }


}

export default Thing;