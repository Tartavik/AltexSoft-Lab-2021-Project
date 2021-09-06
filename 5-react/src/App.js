import Header from './Components/Layout/Header/Header';
import { ProviderAuth } from './context/AuthContext';
import { ProviderForm } from './context/FormContext';
import Footer from './Components/Layout/Footer/Footer'; 
import SingupForm from './Components/Forms/SingupForm/SingupForm';
import NewArticle from './pages/NewArticle/NewArticle'
import Home from './pages/Home/Home';
import LoginForm from './Components/Forms/LoginForm/LoginForm';
import {Route, Switch} from 'react-router-dom';
import UserProfile from './pages/UserProfile/UserProfile';
import Articles from './pages/Articles/Articles';
import { useState } from 'react';
import UserUpdateForm from './Components/Forms/UserUpdateForm/UserUpdateForm';

const App = () => { 
  const [modalState, setModalState] = useState(false);

  const [bodyArticalUpdate, setBodyArticalUpdate] = useState(false)
  const [typeModalWindow, setTypeModalWindow] = useState('');
  const [articleSlug, setArticleSlug] = useState();

  
  // const getArticleSlug = (slug) => {
  //   setArticleSlug(slug)
  // }

  return (
    <div>
      <ProviderAuth>
        <ProviderForm>
          <Header setStateModal={setModalState} setTypeModalWindow={setTypeModalWindow}/>
          <NewArticle state={modalState} setState={setModalState} typeModal={typeModalWindow} bodyArticalUpdate={bodyArticalUpdate}/>
          <UserUpdateForm />
          <Switch>
            <Route path='/logIn' component={() => <LoginForm />}/>
            <Route path='/singUp' component={() => <SingupForm />}/> 
            <Route path='/userProfile/:username' component={() => <UserProfile  />} />
            <Route path='/article' component={() => <Articles slug={articleSlug} setTypeModalWindow={setTypeModalWindow} setBodyArticalUpdate={setBodyArticalUpdate} setStateModal={setModalState}/>} />
            <Route path='/' component={() => <Home  />} />
          </Switch>
          <Footer />
        </ProviderForm>
      </ProviderAuth>
    </div>
  );
}

export default App;
