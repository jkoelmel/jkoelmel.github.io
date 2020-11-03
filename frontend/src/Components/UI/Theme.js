import {createMuiTheme} from '@material-ui/core/styles' //different from @@material-u
import React from 'react'

const darkBlue = "#00559A"

export default createMuiTheme({
    palette: {
        common: {
            blue: `${darkBlue}`

        },
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#ffff',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: `${darkBlue}`,
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#00559A',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
})
