import Tag from "../Tag/Tag";
import { useState } from "react";
import sideBar from "./sideBar.module.css"

const SideBar = (props) => {
    const [flag, setFlag ] = useState(5);
    const [isShow, setIsShow] = useState(true);
    const handlerChange = (e) => {
        setFlag(e.currentTarget.value);
        setIsShow(!isShow)
    }

    return (
    <aside>
        <ul className={sideBar.wrapperTag}>
            {
                props.tags.map((tag, index) => {
                    if(index < flag){
                        return <Tag key={index} tag={tag} className={`${index % 2 === 0 ? "Odd" : "Even"}`}/>
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