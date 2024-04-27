import {useState} from 'react'

import { textLogo, cross } from '../assets/icons/'
import RecomendedUsers from './RecomendedUsers'
import UserBelt from './UserBelt'

const Search = ({ setIsSearching }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        fetch('http://localhost:5000/user/search', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchTerm: e.target.value })
        }).then(response => response.json())
            .then(data => {
                    console.log(data)
                    setResults(data)
                
            })
            .catch(error => console.error('Error:', error));


    }


  return (
      <div className='
      fixed top-0 left-0 z-50 w-full md:w-auto md:top-0 md:left-[90px] lg:left-[85px] h-full border border-white bg-black py-[30px]
      flex flex-col items-center justify-between px-4 md:max-w-[425px]
    '>
        <div className="w-full">
            <div className="flex justify-between w-full">
                <img src={textLogo} alt="" className='block'/>
                  <div className='ml-[15px] cursor-pointer' onClick={() => setIsSearching(false)}>
                    <img src={cross} alt="" />
                  </div>
            </div>
            <div className=" mt-[30px]">
                  <input value={searchTerm} onChange={(e)=>handleSearch(e)} type="text" className='input-pirimary w-full md:w-[390px]' placeholder='Search' />
            </div>
            <p className='text-xl font-bold pt-[30px]'>Results:</p>
              <div className="w-full  overflow-y-auto mt-[20px] max-h-[400px] px-[10px]">
                  {results.map((user, index) => (
                      <UserBelt userInfo={user} key={index}/>
                  ))}
            </div>
          </div>
          <div className="w-full px-4">
              <RecomendedUsers/>
          </div>
    </div>
  )
}

export default Search
