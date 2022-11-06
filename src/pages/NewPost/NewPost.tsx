import React, {useState} from "react";
import styles from './NewPost.module.scss'
import { Image, Button, Input, notification } from 'antd';
import { useNavigate } from "react-router-dom";
import { PostDataService } from "../../api/apiPostClient";
import { buttonCaption, constants } from "../../services/constants";

const { TextArea } = Input;

const NewPost = () => {

    const [text, setText] = useState('')
    const navigate = useNavigate()

    const createPostClickHandler = (text: string, image: string) => {
        PostDataService.createPost(text, image).then(() => {
            navigate('/')
            notification.success({
                message: constants.notificationCreate
            })
        })
    }

  return (
      <>
          <div className={styles.new_post_title}>Just tell about your story...</div>
          <div className={styles.new_post_content_wrapper}>
              <Image className={styles.image} src='https://picsum.photos/500/500'/>
              <TextArea
                  className={styles.text_area}
                  autoFocus={true}
                  onChange={(e) => {return setText(e.target.value)}}
                  placeholder={constants.newPostPlaceholder}
              />
          </div>
          <div className={styles.button_wrapper}>
              <Button type="primary" className={styles.button_save} onClick={() => createPostClickHandler(text, 'https://picsum.photos/500/500')}>
                  {buttonCaption.savePost}
              </Button>
          </div>
      </>
  )
}

export default NewPost