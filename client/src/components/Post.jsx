import {useState, useEffect, useContext} from 'react'
import { save, like, deleteIcon } from '../assets/icons'
import UserBelt from './UserBelt';
import UserContext from '../UserContext';
import PostPopUp from './PostPopUp';
import { useNavigate } from 'react-router-dom'

const Post = ({ postData }) => {
    const imgArray = JSON.parse(postData.imageUrl.replace(/'/g, '"'));
    const [isLiked, setIsLiked] = useState(true)
    const [likeCount, setLikeCount] = useState(1)
    const [isSaved, setIsSaved] = useState(false)
    const [creatorInfo, setCreatorInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [showActions, setShowActions] = useState(false)
    const { isLogged, userData } = useContext(UserContext)

    const navigate = useNavigate()
    
    useEffect(() => {
        console.log('post data: ', postData)
        //get info for userBelt
        fetch('http://localhost:5000/user/get-user', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id: postData.idUser })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setCreatorInfo(data)
            }).catch(error => console.error('Помилка:', error));
        
        //get info about like&save
        fetch('http://localhost:5000/post/post-info', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ idPost: postData.id })
        }).then(response => response.json())
            .then(data => {
                setIsSaved(data.isSaved)
                setIsLiked(data.isLiked)
                setLikeCount(data.likeCount)
                setIsLoading(true)

                console.log('post info: ', data)

            }).catch(error => console.error('Помилка:', error));
        
    },[])
    
    const togglePopup = () => {
        console.log('scroll blocked/unblocked')
        setPopUp(!popUp);
        // Toggle body overflow style based on popup visibility
        document.body.style.overflow = popUp ? 'auto' : 'hidden';
    };

    const handleLike = () => {
        console.log('like handling...')
        fetch('http://localhost:5000/post/like', {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'postId': postData.id })
        }).then((response) => {
            if (response.ok) {
                console.log('Like processed!');
                
                if (isLiked) {
                    setLikeCount(likeCount - 1 )
                } else {
                    setLikeCount(likeCount + 1)
                }
                setIsLiked(!isLiked)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleSave = () => {
        fetch('http://localhost:5000/post/save', {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'postId': postData.id })
        }).then((response) => {
            if (response.ok) {
                console.log('Save was created/deleted');
                setIsSaved(!isSaved)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const deletePost = () => {
        fetch('http://localhost:5000/post/delete-post', {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'postData': postData })
        }).then((response) => {
            if (response.ok) {
                console.log('Save was created/deleted');
                document.location.reload()
            }
        }).catch((err) => {
            console.log(err);
        });
    }
  return (
      <div className='mx-auto md:w-[80%] w-full' key={postData.id}>
          <div className="">
              <UserBelt userInfo={creatorInfo} />
          </div>
          <div className=" flex justify-between items-center mt-[5px]">
              <p className=" text-sm text-gray-500 block">{postData.datetime}</p>
              {creatorInfo.id == userData.id &&
                  <>
                      
                      <div className="cursor-pointer relative">
                        {showActions &&
                          <div className=" rounded-md  px-2 absolute flex items-center gap-[10px] bottom-[0px]  left-[-100px] bg-[#8181813f]">
                              <div className="cursor-pointer" onClick={deletePost}>
                                  <img src={deleteIcon} alt="" className='w-[30px] h-[30px]' />
                              </div>
                              <div className="" onClick={() => navigate(`/edit-post/${postData.id}/${creatorInfo.id}`)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer cursor-pointer hover:fill-[#4b4b4b] ease-linear duration-75 h-[30px] w-[30px] ease-linear duration-75 h-[40px] w-[40px]">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                  </svg>
                              </div>
                          </div>
                            }

                          <div className="" onClick={() => setShowActions(!showActions)}>
                      
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[40px] h-[40px]">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                              </svg>
                          </div>
                      </div>
                  </>}
          </div>
          <div className="mt-[15px]" onClick={togglePopup}>
              {imgArray.length === 1 ? (
                  <div className="post-photos ">
                      <img className="post-photo row-span-2 col-span-4" src={imgArray[0]} alt="" />
                  </div>
              ) : imgArray.length === 2 ? (
                  <div className="post-photos ">
                      <img className="post-photo row-span-2 col-span-2" src={imgArray[0]} alt="" />
                      <img className="post-photo row-span-2 col-span-2" src={imgArray[1]} alt="" />
                  </div>
                  ) : imgArray.length === 3 ? (
                  <div className="post-photos ">
                        <img className="post-photo row-span-2 col-span-2" src={imgArray[0]} alt="" />
                        <img className="post-photo col-span-2" src={imgArray[1]} alt="" />
                        <img className="post-photo col-span-2"src={imgArray[2]} alt="" />
                  </div>
                      ) : imgArray.length === 4 ? (
                  <div className="post-photos ">
                    <img className="post-photo row-span-2 col-span-2" src={imgArray[0]} alt="" />
                    <img className="post-photo" src={imgArray[1]} alt="" />
                    <img className="post-photo" src={imgArray[2]} alt="" />
                    <img className="post-photo col-span-2" src={imgArray[3]} alt="" />
                  </div>
                        ) : imgArray.length === 5 ? (
                  <div className="post-photos ">
                        <img className="post-photo row-span-2 col-span-2" src={imgArray[0]} alt="" />
                        <img className="post-photo" src={imgArray[1]} alt="" />
                        <img className="post-photo" src={imgArray[2]} alt="" />
                        <img className="post-photo" src={imgArray[3]} alt="" />
                        <img className="post-photo" src={imgArray[4]} alt="" />
                  </div>
              ) : (
                  <></>
              )}
          </div>
          <div className="mt-[15px]">
              {postData.description}
          </div>
          <div className="mt-[15px]">
              {postData.musicUrl !== 'undefined' && (
                  <audio controls>
                      <source src={postData.musicUrl} type="audio/mp3" />
                      Your browser does not support the audio element.
                  </audio>
              )}
          </div>
          
          {isLogged && isLoading && (
              <div className="mt-[15px] flex items-center justify-between">
              <div className="flex gap-4 items-center">
                  {isLiked ? (
                          <div onClick={handleLike} className="flex items-center gap-2 border rounded-md py-2 px-[12px] cursor-pointer hover:bg-[#303030] fill-[#ff0000] ease-linear duration-75">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-[40px] w-[40px]" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff0000" >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                        <span className='text-xl block'>{likeCount}</span>
                  </div>
                  
                  ): (
                        <div onClick={handleLike} className="flex items-center gap-2 border rounded-md py-2 px-[12px] cursor-pointer hover:bg-[#303030] hover:fill-[#303030] ease-linear duration-75">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[40px] w-[40px]" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                              <span className='text-xl block'>{likeCount}</span>
                        </div>
                  )}
                  <div className="" onClick={()=>setPopUp(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer hover:fill-[#303030] ease-linear duration-75 h-[40px] w-[40px]" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                  </div>
                  </div>
              <div className="" onClick={handleSave} >
              {isSaved ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer fill-white ease-linear duration-75 h-[40px] w-[40px]' viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                  ): (
                      <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer hover:fill-[#ffffff] ease-linear duration-75 h-[40px] w-[40px]' viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                  )}
                  </div>
                  </div>
                  )}
                
          {popUp &&
              <PostPopUp
              setPopUp={togglePopup}
              isLogged={isLogged}
              imgArray={imgArray}
              postData={postData}
              likeCount={likeCount}
              isLiked={isLiked}
              isSaved={isSaved}
              creatorInfo={creatorInfo}
              isLoading={isLoading}
              handleLike={handleLike}
              handleSave={handleSave}
                />
            }
    </div>
  )
}

export default Post
