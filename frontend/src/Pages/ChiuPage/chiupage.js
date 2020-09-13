import React, {Component} from 'react';
import portrait from '../../Assets/Images/chiu.jpg'
import "../style.css"
import {Button} from "react-bootstrap";
class ChiuPage extends Component {

    render() {
        return (
            <div className={'page'}>
                <img src={portrait} alt={'Chiu Wong'} className={'image'}/>
                <div className={'body'}>
                    <Button href="/">Back</Button><br/><br/>
                    <h1>Chiu Yin Wong</h1>
                    <h2>Team2 Front-end Lead</h2>
                    <h3>Email: cwong24@mail.sfsu.edu</h3>
                    <p>LinkedIn: <a href="https://www.linkedin.com/in/raymond-wong-aa00aa92/">https://www.linkedin.com/in/raymond-wong-aa00aa92/ </a></p>
                </div>
            </div>
        );
    }
}

export default ChiuPage