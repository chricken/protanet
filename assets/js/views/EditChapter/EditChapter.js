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

    // Chapter als eigene Funktion zeichnen, damit sie rekursiv aufgerufen werden können
    const drawSegments = (segmentID, index) => {
        const segment = data.segments.find(segment => segment.id === segmentID);
        if (segment) {
            CompEditSegment({
                segment,
                chapter,
                index,
                onNewSegment() {
                    const segment = new Segment({
                        chapterID: chapter.id,
                    })
                    data.segments.push(segment);
                    // console.log(segment);
                    chapter.segments.splice(index + 1, 0, segment.id);
                    chapter.save();
                    segment.save();
                    /*
                    elements.workbench.innerHTML = '';
                    chapter.segments.forEach(drawSegments)
                     */
                    EditChapter({
                        chapter,
                        onChangeTitle
                    })
                },
                onRemoveSegment() {
                    return segment.delete().then(
                        () => {
                            chapter.segments.splice(index, 1);
                            chapter.save();
                            elements.workbench.innerHTML = '';
                            chapter.segments.forEach(drawSegments)
                        }
                    );
                },
                onSelectSegment() {
                    chapter.activeSegment = segmentID;
                }
            });
            segment.save();
        }
    }

    chapter.segments.forEach(drawSegments)

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