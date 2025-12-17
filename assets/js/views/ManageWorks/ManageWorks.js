'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import db from "../../db.js";
import data from '../../data.js';

// Components
import CompButton from '../../components/button/button.js';
import selectList from "../../components/selectList/selectList.js";
import CompInfoBox from '../../components/InfoBox/InfoBox.js';
import CompCreateNewWork from '../../components/CreateNewWork/CreateNewWork.js';
import ViewTabs from '../Tabs/Tabs.js';

// Classes
import Work from "../../classes/Work.js";
import infoBox from "../../components/InfoBox/InfoBox.js";

const loadWorks = () => {
    return db.listAllData({
        dbName: 'works',
    })
}

const ManageWorks = () => {
    elements.workspaceUI.innerHTML = '';
    elements.workbench.innerHTML = '';

    const work = {}

    dom.create({
        tagName: 'h1',
        parent: elements.workbench,
        content: 'Manage Works'
    })

    const parentWorksList = dom.create({
        tagName: 'div',
        parent: elements.workbench,
    })

    loadWorks().then(works => {

        // Hier darf die Klasse nicht verwendet werden, da sonst bei jeder Work das data-Objekt neu beschrieben würde
        // works = works.map(work => new Work(work));

        const parentLoadWorks = dom.create({
            parent: parentWorksList,
            cssClassName: 'parentLoadWorks',
        })

        selectList({
            legend: 'Load Work',
            parent: parentLoadWorks,
            cssClassName: 'SelectList',
            capsuled: true,
            options: works.map(work => ({
                // value, text, isSelectable, isComment
                value: work.id,
                text: work.title,
            })),
            callback(selected) {
                let selectedWork = works.find(work => work.id === selected.value)
                console.log(selectedWork);

                if (selected) {
                    parentInfoWork.innerHTML = '';

                    dom.create({
                        parent: parentInfoWork,
                        tagName: 'h3',
                        content: selectedWork.title
                    })

                    CompInfoBox({
                        legend: 'Created',
                        text: new Date(selectedWork.crDate).toLocaleDateString(),
                        parent: parentInfoWork
                    })

                    CompInfoBox({
                        parent: parentInfoWork,
                        legend: 'Volumes',
                        text: selectedWork.volumes.length.toString()
                    })
                    // Zusammenfassung
                    if (selectedWork.summary) {
                        CompInfoBox({
                            parent: parentInfoWork,
                            legend: 'Summary',
                            text: selectedWork.summary
                        })
                    }

                    CompButton({
                        legend: 'Load Work',
                        parent: parentInfoWork,
                        callback() {
                            // Werk mit der Klasse anlegen, dadurch werden die Daten automatisch ins data-Objekt geschrieben
                            new Work(selectedWork);
                            ViewTabs();
                        }
                    })

                }
            }
        })

        const parentInfoWork = dom.create({
            parent: parentLoadWorks,
            cssClassName: 'parentInfoWork',
        })
    })


    CompCreateNewWork();


    dom.create({
        tagName: 'link',
        parent: elements.tabs,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/views/ManageWorks/ManageWorks.css'
        }
    })

}

export default ManageWorks