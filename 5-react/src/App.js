import Header from './Components/Layout/Header/Header';
import { ProviderAuth } from './context/AuthContext';
import Footer from './Components/Layout/Footer/Footer'; 
import SingupForm from './Components/Forms/SingupForm/SingupForm';
import NewArticle from './Components/NewArticle/NewArticle'
import Home from './pages/Home/Home';
import LoginForm from './Components/Forms/LoginForm/LoginForm';
import {Route, Switch} from 'react-router-dom';
import UserProfile from './pages/UserProfile/UserProfile';


const App = (props) => { 

  return (
    <div>
      <ProviderAuth>
        <Header />
        <Switch>
          <Route path='/logIn' component={() => <LoginForm />}/>
          <Route path='/singUp' component={() => <SingupForm />}/> 
          <Route path='/newArticle' component={() => <NewArticle />} />
          <Route path='/userProfile' component={() => <UserProfile />} />
          <Route path='/' component={() => <Home />} />
        </Switch>
        <Footer />
      </ProviderAuth>
    </div>
  );
}

export default App;
