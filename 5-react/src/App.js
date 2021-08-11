import Header from './Components/Layout/Header/Header';
import Footer from './Components/Layout/Footer/Footer'; 
import SingUp from './Components/SingUp/SingUp';
import Content from './Components/Content/Content';
import LogIn from './Components/LogIn/LogIn';
import {Route} from 'react-router-dom';
// import { useState } from 'react';

const App = (props) => {

  return (
    <div className="App">
      <Header />
      <Route path='/LogIn' component={LogIn} />
      <Route path='/SingUp' component={SingUp} />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
