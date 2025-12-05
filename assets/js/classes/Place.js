"use strict"

import helpers from "../helpers";

class Place {
    constructor({
                    id = null,
                    name = null,
                    description = null,
                    partOf = [],    // Eine Kneipe kann Teil einer Stadt sein, eine Stadt kann Teil eines Landes sein
                }) {

        Object.assign(this, {id, name, description, partOf});
        if (!id) this.id = helpers.createID();

    }

    update() {

    }

    render() {

    }

    connect() {

    }
}

export default Place;