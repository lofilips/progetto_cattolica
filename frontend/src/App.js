import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import Layout from './components/Layout'
import NavigationBar from './components/NavigationBar'
import ListaDocenti from './components/ListaDocenti'
import Footer from './components/Footer'


class App extends Component {

  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/lista_docenti" component={ListaDocenti} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
        <Footer />
      </React.Fragment>
    )
  }

}



export default App;