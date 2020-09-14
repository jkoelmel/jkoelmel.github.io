import React from 'react'
import "./styles.css"
// import { Button } from "react-bootstrap"
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button'

const Landing = () => {
    return (
        <body>
        <h1>CSC648 Software Engineering SFSU</h1>
        <h1>Fall 2020</h1>
        <h1>Section 01</h1>
        <h1>Team 2</h1>
        <p><br/><br/>
            Team member 1 &nbsp;
            <Button variant="contained" href="/jarett">Jarett Koelmel</Button>
        </p>
        <p>
            Team member 2 &nbsp;
            <Button variant="contained" href="/chiu">Chiu Wong</Button>
        </p>
        <p>
            Team member 3 &nbsp;
            <Button variant="contained" href="/eric">Eric Chen</Button>
        </p>
        <p>
            Team member 4 &nbsp;
            <Button variant="contained" href="/brooke">Brooke Porter</Button>
        </p>
        <p>
            Team member 5 &nbsp;
            <Button variant="contained" href="/paul">Paul Borst</Button>
        </p>
        <p>
            Team member 6 &nbsp;
            <Button variant="contained" href="/peter">Peter Hu</Button>
        </p>
        <p>
            Team member 7 &nbsp;
            {/* <Button href="/michael">Michael Canson</Button> */}
            {/* <Link to="/michael">Michael Canson</Link> */}
            <Button variant="contained" href="/michael">
                Michael Canson
            </Button>
        </p>
        </body>
    )
}

export default Landing