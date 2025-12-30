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
import ViewTabs from '../Tabs/Tabs.js';
import ViewEditWork from '../EditWork/EditWork.js';

// Classes
import Work from "../../classes/Work.js";
import infoBox from "../../components/InfoBox/InfoBox.js";


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