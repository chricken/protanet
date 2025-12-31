'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import data from '../../data.js';
import Chapter from "../../classes/Chapter.js";

import CompChapterListItem from '../../components/ChapterListItem/ChapterListItem.js';

const ViewVolume = ({
                        volume = {},
                        elLegend = {},
                        index = null
                    }) => {
    elements.ui.innerHTML = '';
    elements.workbench.innerHTML = '';

    dom.create({
        parent: elements.ui,
        tagName: 'h2',
        content: volume.title || 'Kein Name',
        cssClassName: 'title editable',
        attr: {
            contentEditable: true
        },
        listeners: {
            input(evt) {
                volume.title = evt.target.innerText;
                elLegend.innerText = `${index}: ${volume.title}`;
                volume.save();
            }
        }
    })

    // Kapitel
    volume.chapters.forEach((chapter, index) => {
        chapter = data.chapters.find(c => c.id === chapter);
        CompChapterListItem({
            chapter,
            index,
            volume,
            onAddChapter(index) {
                const chapter = new Chapter({
                    volumeID: volume.id,
                })
                data.chapters.push(chapter);
                volume.chapters.splice(index, 0, chapter.id);
                volume.save();
                ViewVolume({volume, index, elLegend});
            }
        })

    })

    dom.create({
        tagName: 'link',
        parent: elements.ui,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/views/Tabs/Tabs.css'
        }
    })
}

export default ViewVolume