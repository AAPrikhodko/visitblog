import React, {useCallback, useState} from "react";
import { PostDataService } from "../../api/apiPostClient";
import { CommentDataService } from "../../api/apiCommentClient"
import { Image, Card, Tag, Statistic, Avatar, Button, Comment, Form, Input, List, notification} from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { LikeOutlined } from "@ant-design/icons";
import { covertDateFromISO } from "../../utils/utils";
import {CommentItem, EditorProps, Post} from "../../services/types";
import {buttonCaption, constants, QueryKeys, user} from "../../services/constants";
import styles from './DetailedPost.module.scss'
import {useGetComments} from "../../hooks/commentHooks";
import {useMutation, useQuery} from "react-query";

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

    const [post, setPost] = useState<Post | undefined>(undefined)
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    const params = useParams()
    const navigate = useNavigate()
    const {id, action} = params

    const { isLoadingComments, comments, refetch: refetchComments } = useGetComments(id)

    const {isLoading: isLoadingPost} = useQuery(
        [QueryKeys.GetPostById],
        () => PostDataService.getPostById(id),
        {
            select: (result) => result ? result.data : undefined,
            onSuccess: (data) => setPost(data)
        }
    )

    const addCommentMutate = useMutation(
        () => CommentDataService.createComment(value, post?.id)
    )

    const updatePostMutate = useMutation(
        `${QueryKeys.UpdatePost}${post?.id}`,
        () => PostDataService.updatePost(post?.id, post?.text),
        {
            onSuccess: () => {
                navigate('/')
                notification.success({
                    message: constants.notificationSave
                })
            }
        }
    )

    const deletePostMutate = useMutation(
        `${QueryKeys.DeletePost}${post?.id}`,
        () => PostDataService.deletePost(post?.id),
        {
            onSuccess: () => {
                navigate('/')
                notification.success({
                    message: constants.notificationDelete
                })
            }
        }

    )

    const handleCommentSubmit = () => {
        if (!value) return;
        addCommentMutate.mutateAsync(comments).then(() => {
            refetchComments().then(() => setValue(''))
        })
    };

    const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    },[])

    const updatePostData = (key: any, value: any) => {
        let changedPost: any = JSON.parse(JSON.stringify((post)))
        changedPost[key] = value
        return setPost(changedPost)
    }

    const saveBtnClickHandler = () => updatePostMutate.mutate()
    const backBtnClickHandler = () => navigate(-1)
    const deleteBtnClickHandler = () => deletePostMutate.mutate()

  return (
      (!isLoadingComments && !isLoadingPost)
          ? <>
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
          : <></>
  )
}

export default DetailedPost