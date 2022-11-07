export const user = {
    id: "6366bb0b25af27c17f950ee1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@mailinator.com",
    picture: "https://randomuser.me/api/portraits/men/9.jpg"
}

export const tags = ["animal", "dog", "nature"]

export const buttonCaption = {
    back: "back",
    save: "save",
    delete: "delete",
    create: "Create Post",
    savePost: "Save Post"
}

export const constants = {
    visitBlog: "Visit blog",
    Published: "Published:",
    notificationSave: "Changes were saved successfully",
    notificationDelete: 'Post deleted',
    notificationCreate: "Post created",
    title: "Title: ",
    name: "Name: ",
    lastName: "Last Name: ",
    noInformation: "No Information",
    PageNotFound: "Page not found",
    PageNotFoundText: "The page you requested could not be found",
    newPostPlaceholder: "Type you story here"
}

export enum QueryKeys {
    GetPosts = "get_posts",
    GetPostById = "get_post_by_id",
    GetCommentsByPost = "get_comments_by_post",
    AddComment = "add_comment",
    UpdatePost = "update_post",
    DeletePost = "delete_post",
    CreatePost = "create_post"
}