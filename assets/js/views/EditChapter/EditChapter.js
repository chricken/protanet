'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import db from "../../db.js";
import data from '../../data.js';

// Components
import CompEditSegment from '../../components/EditSegment/EditSegment.js';

// Classes


const EditChapter = ({
                         chapter,
                         onChangeTitle = () => {
                         },
                     }) => {
    elements.workspaceUI.innerHTML = '';
    elements.workbench.innerHTML = '';

    dom.create({
        tagName: 'h1',
        parent: elements.workbench,
        content: chapter.title,
        attr: {
            contentEditable: true
        },
        listeners: {
            input(evt) {
                chapter.title = evt.target.innerText;
                onChangeTitle();
                chapter.save();
            }
        }
    })

    console.log(chapter);

    chapter.segments.forEach(segmentID => {
        const segment = data.segments.find(segment => segment.id === segmentID);
        if (segment) {
            CompEditSegment({segment});
            segment.save();
        }
    })

    dom.create({
        tagName: 'link',
        parent: elements.tabs,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/views/EditChapter/EditChapter.css'
        }
    })

}

export default EditChapter