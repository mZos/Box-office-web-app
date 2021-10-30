/* eslint-disable react/react-in-jsx-scope */
import { Switch, Route } from 'react-router-dom';
import Show from './pages/Show';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/starred">
        <Starred />
      </Route>

      <Route exact path="/show/:id">
        <Show />
      </Route>

      <Route>
        <div>Error! 404 This page not found</div>
      </Route>
    </Switch>
  );
}

export default App;
