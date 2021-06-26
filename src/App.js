import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './component/global/Footer/Footer';
import Header from './component/global/Header/Header';
import Contact from './pages/Contact/Contact';
import Cours from './pages/Cours/Cours';
import DynamicPage from './pages/DynamicPage/DynamicPage';
import Faq from './pages/Faq/Faq';
import Gallery from './pages/Gallery/Gallery';
import Home from './pages/Home/Home';
import SectionPage from './pages/SectionPage/SectionPage';
import TeamMembar from './pages/TeamMembar/TeamMembar';
import Videos from './pages/Videos/Videos';

class App extends React.Component
{  
  render(){
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route path="/photo-gallery" exect component={Gallery} />
            <Route path="/video-gallery" exect component={Videos} />
            <Route path="/faq" exect component={Faq} />
            <Route path="/team" exect component={TeamMembar} />
            <Route path="/contact" exect component={Contact} />
            <Route path="/page/:pageName" exact component={DynamicPage} />
            <Route path="/section/:name" component={SectionPage} />
            <Route path="/cours/:name" component={Cours} />
            <Route path="/" exect component={Home} />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;