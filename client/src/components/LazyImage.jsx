import {useState, useEffect} from 'react'
import UserBelt from './UserBelt'

const LazyImage = ({ src, index, idUser, setActiveGalery, setActiveImage }) => {
    const [creatorInfo, setCreatorInfo] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/user/get-user', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id: idUser })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setCreatorInfo(data)
            }).catch(error => console.error('Помилка:', error));
    },[])
    
    const openGalery = () => {
        console.log('active img index:', index)
        setActiveImage(index)
        setActiveGalery(true)
    }

    return (
        <div className='relative' onClick={openGalery}>
            <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.16)] w-full h-full p-2 opacity-0 hover:opacity-100">
                <UserBelt userInfo={creatorInfo} />
            </div>
                
            <img
                src={src}
                alt=""
                className='w-full'
            />
            
        </div>
  )
}

export default LazyImage
