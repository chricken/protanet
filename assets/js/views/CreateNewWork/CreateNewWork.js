'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import settings from "../../settings.js";
import data from '../../data.js';

import CompInputText from '../../components/inputText/inputText.js';
import CompInputMultiline from '../../components/inputMultiline/inputMultiline.js';
import CompButton from '../../components/button/button.js';
import CompSpacerHorz from '../../components/spacerHorz/spacerHorz.js';

const CreateNewWork = () => {
    elements.workspaceUI.innerHTML = '';
    elements.workbench.innerHTML = '';

    const work = {}

    dom.create({
        tagName: 'h1',
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
            console.log(work);
        }
    })

}

export default CreateNewWork