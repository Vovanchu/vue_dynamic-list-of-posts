import { client } from '@/utils/http.js'

const getAllCommentsByPostId = async (postId: number) => {
  const response = await client.get(`/comments?postId=${postId}`)

  return response.data
}

const createComment = async (postId: number, name: string, email: string, body: string) => {
  const response = await client.post('/comments', { postId, name, email, body })

  return response
}

const deleteComment = async (id: number) => {
  const response = await client.delete(`/comments/${id}`)

  return response
}

const updateComment = async (id: number, usersId: number, title: string, body: string) => {
  const response = await client.patch(`/comments/${id}`, { usersId, title, body })

  return response
}

export { getAllCommentsByPostId, createComment, deleteComment, updateComment }
