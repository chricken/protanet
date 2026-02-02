'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import data from '../../data.js';
import manageWorks from "../ManageWorks/ManageWorks.js";

// Components
import CompButton from '../../components/button/button.js';
import CompInputText from '../../components/inputText/inputText.js';
import CompInputMultiline from '../../components/inputMultiline/inputMultiline.js';
import CompInfoBox from '../../components/InfoBox_alt/InfoBox.js';
import CompWorkTitle from '../../components/WorkTitle/WorkTitle.js';


const EditGraph = () => {
    elements.workspaceUI.innerHTML = '';
    elements.workbench.innerHTML = '';

    const work = data.work;

    dom.create({
        tagName: 'h1',
        parent: elements.workbench,
        content: 'Edit Graph'
    })

    const elGraph = dom.create({
        tagName:'canvas',
        id:'cGraph',
        parent: elements.workbench,
        attr:{
            width: 800,
            height: 800,
        }
    })

    const containerUI = dom.create({
        parent: elements.workbench,
        cssClassName: 'containerUI',
        content: 'Hier sind die Bedienelemente'
    })

    elements.ui.innerHTML = 'Hier eine Übersicht über die Elemente, die dann im Editor angezeigt werden.';


    dom.create({
        tagName: 'link',
        parent: elements.tabs,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/views/EditGraph/EditGraph.css'
        }
    })

}

export default EditGraph