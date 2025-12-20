'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import data from '../../data.js';

import CompTab from '../../components/tab/tab.js';

const tabs = () => {
    elements.tabs.innerHTML = '';

    console.log('Volumes', data.volumes, data.volumes.length);
    data.volumes.forEach((volume, index) => {
        console.log('Volume Tab', volume);
        CompTab({
            volume,
            legend: `${index}: ${volume.title}`,
            editable: true,
        })
    })

    if (data.work?.id) {

        CompTab({
            legend: '+ Add Volume',
            callback() {
            }
        })

        CompTab(({
            legend: 'Graph',
            active: true,
            callback() {
            }
        }))
    }

    dom.create({
        tagName: 'link',
        parent: elements.tabs,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/views/Tabs/Tabs.css'
        }
    })
}

export default tabs