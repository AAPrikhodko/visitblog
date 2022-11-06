import React from "react";

export const convertComments = (commentsFromServer: any) => {
    return commentsFromServer.map((commentFromServer: any) => {
        return {
            author: `${commentFromServer.owner.firstName} ${commentFromServer.owner.lastName}`,
            avatar: commentFromServer.owner.picture,
            datetime: covertDateFromISO(commentFromServer.publishDate),
            content: <p>{commentFromServer.message}</p>
         }
    })
}

export const covertDateFromISO = (date: string) => {
    return new Date(date).toLocaleDateString("en-EN", { hour: "2-digit", minute: "2-digit" })
}