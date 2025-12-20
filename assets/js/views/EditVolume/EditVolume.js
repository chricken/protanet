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

// Classes
import Work from "../../classes/Work.js";
import infoBox from "../../components/InfoBox/InfoBox.js";



const EditVolume = (volume) => {
    elements.workspaceUI.innerHTML = '';
    elements.workbench.innerHTML = '';

    dom.create({
        tagName: 'h1',
        parent: elements.workbench,
        content: 'Edit Volume'
    })

    // Title
    CompInputText({
        legend: 'Title',
        parent: elements.workbench,
        value: volume.title || '',
        callback: (value) => {
            volume.title = value;
        }
    });

    // Description
    CompInputMultiline({
        legend: 'Description',
        parent: elements.workbench,
        value: volume.description || '',
        callback: (value) => {
            volume.description = value;
        }
    });

    // Summary
    CompInputMultiline({
        legend: 'Summary',
        parent: elements.workbench,
        value: volume.summary || '',
        callback: (value) => {
            volume.summary = value;
        }
    });

    // Image
    CompInputText({
        legend: 'Image URL',
        parent: elements.workbench,
        value: volume.image || '',
        callback: (value) => {
            volume.image = value;
        }
    });

    // Save Button
    CompButton({
        legend: 'Save Volume',
        parent: elements.workbench,
        callback: () => {
            volume.save().then(() => {
                CompInfoBox({
                    message: 'Volume saved successfully!',
                    type: 'success'
                });
            }).catch(err => {
                CompInfoBox({
                    message: 'Error saving volume: ' + err,
                    type: 'error'
                });
            });
        }
    });

    dom.create({
        tagName: 'link',
        parent: elements.tabs,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/views/EditVolume/EditVolume.css'
        }
    })

}

export default EditVolume