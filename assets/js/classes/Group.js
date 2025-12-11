"use strict"

import helpers from "../helpers";
import db from "../db";

// Volk, Firma, Freundeskreis, Verein, Organisation

class Group {
    constructor({
                    id = null,
                    name = null,
                    description = null,
                    members = [],
                    founded = null,
                    destroyed = null,
                    type = null,
                    crDate = null,
                    chDate = null,
                }) {

        Object.assign(this, {id, name, type, description, members, founded, destroyed, chDate, crDate});

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
            dbName: 'groups',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'groups',
            id: this.id
        })
    }
}

export default Group;