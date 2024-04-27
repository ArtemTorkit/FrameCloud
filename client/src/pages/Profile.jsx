import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../UserContext'
import {user} from '../assets/icons'
import ProfileGalery from '../components/ProfileGalery'
import Post from '../components/Post'
import { Link } from 'react-router-dom'
import MusicPopUp from '../components/MusicPopUp'

const Profile = () => {
  const { userData } = useContext(UserContext)
  const [imageUrl, setImageUrl] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [lastPostId, setLastPostId] = useState()
  const [hasMore, setHasMore] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [musicPopup, setMusicPopup] = useState(false)
  
  
  useEffect(() => {
    fetch('http://localhost:5000/post/get-userphotos', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({})
    }).then(response => response.json())
      .then(data => {
        
        console.log('get-photos: ', data.imageUrl[data.imageUrl.length - 1].id)
        if (data.imageUrl.length < 5) setHasMore(false)
        setUserPosts(data.imageUrl)
        const imageUrlsArray = []
        data.imageUrl.forEach(element => {
          if (element.imageUrl !== '[]') {

            const imgString = element.imageUrl.replace(/[\[\]']/g, '');
            const urls = imgString.split(',').map(url => url.trim())
            const urlsWithSingleQuotes = urls.map(url => url.replace(/"/g, ""));

            imageUrlsArray.push(...urlsWithSingleQuotes);
          }
        });
        setLastPostId(data.imageUrl[data.imageUrl.length-1].id)
        setImageUrl(imageUrlsArray)

      }).catch(error => console.error('Помилка:', error));

  }, [])

  const loadMoreContent = () => {
    fetch('http://localhost:5000/post/get-userposts', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({lastPostId})
    }).then(response => response.json())
      .then(data => {
        console.log('get more content: ', data.imageUrl[data.imageUrl.length - 1].id)
        setUserPosts(prev => [...prev, ...data.imageUrl])

        if(data.imageUrl.length < 5) setHasMore(false)
        const imageUrlsArray = []
        data.imageUrl.forEach(element => {
          console.log('element: ', element)
          if (element.imageUrl !== '[]') {
            const imgString = element.imageUrl.replace(/[\[\]']/g, '');
            const urls = imgString.split(',').map(url => url.trim())
            const urlsWithSingleQuotes = urls.map(url => url.replace(/"/g, ""));
            
            imageUrlsArray.push(...urlsWithSingleQuotes);
          }

        });
        setLastPostId(data.imageUrl[data.imageUrl.length - 1].id)
        setImageUrl(prev=>[...prev, ...imageUrlsArray])

      }).catch(error => { console.error('Помилка:', error) });
  }

  const logOut = () => {
    fetch('http://localhost:5000/auth/logout', {
      method: "GET",
      credentials: 'include',
    }).then(response => response.json()).then(data => {
        console.log(data)
        document.location.reload()
    }).catch(error => {
      document.location.reload()
      console.error('Помилка:', error)
    });
  }

  if (userData.id) return (
    <div className={musicPopup ? 'overflow-hidden h-100vh' : ''} >

    <div className='lg:w-[80%] mx-auto '>
      <div className="mt-[40px] flex gap-[37px] w-full">
        <div className="w-[390px] md:w-[25%] ">
          <img src={userData.img || user} className='rounded-[15px] lg:rounded-[40px] max-h-[390px] h-full  object-cover object-cover' alt="" />
        </div>
          <div className="grow md:w-[50%] lg:w-auto flex flex-col">
            <div className="w-full ">
              <div className="flex justify-between">
              <p className='text-blue font-bold text-2xl block text-lg md:text-2xl'>@{userData.username}</p>
                <Link to={'/edit-profile'} className="hover:underline cursor-pointer ">
                  Edit profile
                </Link>
              </div>
              <div className="text-[#848484] flex justify-between">
                <p className='block mt-[10px] w-[80%] text-sm md:text-lg'>{userData.biography}</p> 
                <div onClick={logOut} className="hover:underline mt-[10px] cursor-pointer">
                  Log out
                </div>
              </div>
          </div>
          <div className="hidden lg:block w-full  grow">
              <div className="w-full flex flex-col gap-[10px] mt-[43px]">
                <div className="flex">
                  <p className='block text-[#848484] grow w-[50%]'>Birthday:</p>
                  <p className='block w-[50%]'>{userData.birthday}</p>
                </div>

                <div className="flex">
                  <p className='text-[#848484] grow w-[50%]'>Hometown:</p>
                  <p className='block w-[50%]'>{userData.hometown}</p>
                </div>
                <div className="flex">
                  <p className='text-[#848484] grow w-[50%]'>Relationship status: </p>
                  <p className='block w-[50%]'>{userData.relationships}</p>
                </div>

                <div className="flex">
                  <p className='text-[#848484] grow w-[50%]'>Languages:</p>
                  <p className='block w-[50%]'>{userData.languages}</p>
                </div>


            </div>
            <div className="flex flex-col lg:gap-[13px]">
            </div>

          </div>
            <div className="">
              <div className='block lg:hidden mt-[15px] text-gray-500 cursor-pointer hover:underline' onClick={() => setShowDetails(!showDetails)}>View details...</div>
              <button onClick={() => setMusicPopup(true)} className=' w-full lg:w-[208px] mt-[20px] bg-[#D2D9DD] py-4 text-blue font-bold hover:text-[#4a6678] hover:bg-[#abc5df] transition rounded-xl flex gap-[20px] justify-center'>
              <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
              </svg>
              </div>
              <div className="">
                Music
              </div>
            </button>
          </div>
        </div>
        </div>
        {showDetails && 
        <div className="flex w-full gap-[100px] mt-[43px] grow">
            <div className="flex flex-col lg:gap-[13px]">
              <p className='block text-[#848484]'>Birthday:</p>
              <p className='block'>{userData.birthday}</p>

              <p className='text-[#848484]'>Hometown:</p>
              <p className='block'>{userData.hometown}</p>
              
              <p className='text-[#848484]'>Relationship status: </p>
              <p className='block'>{userData.relationships}</p>
              
              <p className='text-[#848484]'>Languages:</p>
              <p className='block'>{userData.languages}</p>
            </div>

          </div>
        }
      <div className="mt-[37px]">
          <ProfileGalery
            imageUrl={imageUrl}
            loadMoreContent={loadMoreContent}
            hasMore={hasMore}
          />
      </div>
      </div>
      <div className="my-[70px] flex flex-col gap-[50px]">
      {userPosts.map((post, index) => (
        <Post
          postData={post}
          key={index}
          
        />
        ))}
      </div>
      {hasMore &&
      <div className="mx-auto w-[300px] justify-center flex py-[50px] cursor-pointer gap-2 hover:text-blue transition text-center" onClick={loadMoreContent} >
        <div className="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
        <p className='block'>
          Load more
        </p>
        </div>
      }
      {musicPopup && 
      <MusicPopUp
      id={userData.id}
      setMusicPopup={setMusicPopup}
      />
    }
    </div>

  )
}

export default Profile
