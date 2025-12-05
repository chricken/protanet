"use strict"

import helpers from "../helpers";

class Group {
    constructor({
                    id = null,
                    name = null,
                    description = null,
                    members = [],
                    founded = null,
                    destroyed = null
                }) {
        Object.assign(this, {id, name, description, members, founded, destroyed});
        if (!id) this.id = helpers.createID();

    }

    update() {

    }

    render() {

    }

    connect() {

    }
}

export default Group;