import React  from "react";
import styles from './NotFoundPage.module.scss'
import { constants } from "../../services/constants";

const NotFoundPage = () => {
  return (
      <>
        <div className={styles.not_found_title}>{constants.PageNotFound}</div>
        <div className={styles.not_found_text}>{constants.PageNotFoundText}</div>
      </>
  )
}

export default NotFoundPage