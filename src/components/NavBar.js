import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

import { VscMenu, VscClose } from "react-icons/vsc";
import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../context/AuthContex'
import { useState } from 'react';

const NavBar = () => {

    const { user } = useAuthValue()
    const { logout } = useAuthentication()

    const [closeListArea, setCloseListArea] = useState(false)

    return (
        <nav className={styles.navBar}>
            <NavLink to='/' className={styles.brand}>
                Mini<span>Blog</span>
            </NavLink>

            <span className={styles.menuBtn} onClick={()=>setCloseListArea(false)}><VscMenu/></span>

            <div style={closeListArea ? { right: "-190px" } : { right: "0" }} className={styles.listArea}>
                <span onClick={() => setCloseListArea(true)} className={styles.closeBtn}><VscClose /></span>
                <ul className={styles.links_list}>
                    <li>
                        <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : '')}>
                            Home
                        </NavLink>
                    </li>
                    {!user &&
                        <>
                            <li>
                                <NavLink to='/register' className={({ isActive }) => (isActive ? styles.active : '')}>
                                    Cadastrar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/login' className={({ isActive }) => (isActive ? styles.active : '')}>
                                    Entrar
                                </NavLink>
                            </li>
                        </>
                    }
                    {user &&
                        <>
                            <li>
                                <NavLink to='/posts/create' className={({ isActive }) => (isActive ? styles.active : '')}>
                                    Novo post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard' className={({ isActive }) => (isActive ? styles.active : '')}>
                                    Dashboard
                                </NavLink>
                            </li>
                        </>
                    }
                    <li>
                        <NavLink to='/about' className={({ isActive }) => (isActive ? styles.active : '')}>
                            About
                        </NavLink>
                    </li>
                    {user &&
                        <li>
                            <button onClick={logout}>Sair</button>
                        </li>
                    }
                </ul>
            </div>

        </nav>
    )
}

export default NavBar