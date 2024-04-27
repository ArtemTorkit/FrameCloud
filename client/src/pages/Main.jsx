import {useState, useEffect, useContext} from 'react'
import RecomendedUsers from '../components/RecomendedUsers'
import SubcribedUsers from '../components/SubscribedUsers'
import InfiniteScroll from "react-infinite-scroll-component"
import Post from '../components/Post'
import UserContext from '../UserContext'

const Main = () => {
  const [posts, setPosts] = useState([])
  const [lastPost, setLastPost] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const { isLogged } = useContext(UserContext)

  const fetchPostsInfinite = () => {
    console.log('infinite scroll main, lastPost:', lastPost, 'post lenght: ', posts.length)
    fetch('http://localhost:5000/post-fetching/postInfiniteScroll', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ lastId: lastPost })
    }).then(response => response.json())
      .then(data => {
        if (data.posts.length !== 0) {
          console.log('infinite posts: ', data.posts, 'lastPost setted to: ', data.posts[data.posts.length - 1].id)
          if (lastPost !== 1) {
            setPosts(prev => [...prev, ...data.posts])
          } else {
            setPosts(data.posts)
          }
          setLastPost(data.posts[data.posts.length - 1].id)
        }
        
        if (data.posts[data.posts.length - 1].id == 1){
          console.log('has more is false')
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
      <div className="flex justify-between w-[80%] mx-auto mt-[30px]">
        <div className="max-w-[360px] hidden md:block  xl:max-w-[460px]">
          <SubcribedUsers />
        </div>
        <div className="max-w-[360px] hidden md:block  xl:max-w-[460px]">
          <RecomendedUsers />
        </div>
      </div>
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
  )
}

export default Main
