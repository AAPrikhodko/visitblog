import React from "react";
import styles from './/PostCard.module.scss'
import { EditOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons';
import { Avatar, Card, Statistic, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { covertDateFromISO } from "../../utils/utils";
import { Post } from "../../services/types";
import { constants, user } from "../../services/constants";


interface IPostCardProps {
    post?: Post
}

const { Meta } = Card

const PostCard: React.FC<IPostCardProps> = (props ) => {
    const {post} = props

    const navigate = useNavigate()
    const onEditPost = (id?: string) => id && navigate(`/${id}/edit`)
    const onShowPost = (id?: string) => id && navigate(`/${id}`)

    const prepareActions = (postId?: string) => {
        let actions = [
            <Statistic
                className={styles.statistic}
                value={post?.likes}
                prefix={<LikeOutlined />}
                key="statistic"
            />,
            <EyeOutlined
                onClick={() => onShowPost(post?.id)}
                key="eye"
            />
        ];
        (postId === user.id) &&
            actions.splice(
                1,
                0,
                <EditOutlined
                    onClick={() => onEditPost(post?.id)}
                    key="edit"
                />
            )
        return actions
    }
    return (
        <div className={styles.post_wrapper}>
            <Card
                className={styles.postcard}
                title={post?.text}
                cover={<img className={styles.post_wrapper_img} alt="no img" src={post?.image} />}
                actions={prepareActions(post?.owner.id)}
            >
                <Meta
                    avatar = {<Avatar src={post?.owner.picture} />}
                    title = {`${post?.owner.firstName} ${post?.owner.lastName}`}
                    description = {`${constants.Published} ${post && covertDateFromISO(post.publishDate)}`}

                />
                <div className={styles.tags_wrapper}>
                    {
                        post?.tags.map((tag:string) =>
                            <Tag className={styles.tag} color={"magenta"}> {tag}</Tag>)
                    }
                </div>
            </Card>
        </div>
    )
}

export default PostCard