const React = require('react');
const { render } = require('react-dom');

// router
const Route = require('react-router-dom').Route;
const BrowserRouter = require('react-router-dom').BrowserRouter;
const hashHistory = require('react-router-dom').hashHistory;

// redux
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const rootReducer = require('./rootReducer');

let store = createStore(rootReducer);

/* Import Components */
const Index = require('./components/Index');
const About = require('./components/About');

render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Index}/>
        <Route path="/about" component={About}/>
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('main'));