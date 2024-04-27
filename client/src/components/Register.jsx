import { useFormik } from "formik"
import { registerSchema } from '../schemas'
import { textLogo } from "../assets/icons"
import { useState } from "react"


const Register = ({ setSignUpOrIn }) => {
    const [sameUserExists, setSameUserExists] = useState(false)

    const onSubmit = (values, actions) => {
        setSameUserExists(false)
        console.log('form submited')
        fetch(`http://localhost:5000/auth/register?login=${encodeURIComponent(values.username)}&password=${encodeURIComponent(values.password)}&email=${encodeURIComponent(values.email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data
                location.reload();
            })
            .catch(error => {
                // Handle errors
                setSameUserExists(true)
                console.error('Error:', error.message);
            });

        actions.resetForm()
    }

    const { values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validationSchema: registerSchema,
        onSubmit
    })

    return (
        <div className="relative px-[30px] bg-black border-white border rounded-sm px-[10px] w-[80%] z-20 w-[95%] md:w-80% max-w-[500px] flex flex-col justify-center">
            <div className="py-[35px]">
                <img src={textLogo} className='max-h-[45px] mx-auto' alt="" />
            </div>
            {sameUserExists && <p className=' text-red-600 block text-sm' >Same username or email already has been used.</p>}
            <form action="" onSubmit={handleSubmit} className=''>
                <label htmlFor="username" >Username</label>
                <input
                    type="text"
                    placeholder='Username'
                    className={errors.username && touched.username ? "input-error" : "input-pirimary"}
                    id='username'
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.username && touched.username && <p className='text-sm text-red-600' >{errors.username}</p>}
                <label htmlFor="Email" className=' block mt-[20px]'>Email</label>
                <input
                    type="text"
                    placeholder='Email'
                    className={errors.email && touched.email ? "input-error" : "input-pirimary"}
                    id='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.email && touched.email && <p className='text-sm text-red-600' >{errors.email}</p>}
                <label htmlFor="password" className=' block mt-[20px]'>Password</label>
                <input
                    type="password"
                    placeholder='Password'
                    className={errors.password && touched.password ? "input-error" : "input-pirimary"}
                    id='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.password && touched.password && <p className='text-sm text-red-600' >{errors.password}</p>}
                <button disabled={isSubmitting} type='submit' className='button-primary mt-[40px]'>Register</button>
            </form>
            <div className="text-center text-lg py-[30px]">
                <p>Already have an account?
                    <span
                        className='underline cursor-pointer 
                      text-dark-blue hover:text-blue
                        ease-linear duration-75'
                        onClick={() => (setSignUpOrIn(true))}
                    >Sign up</span>
                </p>
            </div>
        </div>
    )
}

export default Register
