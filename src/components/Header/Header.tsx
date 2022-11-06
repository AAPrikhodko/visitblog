import React from "react";
import { Button, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import logo from '../../img/logo.png'
import styles from './Header.module.scss'
import {buttonCaption, constants, user} from "../../services/constants";

const Header = () => {

    const navigate = useNavigate()

    const postCreateClickHandler = () => navigate('/create')

    return (
      <div className={styles.header_wrapper}>
          <a className={styles.header_logo} href="/">
              <img src={logo} width="80" height="70" alt=""/>
          </a>
          <div className={styles.header_text_group}>
              <div className={styles.header_text_group_title}>
                  {constants.visitBlog}
              </div>
          </div>
          <div className={styles.header_button_group}>
              <Button className={styles.button_create} type="ghost" onClick={postCreateClickHandler}>
                  {buttonCaption.create}
              </Button>
              <Avatar size={42} className={styles.avatar}>{user.firstName[0]}{user.lastName[0]}</Avatar>
          </div>
      </div>
    )
}

export default Header