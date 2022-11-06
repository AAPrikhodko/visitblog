import React, {useCallback, useEffect, useState} from "react";
import { PostDataService } from "../../api/apiPostClient";
import { CommentDataService } from "../../api/apiCommentClient"
import { Image, Card, Tag, Statistic, Avatar, Button, Comment, Form, Input, List, notification} from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { LikeOutlined } from "@ant-design/icons";
import { convertComments, covertDateFromISO } from "../../utils/utils";
import {CommentItem, EditorProps, Post} from "../../services/types";
import {buttonCaption, constants, user} from "../../services/constants";
import moment from 'moment';
import styles from './DetailedPost.module.scss'

const { TextArea } = Input;

const CommentList = ({ comments }: { comments: CommentItem[] }) => {
    return <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
}

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} style={{borderRadius: "10px"}}/>
        </Form.Item>
        <Form.Item className={styles.comment_btn_form}>
            <Button htmlType="submit" className={styles.comment_button} loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const DetailedPost = () => {

    const [comments, setComments] = useState<CommentItem[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [post, setPost] = useState<Post | undefined>(undefined)

    const params = useParams()
    const navigate = useNavigate()
    const {id, action} = params

    useEffect(() => {
      if (id) {
          Promise.all([PostDataService.getPostById(id), CommentDataService.getCommentsByPost(id)])
              .then((response) => {
               setPost(response[0].data);
               setComments(convertComments(response[1].data.data))
              })
      }
    },[])


    const handleCommentSubmit = () => {
        if (!value) return;

        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            setComments([
                ...comments,
                {
                    author: `${user.firstName} ${user.lastName}`,
                    avatar: user.picture,
                    content: <p>{value}</p>,
                    datetime: moment().fromNow(),
                },
            ]);
        }, 1000);
        post && CommentDataService.createComment(value, post.id)
    };

    const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    },[])

    const updatePostData = (key: any, value: any) => {
        let changedPost: any = JSON.parse(JSON.stringify((post)))
        changedPost[key] = value
        return setPost(changedPost)
    }

    const saveBtnClickHandler = () => {
        post && PostDataService.updatePost(post.id, post.text).then(() => {
            navigate('/')
            notification.success({
                message: constants.notificationSave
            })
        })
    }

    const backBtnClickHandler = () => navigate(-1)

    const deleteBtnClickHandler = () => {
        post && PostDataService.deletePost(post.id).then(() => {
            navigate('/')
            notification.success({
                message: constants.notificationDelete
            })
        })
    }

  return (
      <>
      { post && <div className={styles.detailed_post_wrapper}>
          <div className={styles.buttons_wrapper}>
              <Button type="ghost" className={styles.action_button} onClick={backBtnClickHandler}>
                  {buttonCaption.back}
              </Button>
              {
                  (post.owner.id === user.id && action) &&
                    <>
                      <Button type="ghost" className={styles.action_button} onClick={saveBtnClickHandler}>
                          {buttonCaption.save}
                      </Button>
                      <Button type="ghost" className={styles.action_button} onClick={deleteBtnClickHandler}>
                          {buttonCaption.delete}
                      </Button>
                    </>
              }
          </div>
          <div className={styles.content_wrapper}>
              <Image
                  className={styles.image}
                  src={post.image}
              />
              <Card className={styles.card_description} title="Description">
                  {action
                      ? <TextArea
                          className={styles.text_area}
                          autoFocus={!!action}
                          bordered={!!action}
                          value={post.text}
                          onChange={(e) => updatePostData('text', e.target.value)}
                        />
                      : <p className={styles.input} >{post.text}</p>
                  }
                  <p className={styles.published}>{constants.Published} {covertDateFromISO(post.publishDate)}</p>
                  <Statistic value={post.likes} prefix={<LikeOutlined />} valueStyle={{fontSize: 14}}/>
                  <div className={styles.tags_wrapper}>
                      {post.tags.map((tag:string) => <Tag color={"magenta"}> {tag}</Tag>)}
                  </div>
              </Card>
              <Card className={styles.card_author} title="Author">
                  <img className={styles.image_avatar} alt="no img" src={post.owner.picture}/>
                  <div className={styles.author_text_info}>
                      <p className={styles.title}>
                          {constants.title}
                          <b>{post.owner.title ? post.owner.title : constants.noInformation}</b>
                      </p>
                      <p>
                          {constants.name}
                          <b>{post.owner.firstName}</b>
                      </p>
                      <p>
                          {constants.lastName}
                          <b>{post.owner.lastName}</b>
                      </p>
                  </div>
              </Card>
          </div>
          <div className={styles.comments_wrapper}>
              {comments.length > 0 &&
                  <CommentList comments={comments} />
              }
              {!action &&
                  <Comment
                      className={styles.comment}
                      avatar={<Avatar className={styles.author_avatar} src={user.picture} />}
                      content={
                          <Editor
                              onChange={handleCommentChange}
                              onSubmit={handleCommentSubmit}
                              submitting={submitting}
                              value={value}
                          />
                      }
                  />}
          </div>
      </div> }
      </>
  )
}

export default DetailedPost