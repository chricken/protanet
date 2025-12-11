'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import settings from "../../settings.js";
import data from '../../data.js';

import CompInputText from '../../components/inputText/inputText.js';

const CreateNewWork  = () => {
    elements.workspaceUI.innerHTML = '';
    elements.workbench.innerHTML = '';

    const work = {}

    dom.create({
        tagName:'h1',
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

    CompInputText({
        legend: 'Author',
        parent: elements.workbench,
        callback(value) {
            work.author = value;
        }
    })

}

export default CreateNewWork