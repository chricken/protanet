'use strict';

import dom from '../../dom.js';

const inputMultiline = ({
                            legend = null,
                            parent = null,
                            value = null,
                            callback = value => {
                            }
                        }) => {

    const elContainer = dom.create({
        parent,
        cssClassName: 'parentInputMultiline transit',
    })

    dom.create({
        parent: elContainer,
        cssClassName: 'legend transit',
        content: legend
    })

    let ta = dom.create({
        parent: elContainer,
        tagName: 'textarea',
        listeners: {
            input(evt) {
                callback(evt.target.value);
            }
        }
    })
    ta.value = value;

    dom.create({
        tagName: 'link',
        parent: elContainer,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/inputMultiline/inputMultiline.css'
        }
    })

    return elContainer;
}

export default inputMultiline