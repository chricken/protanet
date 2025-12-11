'use strict';

import dom from '../../dom.js';
import elements from "../../elements.js";
import data from "../../data.js";
import spacerHorz from "../spacerHorz/spacerHorz.js";

const workTitle = ({
                       parent = elements.mainMenu,
                   } = {}) => {
    const elContainer = dom.create({
        parent,
        cssClassName: 'worktitle',
    })

    spacerHorz({
        parent
    });

    dom.create({
        cssClassName: 'titleText',
        parent: elContainer,
        content: data?.work?.title || 'Kein Projekt'
    })


    dom.create({
        tagName: 'link',
        parent: elContainer,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/WorkTitle/WorkTitle.css'
        }
    })
}

export default workTitle