'use strict';

import dom from '../../dom.js';

const spacerHorz = ({
                       legend = '|',
                       parent = null,
                   }) => {
    const elContainer = dom.create({
        parent,
        cssClassName: 'spacerHorz',
        content: legend
    })


    dom.create({
        tagName: 'link',
        parent: elContainer,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/spacerHorz/spacerHorz.css'
        }
    })
}

export default spacerHorz