'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';

import CompInputText from '../inputText/inputText.js';
import CompInputMultiline from '../inputMultiline/inputMultiline.js';
import CompButton from '../button/button.js';
import Work from "../../classes/Work.js";
import ViewTabs from "../../views/Tabs/Tabs.js";
import CompWorkTitle from "../WorkTitle/WorkTitle.js";
import ViewEditWork from "../../views/EditWork/EditWork.js";

const CreateNewWork = () => {
    const myWork = {}

    dom.create({
        tagName: 'h3',
        parent: elements.workbench,
        content: 'Create New Work'
    })

    CompInputText({
        legend: 'Work Title',
        parent: elements.workbench,
        callback(value) {
            myWork.title = value;
        }
    })

    CompInputMultiline({
        legend: 'Description',
        parent: elements.workbench,
        callback(value) {
            myWork.description = value;
        }
    })

    CompInputMultiline({
        legend: 'Summary',
        parent: elements.workbench,
        callback(value) {
            myWork.summary = value;
        }
    })

    CompInputText({
        legend: 'Author',
        parent: elements.workbench,
        callback(value) {
            myWork.author = value;
        }
    })

    /*
    image = null,
    */


    CompButton({
        parent: elements.workbench,
        legend: 'Create Work',
        callback() {

            new Work(myWork).then(work => {

                work.save().then(
                    ViewTabs
                ).then(
                    CompWorkTitle
                ).then(
                    ViewEditWork
                ).catch(
                    console.warn
                )
            })
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