"use strict"

import helpers from "../helpers.js";

class Thing {
    constructor({
                    id = null,
                    name = null,
                    description = null,
                    roles = []
                }) {
        Object.assign(this, {id, name, description, roles});
        if (!id) this.id = helpers.createID();
    }

    update() {

    }

    render() {

    }

    connect() {

    }


}

export default Thing;