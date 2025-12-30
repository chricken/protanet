'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import data from '../../data.js';

import CompTab from '../../components/tab/tab.js';
import Volume from "../../classes/Volume.js";
import ViewEditVolume from "../EditVolume/EditVolume.js";
import ViewVolume from "../Volume/Volume.js";

const tabs = () => {
    elements.tabs.innerHTML = '';

    data.volumes.forEach((volume, index) => {
        CompTab({
            volume,
            legend: `${index}: ${volume.title}`,
            editable: true,
            index,
            callback({
                         elLegend,
                         index
                     }) {
                ViewVolume({
                    volume,
                    elLegend,
                    index
                })
            },
        })
    })

    if (data.work?.id) {

        CompTab({
            legend: '+ Add Volume',
            callback() {
                // Wenn ich diesen Anklicke, gibt es ein neues Volume
                const myVolume = new Volume({
                    workID: data.work.id,
                })

                data.work.volumes.push(myVolume.id);

                data.volumes.push(myVolume);
                myVolume.save();
                data.work.save();
                tabs();
                ViewEditVolume(myVolume);
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