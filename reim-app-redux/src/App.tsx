import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/not-found/not-found.component';
import NavComponent from './components/app-nav/app-nav.component';

import SignIn from './components/sign-in/sign-in.component';
import { Provider } from 'react-redux';
import { store } from './store';
import Reims from './components/reims/reims.component';
import ReimsByStatus from './components/reims/reims-by-status.component';
import  ReimsByAuthor  from './components/reims/reims-by-author.component';
import { Home } from './components/home/home.component';
import { UsersByRole } from './components/users/users-by-role.component';
import { ReimsByType } from './components/reims/reims-by-type.component';
import { ReimsByCurentUser } from './components/reims/reims..currentuser.component';
import { ReimsByCurent } from './components/reims/reims.curent.component';
import { ReimsByStatus2 } from './components/reims/reims-by-status2.component';
import { JustUser } from './components/just/just.component';

const App: React.FC = () => {
  return (
    // the redux store needs to wrap all of the rest of our components
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavComponent />
          {/* The switch will only render the first route to match */}
          <Switch>


          <Route path="/reims" component={Reims} />
          <Route path="/reims-status" component={ReimsByStatus2} />
          <Route path="/reims-author" component={ReimsByAuthor} />
          <Route path="/reims-type" component={ReimsByType} />
          <Route path="/reims-curent-user" component={ReimsByCurent} />
          <Route path="/home" component={JustUser} />
          <Route path="/user" component={UsersByRole} />

            <Route path="/sign-in" component={SignIn} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
