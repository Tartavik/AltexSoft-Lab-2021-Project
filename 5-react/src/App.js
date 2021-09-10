import Header from './Components/Layout/Header/Header';
import { ProviderAuth } from './context/AuthContext';
import { ProviderModals } from './context/ModalsContext';
import Footer from './Components/Layout/Footer/Footer'; 
import SingupForm from './Components/Forms/SingupForm/SingupForm';
import NewArticle from './pages/NewArticle/NewArticle'
import Home from './pages/Home/Home';
import LoginForm from './Components/Forms/LoginForm/LoginForm';
import {Redirect, Route, Switch} from 'react-router-dom';
import UserProfile from './pages/UserProfile/UserProfile';
import Articles from './pages/Articles/Articles';
import UserUpdateForm from './Components/Forms/UserUpdateForm/UserUpdateForm';
import { useAuth, useForm } from './context/useAuth';


const App = () => { 

  const { valueFormUpdateArticle, formUpdate } = useForm();
  const { isSignedIn } = useAuth();
  console.log(formUpdate);
  return (
    <div>
      <ProviderAuth>
          <ProviderModals>
            <Header />
            <NewArticle initialValues={valueFormUpdateArticle} />
            <UserUpdateForm initialValues={formUpdate} />
            <Switch>
              <Route path='/logIn' component={() => <LoginForm />}/>
              <Route path='/singUp' component={() => <SingupForm />}/> 
              <Route path='/userProfile/:username' component={() => <UserProfile />} />
              <Route path='/article/:slug' component={() => <Articles />} />
              <Route path='/' component={() => <Home />} />
            </Switch>
            <Footer />
          </ProviderModals>
      </ProviderAuth>
    </div>
  );
}

export default App;
