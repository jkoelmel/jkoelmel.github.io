import React, {Component} from 'react';
import portrait from '../../Assets/Images/Paul.jpg'
import {Button} from "react-bootstrap";

class PaulPage extends Component {

    render() {
        return (
            <div className={'page'}>
                <img src={portrait} alt={'Paul Borst'} className={'image'}/>
                <div className={'body'}>
                    <Button href="/">Back</Button><br/><br/>
                    <h1>Paul James Borst</h1>
                    <h2>Team2 Front-end</h2>
                    <h3>Email: pborst@mail.sfsu.edu</h3>
                    <h3> Cell: (917) 723-2065</h3>
                    <p>I was a US Naval officer (nuclear power - 10 years) and high school teacher (physics - 10 years).
                        I am currently a CS student at SFSU with an interest in AI and starting my own company.</p>
                </div>
            </div>
        );
    }
}

export default PaulPage