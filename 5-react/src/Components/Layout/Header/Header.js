import ActionButtons from "../../ActionButtons/ActionButtons";
import header from "./Header.module.css";
import { useState, useEffect } from 'react';

const Header = (props) => {
    return (
        <header className={header.header}>
            <a href='#/' className='logo'>LOGO</a>
            <ActionButtons />
        </header>
    );
}

export default Header;