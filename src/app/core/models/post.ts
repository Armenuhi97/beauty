export interface Post {
    comment_count: number
    created_at: string
    files: Array<{
        file_url: string
        is_main: boolean,
        file_type:string
    }>
    id: number
    like_count: number
    liked_by_me: false
    seen_count: number
    status: string
    text: string
    user: number
}