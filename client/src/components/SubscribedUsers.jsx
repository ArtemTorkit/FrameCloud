import { useEffect, useState, useContext } from 'react'
import { user } from '../assets/icons'
import { Link } from 'react-router-dom'

const SubcribedUsers = () => {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        console.log('user-subscribes:')
        fetch('http://localhost:5000/user/user-subscribes', {
            method: 'POST',
            credentials: 'include',
        }).then(response => response.json())
        .then(data => {
            console.log('user-subscribes:', data)
            setUsers(data)
        }).catch(error => console.error('Error:', error));
    }, [])

    return (
        <div>
            <div className="text-lg">Subscribes:</div>
            <div className="flex overflow-y-auto gap-4 mt-[15px] pb-4">
                {users.map((user, index) => (
                    <div className="flex flex-col items-center hover:underline" key={index}>
                        <Link to={`/profile-guest/${user.idUser}`} className=" block">
                                <img
                                    src={user.img || user}
                                    className={`rounded-full w-[40px] h-[40px] object-cover ${user.img && 'hover:border border-white'}`}
                                    alt=""
                                />
                        </Link>
                        <div className="">@{user.username}</div>
                    </div>
                    
                
                ))}
            </div>
        </div>
    )
}

export default SubcribedUsers
