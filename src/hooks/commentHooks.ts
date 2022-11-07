import {useQuery} from "react-query";
import {CommentDataService} from "../api/apiCommentClient";
import {QueryKeys} from "../services/constants";
import {convertComments} from "../utils/utils";

export const useGetComments = (id?:string) => {
    const {isLoading: isLoadingComments, data:comments,refetch} = useQuery(
        QueryKeys.GetCommentsByPost,
        () => CommentDataService.getCommentsByPost(id),
        {
            select: (result) => {debugger; return result ? convertComments(result.data.data) : []}
        }
    )

    return {isLoadingComments, comments, refetch}
}