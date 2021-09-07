import SideBar from '../../Components/SideBar/SideBar';
import { UseHome } from '../../pages/Home/hooks/UseHome';
import Post from '../../Components/Post/Post';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useState } from 'react';
import { useTag } from './hooks/useTag';

const Home = (props) => {

    const [currentIndex, setCurrentIndex] = useState(1);
    const { articles, showSpiner } = UseHome();
    const { dataTegs, fetchTags} = useTag();

    const onChangeTabs = (e) => {
        setCurrentIndex(e)
    }

    return (
        <div>
            <Tabs onSelect={onChangeTabs} selectedIndex={currentIndex}>
                <TabList>
                    <Tab>My Feeds</Tab>
                    <Tab>Global Feeds</Tab>
                </TabList>
                <TabPanel>
                    2
                </TabPanel>
                <TabPanel>
                    {articles.map((elem,index) => {
                        return <Post key={index} info={elem} isShow={true} showBodyorDescrip={true}/>
                    })}
                </TabPanel>
            </Tabs>  
            {
                dataTegs.data.tags !== undefined?
                <SideBar tags={dataTegs.data.tags}/>
                :
                <div></div>
            }
            
        </div>
    );
}

export default Home;