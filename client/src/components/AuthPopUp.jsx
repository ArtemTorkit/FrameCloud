import {useState} from 'react'
import LogIn from './LogIn'
import Register from './Register'

const AuthPopUp = ({ setIsSingningIn }) => {
    const [signUpOrIn, setSignUpOrIn] = useState(true)

    

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
            <div className='absolute top-0 left-0 w-full h-full flex backdrop-blur-lg z-10' onClick={() => setIsSingningIn(false)}>
            </div>
            {
                signUpOrIn ?
                (<LogIn setSignUpOrIn={setSignUpOrIn} />):
                    (<Register setSignUpOrIn={setSignUpOrIn} />)
            }
        </div>
    )
}

export default AuthPopUp
