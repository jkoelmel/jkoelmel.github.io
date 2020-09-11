import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Landing from './Pages/LandingPage/index'
//Will handle all page routing
export const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact={true} path='/'>
                <Landing/>
            </Route>
        </Switch>

    </BrowserRouter>
);
   

