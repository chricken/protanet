'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';

const infoBox = ({
                     legend = null,
                     parent = null,
                     text = null
                 }) => {

    const elContainer = dom.create({
        parent,
        cssClassName: 'parentInfoBox transit',
    })

    dom.create({
        parent: elContainer,
        cssClassName: 'legend transit',
        content: legend
    })

    dom.create({
        parent: elContainer,
        cssClassName: 'text transit',
        content: text
    })


    dom.create({
        tagName: 'link',
        parent: elContainer,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/InfoBox/InfoBox.css'
        }
    })
}

export default infoBox