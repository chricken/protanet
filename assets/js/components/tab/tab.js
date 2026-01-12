'use strict';

import dom from '../../dom.js';
import elements from '../../elements.js';
import ViewEditVolume from "../../views/EditVolume/EditVolume.js";

const tab = ({
                 volume = null,
                 legend = null,
                 index = null,
                 parent = elements.tabs,
                 active = false,

                 editable = false,
                 callback = value => {
                 }
             }) => {

    const elContainer = dom.create({
        parent,
        cssClassName: `tab transit ${active ? 'active' : ''}`,
        listeners: {
            click() {
                callback({
                    elLegend,
                    index
                })
            },
        },
    })

    const elLegend = dom.create({
        parent: elContainer,
        cssClassName: 'legend transit',
        content: `${legend}: `

    })


    if (editable) {
        const cEdit = dom.create({
            parent: elContainer,
            cssClassName: 'btnEdit',
            tagName: 'canvas',
            attr: {
                width: 12,
                height: 12
            },
            listeners: {
                click(evt) {
                    evt.stopPropagation();
                    ViewEditVolume(volume);
                }
            }
        })

        const ctx = cEdit.getContext('2d');
        ctx.fillStyle = '#333';

        // Zahnrad Parameter
        const centerX = 6;
        const centerY = 6;
        const innerRadius = 5;
        const outerRadius = 6;
        const teeth = 6;
        const toothAngle = (Math.PI * 2) / teeth;
        const toothWidth = toothAngle * 0.4;

        // Zahnrad mit rechteckigen Zähnen zeichnen
        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
            const baseAngle = i * toothAngle;

            // Innerer Kreisbogen zwischen Zähnen
            const innerStart = baseAngle + toothWidth / 2;
            const innerEnd = baseAngle + toothAngle - toothWidth / 2;

            // Zum Start des Zahns
            ctx.lineTo(
                centerX + innerRadius * Math.cos(innerStart),
                centerY + innerRadius * Math.sin(innerStart)
            );

            // Äußere Zahnkante
            ctx.lineTo(
                centerX + outerRadius * Math.cos(innerStart),
                centerY + outerRadius * Math.sin(innerStart)
            );
            ctx.lineTo(
                centerX + outerRadius * Math.cos(baseAngle + toothWidth / 2 * 1.1),
                centerY + outerRadius * Math.sin(baseAngle + toothWidth / 2 * 1.1)
            );
            ctx.lineTo(
                centerX + outerRadius * Math.cos(innerEnd - toothWidth * 0.05),
                centerY + outerRadius * Math.sin(innerEnd - toothWidth * 0.05)
            );
            ctx.lineTo(
                centerX + outerRadius * Math.cos(innerEnd),
                centerY + outerRadius * Math.sin(innerEnd)
            );
            ctx.lineTo(
                centerX + innerRadius * Math.cos(innerEnd),
                centerY + innerRadius * Math.sin(innerEnd)
            );
        }
        ctx.closePath();
        ctx.fill();

        // Mittleres Loch
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 2.2, 0, Math.PI * 2);
        ctx.fill();


    }

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