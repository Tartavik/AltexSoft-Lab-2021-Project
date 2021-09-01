import SideBar from '../../Components/SideBar/SideBar';
import MyFeeds from '../../Components/MyFeeds/MyFeeds';
import GlobalFeeds from '../../Components/GlobalFeeds/GlobalFeeds';
import { NavLink, Route } from "react-router-dom";
import { UseHome } from '../../pages/Home/hooks/UseHome';
import { useRegUser } from './hooks/useRegUser';

const Home = (props) => {

    const { articles, showSpiner } = UseHome();

    const {checkUserReg, isLoad} = useRegUser();


    return (
        <div>
            <div>
                <ul>
                    <li>
                        <NavLink to="myFeeds">My Feeds</NavLink>
                    </li>
                    <li>
                        <NavLink to="GlobalFeeds">Global Feeds</NavLink>
                    </li>
                </ul>
                <Route path='/myFeeds' component={() => <MyFeeds  articles={[]}/>}/>
                <Route path='/globalFeeds' component={() => <GlobalFeeds articles={articles}/>}/>
            </div>
            <SideBar />
        </div>
    );
}

export default Home;