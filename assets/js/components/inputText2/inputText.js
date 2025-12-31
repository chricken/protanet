'use strict';

import dom from '../../dom.js';
import settings from '../../settings.js';
import helpers from '../../helpers.js';
import infoBox from '../infoBox/infoBox.js';

const inputText2 = ({
    text,
    legend,
    description,
    parent,
    callback,
    multiline = false,
    minHeight = null,
    maxHeight = Infinity,
}) => {
    const elContainer = dom.create({
        parent,
        cssClassName: 'input-text2-container'
    });

    const elLegend = dom.create({
        parent: elContainer,
        cssClassName: 'input-text2-legend',
        content: legend,
        attr: {
            contentEditable: true
        }
    });

    infoBox({
        parent: elContainer,
        description,
        cssClassName: 'input-text2-info'
    });

    const elInput = dom.create({
        parent: elContainer,
        cssClassName: 'input-text2-input',
        content: text,
        attr: {
            contentEditable: true
        },
        style: {
            minHeight: multiline ? `${minHeight}px` : null,
            maxHeight: multiline ? `${maxHeight}px` : null
        },
        listeners: {
            input: helpers.debounce((evt) => {
                const newText = evt.target.innerText;
                if (!multiline) {
                    evt.target.innerText = newText.replace(/\n/g, '');
                }
                callback(newText);
            }, settings.delayOfDebouncers)
        }
    });

    dom.create({
        tagName: 'link',
        parent: elContainer,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/inputText2/inputText.css'
        }
    })

    return elContainer;
};
export default inputText2;
