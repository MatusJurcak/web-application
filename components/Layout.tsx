import styles from '../styles/Home.module.css'
import AppBar from './AppBar'
import * as React from 'react'


const Layout = ({ children } : { children : any }) => {

    return (
        <div>
            <AppBar />
            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout

