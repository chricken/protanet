'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import helpers from '../../helpers.js';
import settings from "../../settings.js";
import infoBox from '../infoBox/infoBox.js';
import compButton from '../button/button.js';

import CompInputText from '../inputText2/inputText.js';

const editSegment = ({
                         segment,
                         chapter,
                         index,
                         parent = elements.workbench,
                         onNewSegment = () => {
                         },
                         onRemoveSegment = () => {
                         },
                         onSelectSegment = () => {
                         }
                     }) => {

    const elContainer = dom.create({
        parent,
        cssClassName: 'editSegment transit input-text2-container',
    })

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
            },
            focus() {
                onSelectSegment();
            }
        }
    });

    infoBox({
        parent: elLegendContainer,
        description: segment.description || 'No Description',
        cssClassName: 'input-text2-info',
        legend: "Show Summary",
        onEdit(content) {
            segment.description = content;
            segment.save();
        }
    });

    dom.create({
        parent: elLegendContainer,
        cssClassName: 'input-text2-info',
        content: `Created:<br>${new Date(segment.crDate).toLocaleString()}`
    })

    dom.create({
        parent: elLegendContainer,
        cssClassName: 'input-text2-info',
        content: `Changed:<br>${new Date(segment.chDate).toLocaleString()}`
    })

    compButton({
        legend: 'Add Segment',
        parent: elLegendContainer,
        callback: onNewSegment
    })

    if (chapter.segments.length > 1) {
        compButton({
            legend: 'Remove Segment',
            parent: elLegendContainer,
            callback() {
                onRemoveSegment().then(
                    () => {
                        console.log(`segment ${this.id} (${this.legend}) removed successfully`);
                    }
                ).catch(
                    console.warn
                )

            }
        })
    }

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

        },
        onNewSegment: () => {
            // Signal weiterleiten nach oben
            onNewSegment();

        },
        onFocus: () => {
            onSelectSegment();
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
    return elContainer;
}

export default editSegment