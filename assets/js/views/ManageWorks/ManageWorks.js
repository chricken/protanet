'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';

import CompButton from '../../components/button/button.js';
import db from "../../db.js";
import selectList from "../../components/selectList/selectList.js";
import Work from "../../classes/Work.js";

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
        console.log(works);

        works = works.map(work => new Work(work));

        selectList({
            legend: 'Select Work',
            parent: parentWorksList,
            capsuled: true,
            options: works.map(work => ({
                // value, text, isSelectable, isComment
                value: work.id,
                text: work.title,
            })),
        })
    })

    CompButton({
        parent: elements.workbench,
        legend: 'Create Work',
        callback() {
            console.log(work);
        }
    })


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