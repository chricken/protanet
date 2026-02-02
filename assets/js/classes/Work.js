"use strict"

import helpers from "../helpers.js";
import db from "../db.js";
import data from "../data.js";
import Volume from "./Volume.js";

class Work {
    constructor({
                    id = null,
                    title = null,
                    description = null,
                    image = null,
                    summary = null,
                    roles = [],
                    crDate = null,
                    chDate = null,
                    volumes = []
                } = {}) {
        Object.assign(this, {id, title, description, image, summary, roles, chDate, crDate, volumes});


        if (!crDate) this.crDate = Date.now();
        if (!chDate) this.chDate = Date.now();

        if (!id) this.id = helpers.createID();

        // Beim Anlegen eines neuen Werkes wird dieses in das data-Objekt geschrieben, da wir davon ausgehen, dass es gleich bearbeitet werden soll
        // Im datá werden die Volumes, Chapters, etc geleert und dann in den jeweiligen Klassen neu gefüllt
        data.work = this;
        data.volumes = [];
        data.chapters = [];
        data.segments = [];

        return new Promise((resolve, reject) => {
            if (this.volumes.length == 0) {
                const myVolume = new Volume({workID: this.id});
                this.volumes.push(myVolume.id);
                data.volumes.push(myVolume);
                // myVolume.save();
                resolve(this);
            } else {
                // Wenn Volumes vorhanden sind, lade diese aus der Datenbank und hänge sie in data ein
                Promise.all(this.volumes.map(volumeID => {
                    // Mehrere Promises parallel laufen lassen.
                    // Kein Promise.all(), weil unnötig
                    return db.loadData({
                        dbName: 'volumes',
                        id: volumeID,
                    }).then(volume => {
                        data.volumes.push(new Volume(volume));
                    })
                })).then(
                    () => resolve(this)
                )
            }
        })


    }

    update() {

    }

    render() {

    }

    connect() {

    }

    save() {
        this.chDate = Date.now();

        this.volumes.forEach(volume => {
            volume = data.volumes.find(v => v.id == volume);
            volume.save()
        });

        return db.storeData({
            dbName: 'works',
            payload: this
        })
    }

    delete() {
        console.log('delete work', this.id, this.title);

        // Die Kinder werden zuerst gelöscht
        // Denn sie ändern ihre Eltern und sichern diese
        // Erst danach können die Eltern sicher gelöscht werden.
        // Das sichern der Eltern ist wichtig, denn es kann ja sein,
        // Dass das Kind auch allein gelöscht werden soll, ohne auch die Eltern zu löschen

            return Promise.all(
                data.volumes.map(v => v.delete())
            ).then(
                () => db.deleteData({
                    dbName: 'works',
                    id: this.id
                })
            ).catch(
                console.warn
            )

    }

}

export default Work;