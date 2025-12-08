"use strict"

import helpers from "../helpers.js";
import db from "../db";

class Note {
    constructor({
                    id = null,
                    title = null,
                    image = null,
                    roles = [],
                    crDate = null,
                    chDate = null,
                }) {
        Object.assign(this, {id,title,  image,  roles, chDate, crDate});

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
            dbName: 'notes',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'notes',
            id: this.id
        })
    }

}

export default Note;