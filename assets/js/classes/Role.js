"use strict"

class TypeRole {
    constructor(id, title, description) {
        Object.assign(this, {id, title, description});
    }
}

const enumTypes = {
    childOf: new TypeRole(1, 'Child', ''),
    parentOf: new TypeRole(2, 'Parent', ''),
    partnerOf: new TypeRole(3, 'Partner', ''),
    friendOf: new TypeRole(4, 'Friend', ''),
    enemyOf: new TypeRole(5, 'Enemy', ''),
    employeeOf: new TypeRole(6, 'Employee', ''),
    employerOf: new TypeRole(7, 'Employer', ''),
    memberOf: new TypeRole(8, 'Member', 'This person is part of the community.'),
    loverOf: new TypeRole(9, 'Lover', 'They are very into each other and fuch at a regular basis.'),
    ownerOf: new TypeRole(10, 'Owner', ''),
    ownedBy: new TypeRole(11, 'Owned', 'Thing is owned by a person. Is for persons also a.k.a. slaves.'),
}

class Role {
    constructor({
                    id = null,
                    of = null,    // In Beziehung zu wem ist diese Rolle
                    type = null,
                    start = null,
                    end = null,
                }) {
        Object.assign(this, {id, of, type, start, end});
        if (!id) this.id = helpers.createID();
    }

    update() {

    }

    render() {

    }

    connect() {

    }
}

export default Role;