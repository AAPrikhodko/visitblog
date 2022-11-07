import {useQuery} from "react-query";
import {PostDataService} from "../api/apiPostClient";
import {QueryKeys} from "../services/constants";

export const useGetPosts = () => {
    const {isLoading: isLoadingPosts, data:posts} = useQuery(
        QueryKeys.GetPosts,
        () => PostDataService.getList(),
        {
            select: ({data}) => data.data

        }
    )

    return {isLoadingPosts, posts}
}
