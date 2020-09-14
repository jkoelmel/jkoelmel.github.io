import React, {Component} from 'react';
import Button from '@material-ui/core/Button'

class MichaelPage extends Component {

    render() {
        return (
           <div>
               <Button variant="contained" href="/">Back</Button><br/><br/>
            <h1>Michael John Canson</h1>
            <div>
                <h2>Team 2: Front-end Team</h2>
                <div>
                    <p>email: mcanson@mail.sfsu.edu</p>
                    <p>Github: <a href={"https://github.com/Mjcanson"}>https://github.com/Mjcanson</a></p>

                </div>
            </div>
           </div>
        );
    }
}

export default MichaelPage