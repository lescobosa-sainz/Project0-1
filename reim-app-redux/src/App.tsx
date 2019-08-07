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
import ReimsByAuthor from './components/reims/reims-by-author.component';
import { Home } from './components/home/home.component';
import UsersByRole from './components/users/users-by-role.component';
import ReimsByType from './components/reims/reims-by-type.component';
import ReimsByCurent from './components/reims/reims.curent.component';
import { Users } from './components/users/users.component';
import  EditUser  from './components/users/edit.user.component';
import  SubmitReimDoctor  from './components/reims/submit.reim.doctor.component';
import  SubmitReimUser  from './components/reims/submit.reim.curent.component copy';
import { SubmitReimDoctor3 } from './components/reims/reims-by-author.component copy';
import  ReimsByAuthor4  from './components/users/reims-by-author.component';
import  ReimsByType2  from './components/users/reims-by-type.component';
import reimsByStatusComponentCopy from './components/reims/reims-by-status.component copy';




const App: React.FC = () => {
  return (
    // the redux store needs to wrap all of the rest of our components
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavComponent />
          {/* The switch will only render the first route to match */}
          <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/home" component={Home} />
            <Route path="/user" component={Users} />
            <Route path="/user-role" component={UsersByRole} />
            <Route path="/edit-user" component={ReimsByType2} />
            <Route path="/reims" component={Reims} />
            <Route path="/reims-author" component={ReimsByAuthor} />
            <Route path="/reims-status" component={ReimsByStatus} />
            <Route path="/reims-type" component={ReimsByType} />
            <Route path="/reims-curent-user" component={ReimsByCurent} />
            <Route path="/submit-reim-doctor" component={SubmitReimDoctor3} />
            <Route path="/submit-reim-user" component={reimsByStatusComponentCopy} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
