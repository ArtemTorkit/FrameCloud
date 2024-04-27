import { galeryArrow } from "../assets/icons"

const ExploreGalery = ({ activeImage, setActiveImage, setActiveGalery, imgsLength, activeIndexImage }) => {

    const nextImage = () => {
        console.log(imgsLength)
        console.log(activeIndexImage)
        if (activeIndexImage == imgsLength - 1) {
            setActiveImage(0)
        } else {
            setActiveImage(activeIndexImage + 1)
        }
    }

    const prevImage = () => {
        console.log(activeIndexImage)

        if (activeIndexImage == 0) {
            setActiveImage(imgsLength - 1)
        } else {
            setActiveImage(activeIndexImage - 1)
        }
    }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex lg:justify-center lg:items-center overflow-x-auto ">
          <div className='absolute top-0 left-0 w-full h-[150vh] lg:h-full flex backdrop-blur-lg z-10' onClick={() => setActiveGalery(false)}>
        </div>
          <div className="relative z-30 h-[80%] w-[50%] flex justify-center items-center">
              <div className="absolute top-0 left-0 h-full w-full flex">
                  <div className="w-[50%] h-full flex items-center justify-start" onClick={prevImage}>
                      <img src={galeryArrow} className='block hover:fill-black cursor-pointer rotate-180' alt="" />
                  </div>
                  <div className="w-[50%] h-full flex items-center justify-end" onClick={nextImage}>
                      <img src={galeryArrow} className='block hover:fill-black cursor-pointer' alt="" />
                  </div>
              </div>
              <img src={activeImage}  alt="" />
            </div>
    </div>
  )
}

export default ExploreGalery
