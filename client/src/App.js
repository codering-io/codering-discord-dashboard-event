import React from 'react';
import { NavLink as Link, Switch, Route } from 'react-router-dom';
import { Button } from '@chakra-ui/core';
import SampleDashboard from './pages/dashboard/index';
import SamplePage from './pages/sample/index';

function App() {
  return (
    <div >
      <Switch>
        <Route exact path='/'>
          <Link to='/dashboard'>
            <Button variantColor="red">
          Dashboard
            </Button>
          </Link>
        </Route>
        <Route exact path='/dashboard' component={SampleDashboard}></Route>
        <Route exact path='/dashboard/:id' component={SamplePage}></Route>
      </Switch>
    </div>
  );
}

export default App;
