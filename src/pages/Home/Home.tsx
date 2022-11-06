import React, { useEffect, useState } from "react";
import style from './Home.module.scss'
import { PostDataService } from "../../api/apiPostClient";
import { List } from "antd";
import { Post } from "../../services/types";
import { AxiosResponse } from "axios";
import PostCard from "../../components/PostCard/PostCard";


const Home = () => {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        PostDataService.getList().then((posts: AxiosResponse) => setPosts(posts.data.data))
    },[])

    return (
        <List
            className={style.posts_wrapper}
            grid={{ gutter: 25, column: 1, md: 2, lg:3, xl: 4, xxl: 4}}
            dataSource={posts}
            renderItem={item => (
                <List.Item>
                    <PostCard post={item}/>
                </List.Item>
            )}
        />
    )
}

export default Home