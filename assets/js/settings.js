'use strict';

const settings = {
    availableThemes: {
        basic:{
            name: 'Basic',
            filename:'themeBasic.css'
        },
        pink:{
            name: 'Pink',
            filename:'themePink.css'
        },
        green:{
            name: 'Green',
            filename:'themeOlive.css'
        },
        sepia:{
            name: 'Sepia',
            filename:'themeSepia.css'
        },
        dark:{
            name: 'Dark',
            filename:'themeDark.css'
        },
        hicontrast:{
            name: 'High Contrast',
            filename:'themeHiContrast.css'
        },
        inverted:{
            name: 'Inverted',
            filename:'themeInverted.css'
        }
    },
    selecedTheme: 'basic',
    delayOfDebouncers: 1000

}

export default settings;