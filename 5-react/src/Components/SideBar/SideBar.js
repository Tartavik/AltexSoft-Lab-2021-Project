import Tag from "../Tag/Tag";
import { useState } from "react";

const SideBar = (props) => {
    const [flag, setFlag ] = useState(5);
    const [isShow, setIsShow] = useState(true);
    const handlerChange = (e) => {
        setFlag(e.currentTarget.value);
        setIsShow(!isShow)
    }

    return (
    <aside>
        <ul>
            {
                props.tags.map((tag, index) => {
                    console.log('index', index, flag);
                    if(index < flag){
                        console.log('1');
                        return <Tag key={index} tag={tag}/>
                    }
                    return null;
                })
            }         
        </ul>
        {
            isShow?
            <button value='20' onClick={handlerChange}>Show more</button>
            :
            <button value='5' onClick={handlerChange}>Show less</button>
        }
        
    </aside>
    )
}

export default SideBar;