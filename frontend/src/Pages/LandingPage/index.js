import React from 'react'
import "./styles.css"
import { Button } from "react-bootstrap"


const Landing = () => {
    return (
        <body>
        <h1>Software Engineering class SFSU</h1>
        <h1>FALL 2020</h1>
        <h1>Section 01</h1>
        <h1>TEAM 2</h1>
        <p><br/><br/>
            Team member 1 &nbsp;
            <Button href="/jarett">Jarett Koelmel</Button>
        </p>
        <p>
            Team member 2 &nbsp;
            <Button href="/chiu">Chiu Wong</Button>
        </p>
        <p>
            Team member 3 &nbsp;
            <Button href="/">Eric Chen</Button>
        </p>
        <p>
            Team member 4 &nbsp;
            <Button href="/brooke">Brooke Porter</Button>
        </p>
        <p>
            Team member 5 &nbsp;
            <Button href="/paul">Paul Borst</Button>
        </p>
        <p>
            Team member 6 &nbsp;
            <Button href="/">Peter Hu</Button>
        </p>
        <p>
            Team member 7 &nbsp;
            <Button href="/michael">Michael Canson</Button>
        </p>
        </body>
    )
}

export default Landing