import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Landing from './Pages/LandingPage/index'
import BrookePage from './Pages/BrookePage/brooke.page'
import MichaelPage from "./Pages/MichaelsPage/michael"
import ChiuPage from "./Pages/ChiuPage/chiupage"
import JarettPage from "./Pages/JarettPage/JarettPage"
import PaulPage from "./Pages/PaulPage/PaulPage"
import EricPage from "./Pages/EricPage/EricPage"
import PeterPage from "./Pages/PeterPage/PeterPage"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Profile from "./Pages/PatientProfile/Profile";
import Exercise from "./Pages/ExerciseLibrary/Exercise";
//Will handle all page routing
//TODO ask if we still need to keep about me pages
export const Routes = () => (
        <Switch>
            <Route exact={true} path='/'>
                <Landing/>
            </Route>
            <Route exact={true} path='/dashboard'>
                <Dashboard/>
            </Route>
            <Route exact={true} path='/profile'>
                <Profile/>
            </Route>
            <Route exact={true} path='/library'>
                <Exercise/>
            </Route>
        </Switch>
);
   

