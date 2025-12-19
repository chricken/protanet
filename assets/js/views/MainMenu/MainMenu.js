'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import settings from "../../settings.js";
import data from '../../data.js';

import CompSelectbox from '../../components/selectbox/selectbox.js';
import CompMenuLink from '../../components/menulink/menulink.js';
import CompSpacerHorz from '../../components/spacerHorz/spacerHorz.js';
import CompWorkTitle from '../../components/WorkTitle/WorkTitle.js';

import ViewManageWorks from '../ManageWorks/ManageWorks.js';


const MainMenu = () => {
    elements.mainMenu.innerHTML = '';

    let options = Object.values(settings.availableThemes).map(theme => {
        return {
            value: theme.filename,
            text: theme.name
        }
    });

    // console.log(options);

    CompWorkTitle();

    // Funktionslinks
    CompMenuLink({
        legend: 'Manage Works',
        callback() {
            // console.log('Create new Work');

            ViewManageWorks();
        }
    });

    if (data?.work?.title) {
        CompMenuLink({
            legend: 'Export Work',
            callback() {
            }
        })
    }

    // Abstand
    CompSpacerHorz({
        parent: elements.mainMenu
    })

    // Farbthemes
    CompSelectbox({
        parent: elements.mainMenu,
        options,
        selected: 0,
        legend: 'Theme',
        callback(value) {
            console.log('Selection: ', value);
            elements.theme.remove();
            elements.theme = dom.create({
                parent: document.head,
                tagName: 'link',
                attr: {
                    rel: 'stylesheet',
                    href: `assets/css/themes/${value.value}`
                }
            })
        }
    })


    dom.create({
        tagName: 'link',
        parent: elements.tabs,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/views/MainMenu/MainMenu.css'
        }
    })
}

export default MainMenu