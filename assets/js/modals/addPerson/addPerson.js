'use strict';

import MdlBase from '../base/base.js';
import dom from "../../dom.js";

const addPerson = () => {

    const {elBG, elInner} = MdlBase();

    const elHeader = dom.create({
        parent: elInner,
        content: 'Add Person',
        tagName: 'h2',
    })

}

export default addPerson;