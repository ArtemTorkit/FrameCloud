import {useEffect, useState} from 'react'

const Apps = () => {
  const [focusLink, setFocusLink] = useState('')
  useEffect(() => {
    fetch('http://localhost:5000/user/get-ai-link', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        setUserData({})
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    }).then((data) => {
      console.log('Link: ', data)
      setFocusLink(data.message)
    })
  }, [])

  return (
    <div>
      <h2 className='py-2 text-2xl'>Free text to image , text to video generators:</h2>
      {/* <p className='text-lg'>Sorry this page is not avaible yet. </p> */}
      <div className="">
        <div className="p-[40px] text-2xl bg-[#151515]">
          <p>Want to set up your private text to image generator  remotely?
            <a href="https://github.com/lllyasviel/Fooocus" className='text-bold text-blue hover:underline'>Here's the tutorial.</a>
          </p>
        </div>
      </div>
      <p className='text-xl mt-[40px]'>Fooocus AI text to image generator (not working now)</p>
      <a href={focusLink} className='py-4 text-center block bg-blue text-white rounded-md w-[400px] mt-[20px]'>Try text to image generator</a>
    </div>
  )
}

export default Apps
