"use strict"

import helpers from "../helpers.js";
import db from "../db.js";
import data from "../data.js";
import Chapter from "./Chapter.js";

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
                    workID = null,
                    chapters = []
                }) {
        Object.assign(this, {id, title, description, image, summary, roles, chDate, crDate, workID, chapters});

        if (!crDate) this.crDate = Date.now();
        if (!chDate) this.chDate = Date.now();

        if (!id) this.id = helpers.createID();

        if (this.chapters.length == 0) {
            const myChapter = new Chapter({
                volumeID: this.id
            });
            this.chapters.push(myChapter.id);
            data.chapters.push(myChapter);
        } else {
            // Wenn Chapters vorhanden sind, lade diese aus der Datenbank und hänge sie in data ein
            this.chapters.forEach(chapterID => {
                db.loadData({
                    dbName: 'chapters',
                    id: chapterID,
                }).then(chapter => {
                    data.chapters.push(new Chapter(chapter));
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
        this.chapters.forEach(chapter => {
            chapter = data.chapters.find(c => c.id == chapter);
            chapter.save()
        });
        return db.storeData({
            dbName: 'volumes',
            payload: this
        })
    }

    delete() {

        console.log('Delete Volume', this.id, this.title);
        // Zuerst Chapters löschen, weil die Chapters auch auf das Volume zugreifen wollen
        return Promise.all(
            this.chapters.map(
                chapter => data.chapters.find(c => c.id === chapter).delete()
            )
        ).then(
            () => {
                // Dieses Volume aus den Data entfernen
                data.volumes = data.volumes.filter(v => v.id !== this.id);

                // Aus dem Eltern-Work diesen Volume entfernen
                // Es gibt nur einen Work in Data, deswegen kann darauf direkt zugegriffen werden
                data.work.volumes = data.work.volumes.filter(v => v !== this.id);

                // Erst wenn das Eltern-Element gesichert ist, weitermachen
                return (data.work.save());

            }
        ).then(
            () => db.deleteData({
                dbName: 'volumes',
                id: this.id
            })
        )
    }


}

export default Volume;