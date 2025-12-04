"use strict"

const enumTypes = {
    childOf: {},
    parentOf: {},
    partnerOf: {},
    friendOf: {},
    enemyOf: {},
}

class Role {
    constructor({
                    name = null,
                    description = null,
                    of = null,    // In Beziehung zu wem ist diese Rolle
                    type = null
                }) {

    }

    update() {

    }

    render() {

    }

    connect() {

    }
}

export default Role;