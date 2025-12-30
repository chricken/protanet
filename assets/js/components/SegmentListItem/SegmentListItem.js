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

     dom.create({
        parent: elContainer,
        cssClassName: 'legend transit editable',
        content: `Segment: ${segment.title ||  'No Title'}`,
        attr:{
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
        content: `${segment.paragraphs.length} Paragraphs`
    })

    dom.create({
        parent: elContainer,
        cssClassName: 'subsegments transit',
        content: `${segment.subsegments.length} Subsegments`
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