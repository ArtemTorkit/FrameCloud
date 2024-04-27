import { useFormik } from "formik"
import { signInSchema } from '../schemas'
import { textLogo } from "../assets/icons"
import { useState } from "react"

const LogIn = ({ setSignUpOrIn }) => {
    const [wrongCredentials, setWrongCredentials] = useState(false)

    const onSubmit = (values, actions) => {
        setWrongCredentials(false)
        console.log('form submited')
        fetch(`http://localhost:5000/auth/login?login=${encodeURIComponent(values.username)}&password=${encodeURIComponent(values.password)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            // Handle the response data
            console.log(data);
            location.reload()
        }).catch(error => {
            // Handle errors
            setWrongCredentials(true)
            console.error('Error:', error.message);
        });

        actions.resetForm()
    }

    const { values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: signInSchema,
        onSubmit
    })
  return (
      <div className="relative px-[30px] pb-[30px] bg-black border-white border rounded-sm px-[10px] w-[80%] z-20 w-[95%] md:w-80% max-w-[500px] flex flex-col justify-center">
          <div className="py-[35px]">
              <img src={textLogo} className='max-h-[45px] mx-auto' alt="" />
          </div>
          <form action="" onSubmit={handleSubmit} className=''>
              {wrongCredentials && <p className=' text-red-600 block text-sm' >Wrong login or password.</p>}
              <label htmlFor="username">Email/username</label>
              <input
                  type="text"
                  placeholder='Email or username'
                  className={errors.username && touched.username ? "input-error" : "input-pirimary"}
                  id='username'
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
              />
              {errors.username && touched.username && <p className='text-sm text-red-600' >{errors.username}</p>}
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
              <button disabled={isSubmitting} type='submit' className='button-primary mt-[40px]'>Log in</button>
          </form>
          <div className="text-center text-lg py-[30px] h-[40px]">
              <p >Don't have an account?
                  <span
                      className='underline cursor-pointer 
                      text-dark-blue hover:text-blue
                       ease-linear duration-75'
                    onClick={()=>(setSignUpOrIn(false))}
                  >Sign up</span>
              </p>
          </div>
      </div>
  )
}

export default LogIn
