import React from 'react';
import { Router, Route} from 'react-router';
import { Provider } from 'react-redux';
import AppBar from './components/AppBar/AppBar';
import Person from './components/person/Person';
import { browserHistory } from 'react-router'; 
import store, { history } from "./store";
import ReactDOM from "react-dom"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from './theme-default';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
	<MuiThemeProvider muiTheme={ThemeDefault}>
	  <Provider store={store}>
	          <Router history={history}>
	            <Route path="/" component={AppBar} >
	              <Route path="/person" component={Person} />
	            </Route>
	          </Router>
	      </Provider>
	</MuiThemeProvider>,
  document.getElementById("root")
)
