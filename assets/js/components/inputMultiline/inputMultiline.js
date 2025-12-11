'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';

const inputMultiline = ({
                      legend = null,
                      parent = null,
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

    dom.create( {
        parent: elContainer,
        tagName: 'textarea',
        listeners: {
            input(evt) {
                callback(evt.target.value);
            }
        }
    })

    dom.create({
        tagName: 'link',
        parent: elContainer,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/inputMultiline/inputMultiline.css'
        }
    })
}

export default inputMultiline