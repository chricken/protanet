'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import selectbox from '../../components/selectbox/selectbox.js';
import settings from "../../settings.js";

const tabs = () => {
    elements.mainmenu.innerHTML = '';

    let options = Object.values(settings.availableThemes).map(theme => {
        return {
            value: theme.filename,
            text: theme.name
        }
    });

    console.log(options);

    // Farbthemes
    selectbox({
        parent: elements.mainmenu,
        options,
        selected: 0,
        legend: 'Theme',
        callback(value){
            console.log('Selection: ', value);
            elements.theme.remove();
            elements.theme = dom.create({
                parent:document.head,
                tagName: 'link',
                attr: {
                    rel: 'stylesheet',
                    href: `assets/css/themes/${value.value}`
                }
            })
        }
    })
}

export default tabs