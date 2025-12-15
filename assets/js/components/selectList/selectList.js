'use strict';

import dom from '../../dom.js';

const selectList = ({
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
                        cssClassName = null,
                        callback = value => {
                        }
                    }) => {

    if (capsuled) {
        parent = dom.create({
            cssClassName: `parentSelectList ${cssClassName || ''}`,
            parent
        })
    }

    dom.create({
        parent,
        tagName: 'h3',
        cssClassName: 'legend',
        content: legend
    })

    const elSelect = dom.create({
        parent,
        cssClassName: 'selectList',

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
                    callback(option);
                }
            }
        })
    })

    dom.create({
        tagName: 'link',
        parent,
        attr: {
            rel: 'stylesheet',
            href: 'assets/js/components/selectList/selectList.css'
        }
    })
}

export default selectList