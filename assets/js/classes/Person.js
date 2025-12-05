"use strict"

import data from "../data.js";
import Role from "./Role.js";
import db from "../db.js";
import helpers from "../helpers.js";

class Person {
    constructor({
                    id = null,
                    prename = null,
                    surname = null,
                    altNames = [],
                    image = null,
                    placeBirth = null,
                    dateBirth = null,
                    roles = [],   // Die Rolle kann sich ändern
                    placeDeath = null,
                    dateDeath = null,


                }) {
        // Objekte werden erzeugt, indem sie
        // - zunächst angelegt,
        // - dann in die Datenbank geschrieben
        // - dann die ID übertragen wird
        Object.assign(
            this,
            {id, prename, surname, altNames, image, placeBirth, dateBirth, roles, placeDeath, dateDeath});

        if (!id) {
            this.id = helpers.createID();
            this.save();
        }
    }

    update() {
        console.log('update')
    }

    render() {
        console.log('render')

    }

    connect() {
        console.log('render')

    }

    save() {
        return db.storeData({
            dbName: 'protanet_persons',
            payload: this
        })
    }

    delete() {
        return db.deleteData({
            dbName: 'protanet_persons',
            id: this.id
        })
    }
}

export default Person;