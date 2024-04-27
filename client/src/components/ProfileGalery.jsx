import {useEffect, useState} from 'react'
import Post from './Post'

const ProfileGalery = ({ imageUrl, loadMoreContent, hasMore }) => {

    return (
        <div>
            <div className=" bg-[#111111] p-2">Photos:</div>
            <div className="bg-[#141c1d] flex h-[145px] gap-5 overflow-hidden overflow-x-auto pb-2">
                {imageUrl.map((image, key) => (
                    <img src={image} key={key} />
                ))}
                {hasMore &&
                    <div className=" w-[300px] justify-center flex items-center px-4 cursor-pointer gap-2 hover:text-blue transition" onClick={loadMoreContent} >
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
  )
}

export default ProfileGalery
