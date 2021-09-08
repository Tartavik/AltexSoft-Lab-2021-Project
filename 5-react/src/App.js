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
import { useState, useEffect } from 'react';
import UserUpdateForm from './Components/Forms/UserUpdateForm/UserUpdateForm';
import { useForm } from './context/useAuth';
const App = () => { 
  const [modalState, setModalState] = useState(false);
  const [bodyArticalUpdate, setBodyArticalUpdate] = useState(false)
  const [typeModalWindow, setTypeModalWindow] = useState('');
  const [articleSlug, setArticleSlug] = useState();

  const { valueFormUpdateArticle } = useForm();
  const [flag, setFlag] = useState('')
  
  const body = {
    title: flag.title,
    description: flag.description,
    body: flag.body,
    tagList: flag.tagList,
}

  return (
    <div>
      <ProviderAuth>
        <ProviderForm>
            <Header />
            <NewArticle initialValues={body} />
            <UserUpdateForm />
            <Switch>
              <Route path='/logIn' component={() => <LoginForm />}/>
              <Route path='/singUp' component={() => <SingupForm />}/> 
              <Route path='/userProfile/:username' component={() => <UserProfile />} />
              <Route path='/article/:slug' component={() => <Articles flag={setFlag} slug={articleSlug} setTypeModalWindow={setTypeModalWindow} setBodyArticalUpdate={setBodyArticalUpdate} setStateModal={setModalState}/>} />
              <Route path='/' component={() => <Home />} />
            </Switch>
            <Footer />
        </ProviderForm>
      </ProviderAuth>
    </div>
  );
}

export default App;
