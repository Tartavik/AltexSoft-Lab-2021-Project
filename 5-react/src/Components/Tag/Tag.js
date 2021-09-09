import tag from './tag.module.css';
const Tag = (props) => {
    return (
        <li className={props.id % 2 === 0? tag.Odd : tag.Even}>
            <button className={tag.btn}>{props.tag}</button>
        </li>
    )
}

export default Tag;