import { useEffect, useState } from "react"

const MusicPopUp = ({ id, setMusicPopup }) => {
    const [musicArr, setMusicArr] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/post-fetching/user-music', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id })
        }).then(response => response.json())
            .then(data => {
                console.log('music: ', data)
                setMusicArr([...data])
            }).catch(e => console.log(e))
    },[])

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
        <div className='absolute top-0 left-0 w-full h-full flex backdrop-blur-lg z-10' onClick={() => setMusicPopup(false)}> </div>
          <div className="bg-black border border-white z-20 p-4 max-h-[500px] overflow-y-auto">
              <h2 className="font-bold p-2 text-2xl text-center ">Music List</h2>
              {musicArr.map((element, index) => (
                  <audio controls key={index} className="my-4">
                      <source src={element.musicUrl} type="audio/mp3" />
                      Your browser does not support the audio element.
                  </audio>
              ))}
        </div>
    </div>
  )
}

export default MusicPopUp
