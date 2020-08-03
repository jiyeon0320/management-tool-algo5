import React from 'react';
import DefaultLayout from './layouts/DefaultLayout';
// import SideBar from './components/SideBar';
import * as Pages from './pages';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <DefaultLayout>
                <Switch>
                    <Route exact path="/" component={Pages.AlgoTable} />
                    <Route exact path="/table" component={Pages.Table} />
                    <Route exact path="/table2" component={Pages.Table2} />
                    <Route exact path="/table3" component={Pages.Table3} />
                </Switch>
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
