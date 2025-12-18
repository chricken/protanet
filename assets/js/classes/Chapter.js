"use strict"

import helpers from "../helpers.js";
import db from "../db.js";
import data from "../data.js";
import Segment from "./Segment.js";

class Chapter {
    constructor({
                    id = null,
                    title = null,
                    description = null,
                    image = null,
                    summary = null,
                    roles = [],
                    crDate = null,
                    chDate = null,
                    volumeID = null,
                    segments = []
                }) {
        Object.assign(this, {id, title, description, image, summary, roles, chDate, crDate, volumeID, segments});

        if (!crDate) this.crDate = Date.now();
        if (!chDate) this.chDate = Date.now();

        if (!id) this.id = helpers.createID();

        if (this.segments.length == 0) {
            const mySegment = new Segment(
                {chapterID: this.id}
            )
            this.segments.push(mySegment.id)
            data.segments.push(mySegment);
        } else {
            // Wenn Segments vorhanden sind, lade diese aus der Datenbank und hänge sie in data ein
            this.segments.forEach(segmentID => {
                db.loadData({
                    dbName: 'segments',
                    id: segmentID,
                }).then(segment => {
                    data.segments.push(new Segment(segment));
                }).catch(
                    console.warn
                )
            })
        }
    }

    update() {

    }

    render() {

    }

    connect() {

    }

    save() {
        this.chDate = Date.now();
        this.segments.forEach(segment => {
            segment = data.segments.find(s => s.id == segment);
            segment.save()
        });
        return db.storeData({
            dbName: 'chapters',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'chapters',
            id: this.id
        })
    }


}

export default Chapter;