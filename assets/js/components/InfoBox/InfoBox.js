'use strict';

import dom from '../../dom.js';

const infoBox = ({
    parent,
    description,
}) => {
    const elInfoIcon = dom.create({
        parent,
        cssClassName: `info-icon transit`,
        content: '?',
        listeners: {
            click: (evt) => {
                evt.stopPropagation();
                showInfoBox(evt.clientX, evt.clientY, description);
            }
        }
    });

    const showInfoBox = (x, y, description) => {
        console.log('position', x, y, description);

        const elInfoBox = dom.create({
            parent: document.body,
            cssClassName: 'info-box',
            content: description,
            styles: {
                left: `${x}px`,
                top: `${y}px`,
                zIndex: 1000
            },
            listeners: {
                click: (evt) => {
                    evt.stopPropagation();
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
