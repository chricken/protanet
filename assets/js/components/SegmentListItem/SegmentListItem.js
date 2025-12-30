'use strict';

import dom from '../../dom.js';
import data from '../../data.js';
import elements from '../../elements.js';

const segmentListItem = ({
                             segment,
                             parent = elements.ui,
                         }) => {

    const elContainer = dom.create({
        parent,
        cssClassName: 'parentSegmentListItem transit',
    })

    /*
    const elPreLegend = dom.create({
        parent: elOpener,
        cssClassName: 'preLegend transit editable',
        content: `Segment ${index + 1}:`,

    })

     */

    const elLegend = dom.create({
        parent: elContainer,
        cssClassName: 'legend transit editable',
        content: `${segment.title || 'No Title'}`,
        attr: {
            contentEditable: true
        },
        listeners: {
            input(evt) {
                segment.title = evt.target.innerText;
                segment.save();
            }
        }
    })

    dom.create({
        parent: elContainer,
        cssClassName: 'paragraphs transit',
        content: `${segment.paragraphs.length} Paragraphs, ${segment.subsegments.length} Subsegments`
    })


    dom.create({
        tagName: 'link',
        parent: elContainer,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/SegmentListItem/SegmentListItem.css'
        }
    })
}

export default segmentListItem