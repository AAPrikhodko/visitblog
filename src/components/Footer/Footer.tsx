import React from "react";
import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <div className={styles.footer_wrapper}>
            <hr />
            <div >
              &copy;{new Date().getFullYear()} All rights reserved
            </div>
        </div>
    )
}

export default Footer