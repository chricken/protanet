'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';

import CompInputText from '../inputText/inputText.js';
import CompInputMultiline from '../inputMultiline/inputMultiline.js';
import CompButton from '../button/button.js';
import Work from "../../classes/Work.js";

const CreateNewWork = () => {

    const work = new Work();

    dom.create({
        tagName: 'h3',
        parent: elements.workbench,
        content: 'Create New Work'
    })

    CompInputText({
        legend: 'Work Title',
        parent: elements.workbench,
        callback(value) {
            work.title = value;
        }
    })

    CompInputMultiline({
        legend: 'Description',
        parent: elements.workbench,
        callback(value) {
            work.description = value;
        }
    })

    CompInputMultiline({
        legend: 'Summary',
        parent: elements.workbench,
        callback(value) {
            work.summary = value;
        }
    })

    CompInputText({
        legend: 'Author',
        parent: elements.workbench,
        callback(value) {
            work.author = value;
        }
    })

    /*
    image = null,
    */


    CompButton({
        parent: elements.workbench,
        legend: 'Create Work',
        callback() {
            work.save();
        }
    })


    dom.create({
        tagName: 'link',
        parent: elements.tabs,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/CreateNewWork/CreateNewWork.css'
        }
    })

}

export default CreateNewWork