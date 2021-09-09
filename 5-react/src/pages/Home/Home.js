import SideBar from '../../Components/SideBar/SideBar';
import { UseHome } from '../../pages/Home/hooks/UseHome';
import Post from '../../Components/Post/Post';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useState, useEffect } from 'react';
import { useTag } from './hooks/useTag';
import ReactPaginate from "react-paginate";
import home from './home.module.css';
import green from '../../images/green2.jpg';
import BeatLoader from "react-spinners/BeatLoader";

const Home = (props) => {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [arrArticles, setArrArticles] = useState([]);
    const { articles, showSpiner } = UseHome();
    const { dataTegs, fetchTags} = useTag();
    const axios = require('axios');

    useEffect(() => {
        setArrArticles(articles)
    }, [articles])
    
    const onChangeTabs = (e) => {
        setCurrentIndex(e);
    }

    const changePage = ({ selected }) => {
        axios.get(`https://conduit.productionready.io/api/articles?offset=${selected * 10}&limit=20`).then((res)=>{
            setArrArticles(res.data.articles)
            })
      };

    return (
        <div>
            <img src={ green } alt="mainImage" className={home.mainImage}></img>
            <div className={home.wrapper}>           
                <Tabs onSelect={onChangeTabs} selectedIndex={currentIndex} className={home.wrapperArticle}>
                    <TabList className={home.nav}>
                        <Tab className={currentIndex === 0 ?`${home.active} ${home.tab}`:home.tab}>My Feeds</Tab>
                        <Tab className={currentIndex === 1 ?`${home.active} ${home.tab}`:home.tab}>Global Feeds</Tab>
                    </TabList>
                    <TabPanel>
                        2
                    </TabPanel>
                    <TabPanel>
                        {arrArticles.map((elem,index) => {
                            return <Post key={index} info={elem} isShow={true} showBodyorDescrip={true} />
                        })}
                    </TabPanel>
                </Tabs>
                {
                    dataTegs.data.tags !== undefined?
                    <SideBar tags={dataTegs.data.tags} className={home.sidebar}/>
                    :
                    <div className={home.sidebar}>
                        <BeatLoader color={'#36d7b7'} loading={true} size={8} />
                    </div>
                }
                
            </div>
            <ReactPaginate
                initialPage={0}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={50}
                onPageChange={changePage}
                containerClassName={home.paginationBttns}
                previousLinkClassName={home.previousBttn}
                nextLinkClassName={home.nextBttn}
                disabledClassName={home.paginationDisabled}
                activeClassName={home.paginationActive}
            />
        </div>
    );
}

export default Home;