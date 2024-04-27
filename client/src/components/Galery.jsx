import {useState} from 'react'
import { galeryArrow } from '../assets/icons'
    
const Galery = ({ imgArray, active = 0 }) => {
    const [imageNumber, setImageNumber] = useState(active) 

    const nextImage = () => {
        if (imageNumber == imgArray.length - 1) {
            setImageNumber(0)
        } else {
            setImageNumber(imageNumber+1)
        }
    }

    const prevImage = () => {
        if (imageNumber == 0) {
            setImageNumber(imgArray.length-1)
        } else {
            setImageNumber(imageNumber - 1)
        }
    }

  return (
      <div className=" lg:max-w-[600px] relative overflow-hidden w-full lg:h-auto h-[500px] my-[15px]">
          <div className="absolute top-0 left-0 h-full w-full flex">
              <div className="w-[50%] h-full flex items-center justify-start" onClick={prevImage}>
                  <img src={galeryArrow} className='block hover:fill-black cursor-pointer rotate-180' alt="" />
              </div>
              <div className="w-[50%] h-full flex items-center justify-end" onClick={nextImage}>
                  <img src={galeryArrow} className='block hover:fill-black cursor-pointer' alt="" />
            </div>
          </div>
          
          <img src={imgArray[imageNumber]} className='w-full h-full block object-contain' alt="" />
      </div>
  )
}

export default Galery
