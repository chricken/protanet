"use strict"

import data from "../data.js";
import Role from "./Role.js";
import db from "../db";

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
            { prename, surname, altNames, image, placeBirth, dateBirth, roles, placeDeath, dateDeath});

        if(id) this.id = id;
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

    save(){
        db.storeData({
            dbName:'protanet_persons',
            payload:this
        })
    }
}

export default Person;