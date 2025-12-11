'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';

const menulink = ({
                      legend = null,
                      parent = elements.mainmenu,
                      callback = value => {
                      }
                  }) => {

    const elContainer = dom.create({
        parent,
        cssClassName: 'parentMenulink transit'
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
            href: 'assets/js/components/menulink/menulink.css'
        }
    })
}

export default menulink