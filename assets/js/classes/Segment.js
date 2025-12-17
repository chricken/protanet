"use strict"

import helpers from "../helpers.js";
import db from "../db.js";
import data from "../data.js";

class Segment {
    constructor({
                    id = null,
                    title = null,
                    description = null,
                    image = null,
                    summary = null,
                    roles = [],
                    crDate = null,
                    chDate = null,
                    subsegments = [],
                    paragraphs = []
                }) {
        Object.assign(this, {id, title, description, image, summary, roles, chDate, crDate, subsegments, paragraphs});

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
            dbName: 'segments',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'segments',
            id: this.id
        })
    }

}

export default Segment;