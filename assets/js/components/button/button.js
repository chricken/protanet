'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';

const btn = ({
                 legend = null,
                 parent = null,
                 capsuled = false,
                 callback = value => {
                 }
             }) => {

    if (capsuled) {
        parent = dom.create({
            parent,
            cssClassName: 'parentBtn',
        })
    }

    dom.create({
        parent: parent,
        tagName: 'button',
        cssClassName: 'btn transit',
        content: legend,
        listeners: {
            click:callback
        }
    })


    dom.create({
        tagName: 'link',
        parent: parent,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/button/button.css'
        }
    })
}

export default btn