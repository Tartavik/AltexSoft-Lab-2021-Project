import ActionButtons from "./ActionButtons/ActionButtons";

function Header(props) {

    return (
        <header>
            <a href='#/' className='logo'>LOGO</a>
            <ActionButtons clickButton={props.clickButton}/>
        </header>
    );
}

export default Header;