'use strict';

import dom from '../../dom.js';

const selectbox = ({
                       legend = null,
                       parent = null,
                       // Options enthalten Objekte mit den Attributen
                       // value, text, isSelectable, isComment
                       options = [],
                       // Selected kann eine Number oder ein String sein.
                       // Ein String wird dann aus der Liste ausgewählt eine Number bezeichnet einfach den Indes
                       selected = null,
                       // Wenn hier ein Wert übergeben wird, wird dieser über der
                       // Liste der Optionen eingehängt. Z.B. "Bitte wählen"
                       defaultValue = null,
                       // Ist dieses Element in einen Container gekapselt
                       capsuled = false,
                       callback = value => {
                       }
                   }) => {

    let container;
    if (capsuled) {
        container = dom.create({
            cssClassName: 'parentSelectbox',
            parent
        })
    } else {
        container = parent;
    }

    const selectHandler = () => {
        elValue.innerHTML = selected.text || selected.value;
        callback(selected);
    }

    const elSelect = dom.create({
        parent,
        cssClassName: 'selectbox',
        listeners: {
            click() {
                elList.classList.toggle('hidden');
                elList.style.width = `${elSelect.innerWidth}px`;
            }
        }
    })
    let elLegend;
    if (legend) {
        elLegend = dom.create({
            parent: elSelect,
            cssClassName: 'legend',
            content: `${legend}: `
        })
    }

    const elValue = dom.create({
        parent: elSelect,
        cssClassName: 'value',
        content: selected !== null ? options[selected].text : defaultValue,

    })

    // Optionsliste
    const elList = dom.create({
        parent: elSelect,
        cssClassName: 'list transit hidden',
    })


    // Suchfeld
    const elInpSearch = dom.create({
        tagName: 'input',
        parent: elList,
        cssClassName: 'search',
        attributes: {
            type: 'text'
        },
        listeners: {
            input() {

                const filtered = options.filter(option => {
                    if (option.value.toLowerCase().includes(
                        elInpSearch.value.toLowerCase()
                    )) return true;

                    if (option.text.toLowerCase().includes(
                        elInpSearch.value.toLowerCase()
                    )) return true;

                    return false
                })
                parentOptions.innerHTML = '';

                filtered.forEach(option => {
                    dom.create({
                        parent: parentOptions,
                        cssClassName: 'option tramsit',
                        content: option.text,
                        listeners: {
                            click() {
                                selected = option;
                                selectHandler()
                            }
                        }
                    })
                })
            },
            click(evt) {
                evt.stopPropagation();
            }
        }
    })

    const parentOptions = dom.create({
        parent: elList,
        cssClassName: 'options'
    })

    options.forEach(option => {
        dom.create({
            parent: parentOptions,
            cssClassName: 'option tramsit',
            content: option.text,
            listeners: {
                click() {
                    selected = option;
                    selectHandler()
                }
            }
        })
    })

    dom.create({
        tagName: 'link',
        parent: container,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/selectbox/selectbox.css'
        }
    })
}

export default selectbox