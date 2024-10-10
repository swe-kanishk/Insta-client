import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

function Posts() {
  const { posts } = useSelector(store => store.post)
  return (
    <div className='flex-1 my-8 h-screen flex flex-col items-center'>
      {
        posts?.map((post) => <Post key={post._id} post={post} />)
      }
    </div>
  )
}

export default Posts
