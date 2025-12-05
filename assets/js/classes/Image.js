"use strict"

import helpers from "../helpers.js";

class Image {
    constructor({
                    id = null,
                    name = null,
                    url = null,
                    description = null,
                }) {
        Object.assign(this, {id, name, url, description});
        if(!id) this.id = helpers.createID()
    }

    update() {

    }

    render() {

    }

    connect() {

    }
}

export default Image;