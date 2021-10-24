import { Switch, Route } from 'react-router-dom';
import Nav from './component/Nav';
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

      <Route>
        <div>Error! 404 This page not found</div>
      </Route>
    </Switch>
  );
}

export default App;
