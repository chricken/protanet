'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import helpers from '../../helpers.js';
import settings from "../../settings.js";

const editSegment = ({
                         segment,
                         parent = elements.workbench,
                     }) => {

    const elContainer = dom.create({
        parent,
        cssClassName: 'editSegment transit',
    })
    console.log('segment', segment);


    dom.create({
        parent: elContainer,
        content: segment.title,
        args: {
            contentEditable: true
        },
        listeners: {
            input(evt) {
                segment.title = evt.target.innerText;
                segment.save();
            }
        }
    })

    let content = segment.paragraphs.map(p => p.text).join('<br>')

    const elInput = dom.create({
        parent: elContainer,
        cssClassName: 'segmentText editable transit',
        attr: {
            contentEditable: true,
        },
        content,
        listeners: {
            input(evt) {
                segment.paragraphs = evt.target.innerText.split('<br>').map(
                    p => ({text: p})
                );

            }
        }
    })

    elInput.addEventListener(
        'input',
        helpers.debounce(() => {
            console.log('save', Date.now());
            segment.save();
        }, settings.delayOfDebouncers)
    )

    dom.create({
        tagName: 'link',
        parent: elContainer,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/EditSegment/EditSegment.css'
        }
    })
}

export default editSegment