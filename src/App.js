import React from 'react';
import DefaultLayout from './layouts/DefaultLayout';
// import SideBar from './components/SideBar';
import * as Pages from './pages';
import { Route, BrowserRouter, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Switch>
          <Route exact path="/table2" component={Pages.Table1} />
          <Route exact path="/table" component={Pages.AlgoTable} />
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;
