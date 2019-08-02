import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/not-found/not-found.component';
import NavComponent from './components/app-nav/app-nav.component';
import Clicker from './components/clicker/clicker.component';
import Pokemon from './components/pokemon/pokemon.component';
import SignIn from './components/sign-in/sign-in.component';
import Cards from './components/cards/cards.component';
import { Provider } from 'react-redux';
import { store } from './store';
import Reims from './components/reims/reims.component';

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
            <Route path="/cards" component={Cards} />
            <Route path="/clicker" component={Clicker} />

 
            <Route path="/pokemon" component={Pokemon} />
            <Route path="/sign-in" component={SignIn} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
