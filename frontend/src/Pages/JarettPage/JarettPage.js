import React, {Component} from 'react';
import portrait from '../../Assets/Images/jarett.jpg'
import {Button} from "react-bootstrap";

class JarettPage extends Component {

    render() {
        return (
            <div className={'page'}>
                <img src={portrait} alt={'Jarett Koelmel'} className={'image'}/>
                <div className={'body'}>
                    <Button href="/">Back</Button><br/><br/>
                <h1>Jarett Koelmel</h1><br />
                <h3>Team Lead/Scrum Master</h3><br />

                <p>As team leader, I am responsible for general DevOps and product deployment management.
                    The natural overlap between leading a team and managing communication, morale, and scheduling resulted
                    in my taking over the position of scrum master as well. While the development of tech-based products is new to my repertoire, I have a decade of
                    experience in naval engineering, product line management, and scheduling of multiple platforms'
                    equipment.</p>
                </div>
            </div>
        );
    }
}

export default JarettPage