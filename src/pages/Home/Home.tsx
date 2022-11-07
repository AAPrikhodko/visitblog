import React from "react";
import style from './Home.module.scss'
import { List } from "antd";
import { Post } from "../../services/types";
import PostCard from "../../components/PostCard/PostCard";
import {useGetPosts} from "../../hooks/postHooks";


const Home = () => {

    const { isLoadingPosts, posts} = useGetPosts()

    return (
        isLoadingPosts
            ? <></>
            : <List
                className={style.posts_wrapper}
                grid={{ gutter: 25, column: 1, md: 2, lg:3, xl: 4, xxl: 4}}
                dataSource={posts}
                renderItem={(item: Post) => (
                    <List.Item>
                        <PostCard post={item}/>
                    </List.Item>
                )}
              />
    )
}

export default Home