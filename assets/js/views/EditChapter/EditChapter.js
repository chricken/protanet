'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import db from "../../db.js";
import data from '../../data.js';

// Components
import CompEditSegment from '../../components/EditSegment/EditSegment.js';
import Segment from "../../classes/Segment.js";

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

    chapter.segments.forEach((segmentID, index) => {
        const segment = data.segments.find(segment => segment.id === segmentID);
        if (segment) {
            CompEditSegment({
                segment,
                index,
                onNewSegment(){
                    const segment = new Segment({
                        chapterID: chapter.id,
                    })
                    data.segments.push(segment);
                    // console.log(segment);
                    chapter.segments.splice(index + 1, 0, segment.id);
                    chapter.save();
                    segment.save();

                }
            });
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