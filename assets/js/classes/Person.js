"use strict"

import data from "../data.js";
import Role from "./Role.js";

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

    }

    update() {

    }

    render() {

    }

    connect() {

    }
}

export default Person;