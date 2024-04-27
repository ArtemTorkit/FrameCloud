import { useEffect, useState } from 'react'
import { user } from '../assets/icons'
import { Link } from 'react-router-dom'

const RecomendedUsers = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/user/get-users', {
            method: 'POST',
            credentials: 'include',
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setUsers(data)
            })
            .catch(error => console.error('Error:', error));
    },[])

  return (
    <div>
        <div className="text-lg">Random users:</div>
        <div className="flex overflow-y-auto gap-4 mt-[15px] pb-4">
              {users.map((user, index) => (
                  <Link to={`/profile-guest/${user.id}`} className="flex flex-col items-center hover:underline" key={index}>
                      <div className=" block">
                          <img
                              src={user.img || user}
                              className={`rounded-full w-[40px] h-[40px] object-cover ${user.img && 'hover:border border-white'}`}
                              alt=""
                          />
                    </div>
                    <div className="">@{user.username}</div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default RecomendedUsers
