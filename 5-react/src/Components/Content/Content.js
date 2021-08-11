import SideBar from '../SideBar/SideBar';
import MyFeeds from '../MyFeeds/MyFeeds';
import GlobalFeeds from '../GlobalFeeds/GlobalFeeds';
import {baseUrl} from '../API/API';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Content = (props) => {
    const [showMyFeeds,setShowMyFeeds] = useState(false);
    const [showGlobalFeeds,setShowGlobalFeeds] = useState(true);
    const [content,setContent] = useState([]);

    const myFeeds = (e) => {
        e.preventDefault();
        // axios.get('https://conduit.productionready.io/api/articles?activeTab=0&author=Tartavik').then(res => {
        // console.log(res.data);
        // })
        // setShowMyFeeds(!showMyFeeds);
        // setShowGlobalFeeds(!showGlobalFeeds);
        console.log(content);
    }

    const globalFeeds = (e) => {
        setShowGlobalFeeds(true);
        e.preventDefault();
        axios.get(`${baseUrl}articles?activeTab=1`).then(res => {
            console.log(res.data);
            setContent(res.data.articles)
        })
        // setShowMyFeeds(!showMyFeeds);
        // setShowGlobalFeeds(!showGlobalFeeds);
    }

    return (
        <div>
            <div>
                <ul>
                    <li>
                        <a href="/#" onClick={myFeeds}>My Feeds</a>
                    </li>
                    <li>
                        <a href="/#" onClick={globalFeeds}>Global Feeds</a>
                    </li>
                </ul>
                {showMyFeeds&&<MyFeeds />}
                {showGlobalFeeds&&<GlobalFeeds articles={content}/>}
            </div>
            <SideBar />
        </div>
    );
}

export default Content;