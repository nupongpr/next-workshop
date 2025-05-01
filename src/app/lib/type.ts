export interface Post {
    id: number
    title: string
    content: string | null
    userId: number
    createdAt: Date
    updatedAt: Date
}

export interface User {
    id: number
    name: string
    email: string
    role: string | null
    createdAt: Date
    updatedAt: Date
}