'use strict';

import dom from '../../dom.js';

const infoBox = ({
                     parent,
                     description,
                     legend = 'Details',
                     onEdit = () => {
                     }
                 }) => {
    const elInfoIcon = dom.create({
        parent,
        cssClassName: `info-icon transit`,
        content: legend,
        listeners: {
            click: (evt) => {
                evt.stopPropagation();
                showInfoBox(evt.clientX, evt.clientY, description);
            }
        }
    });

    const showInfoBox = (x, y, desc) => {

        const elInfoBox = dom.create({
            parent: document.body,
            cssClassName: 'info-box',
            content: desc,
            attr: {
                contentEditable: true,
            },
            styles: {
                left: `${x}px`,
                top: `${y}px`,
                zIndex: 1000
            },
            listeners: {
                click: (evt) => {
                    evt.stopPropagation();
                },
                input: (evt) => {
                    desc = evt.target.innerText;
                    description = evt.target.innerText;
                    onEdit(description);
                }
            }
        });

        const hideInfoBox = () => {
            document.body.removeChild(elInfoBox);
            document.removeEventListener('click', hideInfoBox);
        };

        document.addEventListener('click', hideInfoBox);
    };

    dom.create({
        tagName: 'link',
        parent,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/InfoBox/InfoBox.css'
        }
    })

    return elInfoIcon;
};

export default infoBox;
