'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import db from "../../db.js";
import data from '../../data.js';

// Components
import CompButton from '../../components/button/button.js';
import CompInputText from '../../components/inputText/inputText.js';
import CompInputMultiline from '../../components/inputMultiline/inputMultiline.js';
import CompInfoBox from '../../components/InfoBox/InfoBox.js';
import CompWorkTitle from '../../components/WorkTitle/WorkTitle.js';



const EditWork = () => {
    elements.workspaceUI.innerHTML = '';
    elements.workbench.innerHTML = '';

    const work = data.work;
    console.log('Edit', work);


    dom.create({
        tagName: 'h1',
        parent: elements.workbench,
        content: 'Edit Work'
    })

    // Title Input
    CompInputText({
        legend: 'Work Title',
        parent: elements.workbench,
        value: work.title,
        callback(value) {
            work.title = value;
        }
    })

    // Description Input
    CompInputMultiline({
        legend: 'Description',
        parent: elements.workbench,
        value: work.description,
        callback(value) {
            work.description = value;
        }
    })

    // Image Input
    CompInputText({
        legend: 'Image URL',
        parent: elements.workbench,
        value: work.image,
        callback(value) {
            work.image = value;
        }
    })

    // Summary Input
    CompInputMultiline({
        legend: 'Summary',
        parent: elements.workbench,
        value: work.summary,
        callback(value) {
            work.summary = value;
        }
    })

    // Roles Input
    CompInputText({
        legend: 'Roles (comma-separated)',
        parent: elements.workbench,
        content: work.roles.join(', '),
        callback(value) {
            work.roles = value.split(',').map(role => role.trim()).filter(role => role);
        }
    })

    // Created Date Display
    CompInfoBox({
        legend: 'Created',
        text: new Date(work.crDate).toLocaleDateString(),
        parent: elements.workbench
    })

    // Last Changed Date Display
    CompInfoBox({
        legend: 'Last Modified',
        text: new Date(work.chDate).toLocaleDateString(),
        parent: elements.workbench
    })

    // Volumes Display
    CompInfoBox({
        legend: 'Volumes',
        text: work.volumes.length.toString(),
        parent: elements.workbench
    })

    // Save Button
    CompButton({
        parent: elements.workbench,
        legend: 'Save Changes',
        callback() {
            work.save().then(() => {
                alert('Work saved successfully!');
                CompWorkTitle();
            });
        }
    })

    dom.create({
        tagName: 'link',
        parent: elements.tabs,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/views/EditWork/EditWork.css'
        }
    })

}

export default EditWork