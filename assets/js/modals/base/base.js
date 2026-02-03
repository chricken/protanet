'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';

const base = () => {

    const closeModal = () => {
        elBG.remove();
    }


    const elBG = dom.create({
        parent: document.body,
        cssClassName: 'modalBase',
        listeners: {
            click: closeModal
        }
    })

    const elInner = dom.create({
        parent: elBG,
        cssClassName: 'modalInner',
        listeners: {
            click(evt) {
                evt.stopPropagation();
            }
        }
    })

    dom.create({
        tagName: 'div',
        parent: elInner,
        content: 'x',
        cssClassName: 'btnClose transit',
        listeners: {
            click: closeModal
        }
    })

    dom.create({
        tagName: 'link',
        parent: elBG,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/modals/base/base.css'
        }
    })

    return {
        elBG,
        elInner
    }
}

export default base;