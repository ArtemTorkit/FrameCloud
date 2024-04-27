import { useState, useEffect, useContext } from 'react'
import UserContext from '../UserContext'
import Post from '../components/Post'
import InfiniteScroll from "react-infinite-scroll-component"

const Saved = () => {
  const [posts, setPosts] = useState([])
  const [lastPost, setLastPost] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [leastSavedId, setLeastSavedId] = useState(1)

  const { isLogged } = useContext(UserContext)

  const fetchPostsInfinite = () => {
    console.log('infinite scroll main, lastPost:', lastPost, 'post lenght: ', posts.length)
    
    fetch('http://localhost:5000/post-fetching/postSavedInfiniteScroll', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ lastId: lastPost })
    }).then(response => response.json())
      .then(data => {
        if (data.posts.length !== 0) {
          console.log('infinite posts: ', data.posts, 'lastPost setted to: ', data.posts[data.posts.length - 1].id)
          if (lastPost !== 1) {
            setPosts(prev => [...prev, ...data.posts.reverse()])
          } else {
            setPosts(data.posts)
          }
          setLastPost(data.posts[data.posts.length - 1].id)
        }

        if (data.posts[data.posts.length - 1].id == leastSavedId) {
          console.log('has more is false')
          setHasMore(false)
        }
      })
      .catch(error => console.error('Помилка:', error));
  }

  useEffect(() => {
    
    fetch('http://localhost:5000/post-fetching/smallestIdPost', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ lastId: lastPost })
    }).then(response => response.json())
    .then(data => {
      setLeastSavedId(data.smallestIdPost)
      console.log('least saved id: ', leastSavedId)
    })
    .catch(error => console.error('Помилка:', error));
    
    fetchPostsInfinite()
  }, [])

  if (isLogged) {
    return (
      <div className=' w-[80%] mx-auto mt-[30px]'>
      <h2 className='text-2xl font-bold'>
        Saved Posts:
      </h2>
      <div className="w-full">
        <div className="mt-[30px] w-full">
          <InfiniteScroll endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          } className='flex flex-col gap-[80px] overflow-hidden' dataLength={posts.length} next={fetchPostsInfinite} hasMore={hasMore} loader={<p>Loading...</p>}>
            {posts.map((post, index) => (
              <Post postData={post} key={index} />
              ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
  } else {
    return (
      <div className="text-3xl">Please autorize to access this page.</div>
    )
  }
}

export default Saved
