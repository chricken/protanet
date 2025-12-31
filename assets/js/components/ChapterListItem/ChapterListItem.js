'use strict';

import dom from '../../dom.js';
import data from '../../data.js';
import elements from '../../elements.js';
import CompSegmentListItem from '../SegmentListItem/SegmentListItem.js';
import ViewEditChapter from "../../views/EditChapter/EditChapter.js";
import ViewVolume from "../../views/Volume/Volume.js";

const chapterListItem = ({
                             chapter,
                             index,
                             volume,
                             onAddChapter = () => {
                             }
                         }) => {

    const elContainer = dom.create({
        parent: elements.ui,
        cssClassName: 'parentChapterListItem transit',
        listeners: {
            click(evt) {
                evt.stopPropagation();
                chapter.active = true;
                document.querySelectorAll('.active').forEach(
                    el => el.classList.remove('active')
                );
                elContainer.classList.add('active');
                ViewEditChapter({
                    chapter,
                    onChangeTitle: () => {
                        elLegend.innerText = `${chapter.title || 'No Title'}`;
                    }
                })
            }
        }
    })

    // Create arrow indicator
    dom.create({
        parent: elContainer,
        cssClassName: 'arrowIndicator transit',
        content: '▶',
        listeners: {
            click(evt) {
                evt.stopPropagation();
                elContainer.classList.toggle('opened');
            }
        }
    })

    const elOpener = dom.create({
        parent: elContainer,
        cssClassName: 'opener transit',
    })

    const elPreLegend = dom.create({
        parent: elOpener,
        cssClassName: 'preLegend transit',
        content: `Chapter ${index + 1}:`,

    })

    const elLegend = dom.create({
        parent: elOpener,
        cssClassName: 'legend transit editable',
        content: `${chapter.title || 'No Title'}`,
        attr: {
            contentEditable: true
        },

        listeners: {
            click(evt) {
                evt.stopPropagation();
            },
            input(evt) {
                chapter.title = evt.target.innerText;
                chapter.save();
            }
        }
    })

    chapter.segments.forEach((segment, index) => {
        segment = data.segments.find(s => s.id === segment)
        CompSegmentListItem({
            segment,
            parent: elOpener
        })

    })

    // Container fpr Buttons
    const containersButtons = dom.create({
        parent: elOpener,
        cssClassName: 'buttonsContainer'
    })

    // Create button to add new chapter
    dom.create({
        parent: containersButtons,
        cssClassName: 'button addChapterButton',
        content: '+',
        listeners: {
            click() {
                onAddChapter(index + 1)
            }
        }
    })

    if (index > 0) {
        dom.create({
            parent: containersButtons,
            cssClassName: 'button addChapterButton',
            content: '⇑',
            listeners: {
                click() {
                    const temp = volume.chapters[index];
                    volume.chapters[index] = volume.chapters[index - 1];
                    volume.chapters[index - 1] = temp;
                    volume.save();
                    ViewVolume({volume, index, elLegend});
                }
            }
        })
    }

    if (index < volume.chapters.length - 1) {
        dom.create({
            parent: containersButtons,
            cssClassName: 'button addChapterButton',
            content: '⇓',
            listeners: {
                click() {
                    const temp = volume.chapters[index];
                    volume.chapters[index] = volume.chapters[index + 1];
                    volume.chapters[index + 1] = temp;
                    volume.save();
                    ViewVolume({volume, index, elLegend});
                }
            }
        })
    }

    dom.create({
        parent: containersButtons,
        cssClassName: 'button removeChapterButton',
        content: '✖',
        listeners: {
            click() {
                volume.chapters.splice(index, 1);
                volume.save();
                ViewVolume({volume, index, elLegend});
            }
        }
    })

    dom.create({
        tagName: 'link',
        parent: elContainer,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/ChapterListItem/ChapterListItem.css'
        }
    })
}

export default chapterListItem