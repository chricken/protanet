'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import helpers from '../../helpers.js';
import settings from "../../settings.js";
import infoBox from '../infoBox/infoBox.js';

import CompInputText from '../inputText2/inputText.js';

const editSegment = ({
                         segment,
                         parent = elements.workbench,
                         onNewSegment = () => {
                         }
                     }) => {

    const elContainer = dom.create({
        parent,
        cssClassName: 'editSegment transit input-text2-container',
    })

    /*
    dom.create({
        parent: elContainer,
        content: `Segment ID: ${segment.id}<br>`,
    })
    */

    const elLegendContainer = dom.create({
        parent: elContainer,
        cssClassName: 'input-text2-legend-container',
    })

     dom.create({
        parent: elLegendContainer,
        cssClassName: 'input-text2-legend',
        content: segment.title,
        attr: {
            contentEditable: true
        },
        listeners: {
            input(evt) {
                segment.title = evt.target.innerText;
                segment.save();
            }
        }
    });

    infoBox({
        parent: elLegendContainer,
        description: segment.description || 'No Description',
        cssClassName: 'input-text2-info',
        onEdit(content) {
            segment.description = content;
            segment.save();
        }
    });

    dom.create({
        parent: elLegendContainer,
        content: `Created: ${segment.crDate}`
    })
    CompInputText({
        text: segment.paragraphs.join('\n'),
        legend: segment.title || 'No Title',
        parent: elContainer,
        multiline: true,
        description: segment.description || 'No Description',
        horizontal: false,
        onEditText: ({
                         text = ''
                     }) => {
            segment.paragraphs = text.split('\n');
            segment.save();
            console.log('save', Date.now());

        },
        onNewSegment: () => {
            // Signal weiterleiten nach oben
            onNewSegment();
        }
    })


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