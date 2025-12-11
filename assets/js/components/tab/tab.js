'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';

const tab = ({
                 legend = null,
                 parent = elements.tabs,
                 active = false,
                 callback = value => {
                 }
             }) => {

    const elContainer = dom.create({
        parent,
        cssClassName: `tab transit ${active ? 'active' : ''}`
    })

    const elLegend = dom.create({
        parent: elContainer,
        cssClassName: 'legend transit',
        content: `${legend}: `
    })


    dom.create({
        tagName: 'link',
        parent: elContainer,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/tab/tab.css'
        }
    })
}

export default tab