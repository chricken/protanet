'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';

const inputText = ({
                       legend = null,
                       parent = null,
                       value = null,
                       callback = value => {
                       }
                   }) => {

    const elContainer = dom.create({
        parent,
        cssClassName: 'parentInputText transit',
    })

    dom.create({
        parent: elContainer,
        cssClassName: 'legend transit',
        content: legend
    })

    dom.create({
        parent: elContainer,
        tagName: 'input',
        value,
        attr: {
            type: 'text'
        },
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
            href: 'assets/js/components/InputText/InputText.css'
        }
    })

    return elContainer;
}

export default inputText