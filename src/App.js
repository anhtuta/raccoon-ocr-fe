import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import routes from './routes';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/App.scss';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <Menu />
          <div className="app-content">{this.showContentMenus(routes)}</div>
          <ToastContainer />
        </div>
      </HashRouter>
    );
  }

  showContentMenus = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

export default App;
