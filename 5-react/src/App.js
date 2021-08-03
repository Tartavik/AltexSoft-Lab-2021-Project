import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'; 
import MyFeeds from './Components/MyFeeds/MyFeeds';
import GlobalFeeds from './Components/GlobalFeeds/GlobalFeeds';
import SingUp from './Components/SingUp/SingUp';
import LogIn from './Components/LogIn/LogIn';
import { useState } from 'react';

function App(props) {
  
  let [form, setForm] = useState('Home')

  let clickButton = (value) => {
    setForm(form = value)
  }

  return (
    <div className="App">
      <Header clickButton={clickButton}/>
      {form === 'LogIn'?<LogIn />:''}
      {form === 'SingUp'?<SingUp />:''}
      {form === 'Home'? 
        <div>
          <p>Home</p>
          <MyFeeds />
          <GlobalFeeds />
        </div>: ''}
      <Footer />
    </div>
  );
}

export default App;
