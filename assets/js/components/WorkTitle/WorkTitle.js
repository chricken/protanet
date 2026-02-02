'use strict';

import dom from '../../dom.js';
import elements from "../../elements.js";
import data from "../../data.js";
import spacerHorz from "../spacerHorz/spacerHorz.js";
import ViewEditWork from "../../views/EditWork/EditWork.js";

const workTitle = ({
                       parent = elements.mainMenu,
                   } = {}) => {

    if (elements.containerWorkTitle) {
        let elContainer = dom.create({
            parent: elements.containerWorkTitle,
            cssClassName: 'worktitle active transit',
            insert: 'after',
            listeners: {
                click(evt){
                    evt.stopPropagation();
                    console.log(`edit ${data?.work?.title}`);
                    ViewEditWork();
                }
            }
        })

        elements.containerWorkTitle.remove();
        elements.containerWorkTitle = elContainer;
    } else {
        elements.containerWorkTitle = dom.create({
            parent,
            cssClassName: 'worktitle',
        })
        spacerHorz({
            parent
        });
    }


    dom.create({
        cssClassName: 'titleText',
        parent: elements.containerWorkTitle,
        content: data?.work?.title || 'No Work loaded'
    })


    dom.create({
        tagName: 'link',
        parent: elements.containerWorkTitle,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/WorkTitle/WorkTitle.css'
        }
    })
}

export default workTitle