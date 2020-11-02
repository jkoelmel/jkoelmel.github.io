import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Landing from './Pages/LandingPage/index'
import BrookePage from './Pages/BrookePage/brooke.page'
import MichaelPage from "./Pages/MichaelsPage/michael"
import ChiuPage from "./Pages/ChiuPage/chiupage"
import JarettPage from "./Pages/JarettPage/JarettPage"
import PaulPage from "./Pages/PaulPage/PaulPage"
import EricPage from "./Pages/EricPage/EricPage"
import PeterPage from "./Pages/PeterPage/PeterPage"
//Will handle all page routing
//TODO ask if we still need to keep about me pages
export const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact={true} path='/'>
                <Landing/>
            </Route>
            <Route exact path={'/brooke'} component={BrookePage} title={'Brooke Porter'}/>
            <Route exact path={'/michael'} component={MichaelPage} title={'Michael Canson'}/>
            <Route exact path={'/chiu'} component={ChiuPage} title={'Chiu Wong'}/>
            <Route exact path={'/jarett'} component={JarettPage} title={'Jarett Koelmel'}/>
            <Route exact path={'/paul'} component={PaulPage} title={'Paul Borst'}/>
            <Route exact path={'/eric'} component={EricPage} title={'Eric Chen'}/>
            <Route exact path={'/peter'} component={PeterPage} title={'Peter Hu'}/>
        </Switch>

    </BrowserRouter>
);
   

