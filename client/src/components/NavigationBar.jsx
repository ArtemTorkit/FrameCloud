import {
    applications,
    explore,
    home,
    logoSmall,
    saved,
    search,
    logIn,
    addPost,
    setting,
    user
} from '../assets/icons'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../UserContext';
import AuthPopUp from './AuthPopUp';
import Search from './Search';

const NavigationBar = () => {
    const {isLogged, userData} = useContext(UserContext)
    const [isSigningIn, setIsSingningIn] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    return (<>
        <div className='h-[60px] border-t md:border-t-0 md:h-[100vh]
        px-[25px] py-[30px] md:border-r flex md:flex-col
        items-center gap-[70px] bottom-0 left-0 w-full bg-black fixed left-0 md:top-0 md:bottom-auto
        md:max-w-[90px] '>
        <div className="flex justify-center md:block hidden ">
            <Link to={'/'}>
                <img className='nav-icon' src={logoSmall} alt="" />
            </Link>
        </div>
        <nav className="flex md:flex-col flex md:flex-col md:gap-[25px] justify-between md:justify-start w-full md:grow ">
                <Link to={'/'} className='nav-button'>
                    <img src={home} alt="" />
                </Link>
                <div onClick={()=>setIsSearching(!isSearching)} className='nav-button'>
                    <img src={search} alt="" />
                </div>
                <Link to={'/explore'} className='nav-button'>
                    <img src={explore} alt="" />
                </Link>
                {isLogged &&
                
                <Link to={'/create-post'} className='nav-button'>
                    <img src={addPost} alt="" />
                </Link>
                }
                {isLogged && 
                <Link to={'/saved'} className='nav-button'>
                    <img src={saved} alt="" />
                </Link>
                }
                <Link to={'/applications'} className='nav-button'>
                    <img src={applications} alt="" />
                </Link>
                {
                isLogged ? (
                        <Link to={'/profile'} className="nav-button">
                            {userData.img ? (
                                <img src={userData.img} className='rounded-full nav-icon object-cover' alt="" />
                        ) : (
                                <img src={user} className='rounded-full nav-icon object-cover'/>
                        )}
                        </Link>
                    ) : (
                        <div onClick={()=>setIsSingningIn(true)} className="nav-button">
                            <img src={logIn} alt="" />
                        </div>
                        )
                }
        </nav>
        <div className="md:block hidden">
                <Link to={'/edit-profile'} className='nav-button'>
                <img src={setting} alt="" />
            </Link>
        </div>
    </div>
        {
            isSigningIn && <AuthPopUp setIsSingningIn={setIsSingningIn} />
        }
        {
            isSearching && <Search setIsSearching={setIsSearching} />
        }
    </>
  )
}

export default NavigationBar
