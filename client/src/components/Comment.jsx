import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {user} from '../assets/icons'
const CommentItem = ({ commentInfo, index }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [creatorInfo, setCreatorInfo] = useState({})

  useEffect(() => {
    fetch('http://localhost:5000/user/get-user', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id: commentInfo.idUser })
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        setCreatorInfo(data)
      }).catch(error => console.error('Помилка:', error));
  }, [])
  
  return (
    <div className='pt-[20px] min-h-[60px]' key={index}>
      <Link to={'/profile'} className="block float-left flex pr-[7px]">
        <img src={creatorInfo.img || user} className='rounded-full hover:border border-white w-[40px] h-[40px] object-cover object-cover' alt="" />
        <div className="ml-[5px] hover:underline font-light">@{creatorInfo.username}</div>
      </Link>
      <p className='block whitespace-normal'>{commentInfo.comment}</p>
    </div>
  );
};

export default CommentItem;
