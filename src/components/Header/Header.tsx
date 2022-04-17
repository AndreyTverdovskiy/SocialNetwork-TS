import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    login: string
    isAuth: boolean
    logoutTC: () => void
}

function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <img src="https://cdn.dribbble.com/users/10882/screenshots/2859860/foxy.png?compress=1&resize=800x600"/>

            <div className={s.loginBlock}>

                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logoutTC}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;