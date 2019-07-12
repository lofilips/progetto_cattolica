import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import Layout from './components/Layout'
import NavigationBar from './components/NavigationBar'
import ListaDocenti from './components/ListaDocenti'
import Footer from './components/Footer'
import ProfiloDocente from './components/ProfiloDocente'
import LoginAreaRiservata from './components/LoginAreaRiservata'
import AreaRiservata from './components/AreaRiservata'
import withAuth from './components/withAuth'

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/docenti" component = {Home} />
              <Route path="/docenti/lista_docenti" component = {ListaDocenti} />
              <Route path="/docenti/profilo_docente" component = {ProfiloDocente} />
              <Route path="/docenti/area_riservata" component = {withAuth(AreaRiservata)} />
              <Route path="/docenti/login_area_riservata" component = {LoginAreaRiservata} />
              <Route component = {NoMatch} />
            </Switch>
          </Router>
        </Layout>
        <Footer />
      </React.Fragment>
    )
  }

}

export default App;