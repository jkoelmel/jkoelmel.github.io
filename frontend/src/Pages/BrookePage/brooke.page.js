import React, {Component} from 'react';
import portrait from '../../Assets/Images/brooke_portrait.jpg'
import {Button} from "react-bootstrap";

class BrookePage extends Component {

    render() {
        return (
            <div className={'brooke-page'}>
                <img src={portrait} alt={'Portrait of Brooke Porter'} className={'brooke-image'}/>
                <div className={'brooke-body'}>
                    <Button href="/">Back</Button><br/><br/>

                    <h1>Brooke Porter</h1>
                    <h2>Team 2: Backend Engineer</h2>

                    <p>Email: bporter3@mail.sfsu.edu</p>
                    <p>Discord: bporter#3019</p>
                    <p>Github: <a href={"https://github.com/blporter"}>https://github.com/blporter</a></p>
                    <p>LinkedIn: <a href={"https://www.linkedin.com/in/blp/"}>https://www.linkedin.com/in/blp/</a></p>
                </div>
            </div>
        );
    }
}

export default BrookePage