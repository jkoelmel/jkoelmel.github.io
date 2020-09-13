import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Landing from './Pages/LandingPage/index'
import BrookePage from './Pages/BrookePage/brooke.page'
//Will handle all page routing
export const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact={true} path='/'>
                <Landing/>
            </Route>
            <Route exact path={'/brooke'} component={BrookePage} title={'Brooke Porter'}/>
        </Switch>

    </BrowserRouter>
);
   

