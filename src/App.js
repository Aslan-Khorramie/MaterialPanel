import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Import Style
import "./App.scss";

// Import Components
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard";
import Members from "./pages/members/index";
import { getToken } from "./helpers/getToken";

function App() {
  const auth = useSelector((state) => state.auth);
  const isUserLoggedIn = getToken(auth);

  return (
    <Router>
      <Switch>
        {isUserLoggedIn ? (
          <>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/members/list" component={Members} />
          </>
        ) : (
          <>
            <Route exact path="/" component={Login} />
            <Route exact path="*">
              <Redirect to="/" />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
