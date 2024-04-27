import { useState, useEffect, useContext } from 'react'
import LazyImage from '../components/LazyImage'
import ExploreGalery from '../components/ExploreGalery'

const Explore = () => {
  const [imageUrls, setImageUrls] = useState([{imageUrl: ''}])
  const [lastPost, setLastPost] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [activeGalery, setActiveGalery] = useState(false)
  const [activeImage ,setActiveImage] = useState(1)

  useEffect(() => {
  const fetchPostsInfinite = () => {
    fetch('http://localhost:5000/post-fetching/mediaInfiniteScroll', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ lastId: lastPost })
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.posts.length < 3) {
          setHasMore(false)
        }
        setLastPost(data.posts[data.posts.length - 1].id)
        const processedData = [];
        let urlsImg = [];
        data.posts.forEach(item => {
          if (item.imageUrl !== '[]') {

            // Remove both square brackets and double quotes from imageUrl value
            const imageUrlString = item.imageUrl.replace(/[\[\]"]/g, '');

            // Split the string by comma and trim each URL
            const urls = imageUrlString.split(',').map(url => url.trim());
            console.log('urls: ', urls);
            urls.forEach(url => {
              processedData.push({ imageUrl: url, idUser: item.idUser });
            });
            // Add each URL to the imageUrls array
            urlsImg.push(...urls);

          }
        });
        setImageUrls(processedData);
        console.log('processedData: ', processedData);
      })
      .catch(error => console.error('Помилка:', error));
  }

    fetchPostsInfinite()
  }, [])
  
  const loadMore = () => {
    fetch('http://localhost:5000/post-fetching/mediaInfiniteScroll', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ lastId: lastPost })
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setLastPost(data.posts[data.posts.length - 1].id)
        const processedData = [];
        let urlsImg = [];
        data.posts.forEach(item => {
          if (item.imageUrl !== '[]') {

            // Remove both square brackets and double quotes from imageUrl value
            const imageUrlString = item.imageUrl.replace(/[\[\]"]/g, '');

            // Split the string by comma and trim each URL
            const urls = imageUrlString.split(',').map(url => url.trim());
            console.log('urls: ', urls);
            urls.forEach(url => {
              processedData.push({ imageUrl: url, idUser: item.idUser });
            });
            // Add each URL to the imageUrls array
            urlsImg.push(...urls);

          }
        });
        setImageUrls(prev=>[...prev, ...processedData]);
        console.log('processedData: ', processedData);
      })
      .catch(error => console.error('Помилка:', error));

  }


  return (
    <div className=' w-[80%] mx-auto mt-[30px]'>
      <h2 className='text-2xl font-bold'>
        Explore:
      </h2>
      <div className="w-full">
        <div className="mt-[30px] w-full">
          <div className="w-full p-5 pb-10 gap-2 columns-2 md:columns-3 space-y-2">
            {imageUrls.map((item, index) => (
              <LazyImage
                className='w-full'
                src={item.imageUrl}
                key={index}
                index={index}
                idUser={item.idUser}
                setActiveImage={setActiveImage}
                setActiveGalery={setActiveGalery}
              />
            ))}
          </div>
            {hasMore &&
              <div className="mx-auto w-[300px] justify-center flex py-[50px] cursor-pointer gap-2 hover:text-blue transition text-center" onClick={loadMore} >
                <div className="">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <p className='block'>
                  Load more
                </p>
              </div>
            }
        </div>
      </div>
      {activeGalery &&
        <ExploreGalery
        activeImage={imageUrls[activeImage].imageUrl}
          setActiveImage={setActiveImage}
          setActiveGalery={setActiveGalery}
          imgsLength={imageUrls.length}
          activeIndexImage={activeImage}
        />}
    </div>
  )
}

export default Explore
