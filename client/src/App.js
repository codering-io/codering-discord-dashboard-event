import React from 'react';
import { NavLink as Link, Switch, Route } from 'react-router-dom';
import { Button } from '@chakra-ui/core';
import SampleDashboard from './pages/dashboard/index';
import SamplePage from './pages/sample/index';

function App() {
  return (
    <div >
      <Switch>
        {/* Simple routing, if the current route is /,
       render the button to go to the dashboard. */}
        <Route exact path='/'>
          <Link to='/dashboard'>
            <Button variantColor="red">
          Dashboard
            </Button>
          </Link>
        </Route>
        {/* if the current route is /dashboard,
        render the dashboard component */}
        <Route exact path='/dashboard' component={SampleDashboard}></Route>
        {/* Again, but with the SamplePage Component. Route paths support
        request parameters, so we're using :id for dynamic routes. The id
        supplied in the path will be reflected in the a prop passed to the
        component known as match. More on this in ./pages/sample/index.jsx */}
        <Route exact path='/dashboard/:id' component={SamplePage}></Route>
      </Switch>
    </div>
  );
}

export default App;
