export interface PostComment {
    comment: string
    created_at: string
    id: number
    post: number
    status: string
    user: number
    user_details: { image: string, id: number, first_name: string, last_name: string }

}