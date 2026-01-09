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
                        onEditText = () => {
                        },
                        onEditLegend = () => {
                        },
                        onEditDescription = () => {
                        },
                        onNewSegment = () => {
                        },
                        multiline = false,
                        minHeight = null,
                        maxHeight = Infinity,
                    }) => {


    const elInput = dom.create({
        parent,
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
            keydown(evt) {
                evt.stopPropagation();
                if (evt.ctrlKey && evt.key === 'Enter') {
                    console.log('New Segmnent');
                    onNewSegment();
                }
            },
            keyup(evt) {
                evt.stopPropagation();
            },
            input: helpers.debounce((evt) => {
                const newText = evt.target.innerText;
                if (!multiline) {
                    evt.target.innerText = newText.replaceAll(/\n/g, '');
                    evt.target.innerText = newText.replaceAll(/<br>/g, '');
                    evt.target.innerText = newText.replaceAll(/<br\/>/g, '');
                }
                onEditText({text: newText});
            }, settings.delayOfDebouncers)
        }
    });

    dom.create({
        tagName: 'link',
        parent,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/inputText2/inputText.css'
        }
    })

    return elInput;
};
export default inputText2;
