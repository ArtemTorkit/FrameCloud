import React, { useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import { useState } from 'react'

const InfiniteScrolling = () => {
    const [posts, setPosts] = useState([])
    const [lastPost, setLastPost] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchPostsInfinite = () => {
        fetch('http://localhost:5000/post-fetching/postInfiniteScroll', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ lastId: lastPost})
        }).then(response => response.json())
            .then(data => {
                if (data.posts.length !== 0){
                    console.log(data.posts)
                    if (lastPost !== 1) {
                        setPosts(prev => [...prev, ...data.posts.reverse()])
                    } else {
                        setPosts(data.posts)
                    }
                    setLastPost(data.posts[data.posts.length-1].id)
                } else {
                    setHasMore(false)
                }
            })
            .catch(error => console.error('Помилка:', error));
    }

    useEffect(() => {
        fetchPostsInfinite()
    }, [])

  return (
      <div>
              <h1>Ifinite scroll</h1>
            <InfiniteScroll dataLength={posts.length} next={fetchPostsInfinite} hasMore={hasMore} loader={<p>Loading...</p>} height={150}>
                  
          {posts.map((post, index) => (
              <div key={index} className='post'>
                <div>{post.id}</div>
                <div>{post.description}</div>
              </div>
          ))}
          </InfiniteScroll>
          
    </div>
  )
}

export default InfiniteScrolling
