import React, {Component} from 'react';
// import portrait from '../../Assets/Images/Paul.jpg'
import {Button} from "react-bootstrap";

class PeterPage extends Component {

    render() {
        return (
            <div>
                {/*<img src={portrait} alt={'Paul Borst'} className={'image'}/>*/}
                <div className={'body'}>
                    <Button href="/">Back</Button><br/><br/>
                        <h1>Peter Hu</h1>
                        <h2>Team2 Back-end Lead</h2>
                        <h3>Email: chu3@mail.sfsu.edu</h3>
                        <p>I like jokes and riddles.</p>>
                        <p><a href="https://www.linkedin.com/in/peter-hu-0279211a2/">LinkedIn </a></p>
                </div>
            </div>
        );
    }
}

export default PeterPage
