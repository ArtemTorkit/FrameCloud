import {useEffect, useState, useContext} from 'react'
import UserBelt from './UserBelt'
import CommentItem from './Comment'
import { useFormik } from "formik"
import { commentSchema } from '../schemas'
import UserContext from '../UserContext'
import { cross } from '../assets/icons'
import Galery from './Galery'

const PostPopUp = ({ setPopUp, isLoading, isLogged, imgArray, postData, likeCount, isLiked, isSaved, creatorInfo, handleLike, handleSave }) => {
  const [comments, setComments] = useState([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const { userData } = useContext(UserContext)


  
  //get comments
  useEffect(() => {
    fetch('http://localhost:5000/post/get-comments', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ postId: postData.id })
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        setComments(data.reverse())
        setIsLoadingComments(true)
      }).catch(error => console.error('Помилка:', error));
  }, [])

  const onSubmit = (values, actions) => {
    
    fetch('http://localhost:5000/post/comment', {
      method: "POST",
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'postId': postData.id, 'comment': values.comment })
    }).then((response) => {
      if (response.ok) {
        console.log('Commment created');
        setComments([{ 'img': userData.img, 'idUser': userData.id, 'comment': values.comment, 'idPost': postData.id }, ...comments])
      }
    }).catch((err) => {
      console.log(err);
    });

    actions.resetForm()
    console.log('creating comment: ', values.comment)
  }

  const { values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit
  })

  return (
    <div className="fixed top-0 left-0 w-full h-full flex lg:justify-center lg:items-center overflow-x-auto ">
      <div className='absolute top-0 left-0 w-full h-[150vh] lg:h-full flex backdrop-blur-lg z-10' onClick={() => setPopUp()}>
      </div>
      <div className="lg:flex gap-[20px] z-20 lg:h-[75vh] px-4 w-full lg:w-auto ">
        <div className="block lg:hidden flex justify-end">
          <img src={cross} alt="" className='block h-[40px] w-[40px] m-[7px]' onClick={setPopUp}/>
        </div>
        {imgArray.length > 0 && (
          <Galery imgArray={imgArray}/>
          )}
        <div className="bg-black border border-white w-full min-w-[430px] lg:h-full flex flex-col lg:w-[500px] mb-[200px]">
            <div className="px-4">
              <UserBelt userInfo={creatorInfo} />
                <p className='text-lg font-bold mt-[15px]'>Description:</p>
                <p>{postData.description}</p>
              <div className="mt-[15px]">
                <audio controls>
                  <source src={postData.musicUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <p className='text-lg font-bold mt-[15px]'>Comments:</p>
            </div>
          <div className="h-[400px] lg:h-auto lg:flex-shrink overflow-x-auto pb-4">
              <div className=" px-4 overflow-x-auto overflow-hidden">
            {isLoadingComments && comments ? (
              comments.map((comment, index) => (
                <CommentItem commentInfo={comment} index={index} />
                ))
                ) : (
                  <p className='block text-center text-lg'>No comments</p>
                  ) }
              </div>
          </div>
            {isLogged && isLoading && (
                <div className="">
                  <div className=" bg-black">
                  <div className="px-4 py-[15px] border-white border-t">
                  <form className="flex gap-4" action="" onSubmit={handleSubmit}>
                    
                      <input
                        type="text"
                        placeholder='Comment'
                        className={errors.comment && touched.comment ? "input-error" : "input-pirimary"}
                        id='comment'
                        value={values.comment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <button disabled={isSubmitting} type='submit' className='bg-blue rounded-md p-4 '>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="fill-none hover:fill-white w-[24px] h-[24px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>

                    </button>
                    </form>
                  </div>
              
            <div className="w-full border-t flex justify-between items-center">
              {isLiked ? (
                <div onClick={handleLike} className="flex items-center gap-2 w-[70px] py-2 px-[12px] cursor-pointer hover:bg-[#303030] fill-[#ff0000] ease-linear duration-75">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-[40px] w-[40px]" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff0000" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  <span className='text-xl block'>{likeCount}</span>
                </div>

              ) : (
                <div onClick={handleLike} className="flex items-center gap-2 border rounded-md py-2 px-[12px] cursor-pointer hover:bg-[#303030] hover:fill-[#303030] ease-linear duration-75">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-[40px] w-[40px]" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  <span className='text-xl block'>{likeCount}</span>
                </div>
              )}
              <div className="" onClick={handleSave} >
                {isSaved ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer fill-white ease-linear duration-75 h-[40px] w-[40px]' viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer hover:fill-[#ffffff] ease-linear duration-75 h-[40px] w-[40px]' viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                )}
                </div>
                  </div>
                </div>

                </div>
                )}
        </div>
        <div className=""></div>
      </div>
    </div>
  )
}

export default PostPopUp
