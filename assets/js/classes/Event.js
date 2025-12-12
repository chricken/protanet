"use strict"

import helpers from "../helpers.js";
import db from "../db.js";

class Event {
    constructor({
                    id = null,
                    name = null,
                    description = null,
                    data = null,
                    place = null,
                    participants = [],
                    crDate = null,
                    chDate = null,
                }) {
        Object.assign(this, {id, name, description, data, place, participants, chDate, crDate});

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
            dbName: 'events',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'events',
            id: this.id
        })
    }
}

export default Event;