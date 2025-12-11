'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import data from '../../data.js';

import CompTab from '../../components/tab/tab.js';

const tabs = () => {
    elements.tabs.innerHTML = '';

    data.volumes.forEach((volume , index)=> {
        console.log(volume);
        CompTab({
            legend: `${index}: ${volume.title}`,
        })
    })



    CompTab({
        legend: '+ Add Volume',
        callback(){}
    })

    CompTab(({
        legend: 'Graph',
        active: true,
        callback(){}
    }))

    dom.create({
        tagName: 'link',
        parent: elements.tabs,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/views/tabs/tabs.css'
        }
    })
}

export default tabs