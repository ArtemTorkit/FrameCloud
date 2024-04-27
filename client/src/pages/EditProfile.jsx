import { useEffect, useState } from 'react'
import { useFormik } from "formik"
import { editProfileSchema } from '../schemas';
import { user } from '../assets/icons';
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const [imageB64, setImageB64] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const navigate = useNavigate()
  function convertToBase64(url, callback) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      var dataURL = canvas.toDataURL('image/jpeg');
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
  }

  useEffect(() => {
    fetch('http://localhost:5000/auth/getUserInfo', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        setUserData({});
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }).then((data) => {
      setUserData(data);
      console.log(data);
      setFieldValue('username', data.username);
      setFieldValue('birthday', data.birthday);
      setFieldValue('biography', data.biography);
      setFieldValue('hometown', data.hometown);
      setFieldValue('relations', data.relationships);
      setFieldValue('languages', data.languages);

      console.log(data.img)
      // Convert image URL to base64 and set the state
      if (data.img) {
        
        convertToBase64(data.img, (base64Img) => {
          setImageB64(base64Img);
        });
      }
    }).catch(error => {
      console.error('Error fetching user information:', error);
    });
  }, []);



  const onSubmit = (values, actions) => {
    console.log('form submitted: ', {
      image: imageB64,
      username: values.username,
      birthday: values.birthday,
      biography: values.biography,
      hometown: values.hometown,
      relations: values.relations,
      languages: values.languages,
    })
    fetch('http://localhost:5000/user/edit-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        image: imageB64,
        username: values.username,
        birthday: values.birthday,
        biography: values.biography,
        hometown: values.hometown,
        relations: values.relations,
        languages: values.languages,
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }).then((data) => {
      setIsUpdated(true)

      navigate('/profile')
      actions.resetForm();
    }).catch(error => {
      console.error('Error fetching user information:', error);
    });
  }

  const { setFieldValue, values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      image: "",
      username: "",
      birthday: "",
      biography: "",
      hometown: "",
      relations: "",
      languages: "",
    },
    validationSchema: editProfileSchema,
    onSubmit
  })


  const handleConvertImage = (e) => {
      const file = e.target.files[0];
      if (!file) {
        console.error("No file selected.");
        return;
    }
    setFieldValue('image', file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageB64(reader.result);
      }
  };

  return (
    <div>
      <h2 className="text-2xl py-4">Edit profile</h2>
      {isUpdated &&
        <p className="text-sm text-blue">
          Your data is updated, please log out and log in to view changes.
        </p>
      }
      <img src={imageB64 || user} className='rounded-md max-h-[200px]' alt="" />
      <form action="" onSubmit={handleSubmit} className=''>
        <label htmlFor="image" >Change image</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .svg"
          placeholder="Image"
          className={errors.image && touched.image ? "input-error" : "input-pirimary"}
          id="image"
          onChange={(e) => {
            handleConvertImage(e)
          }}
          onBlur={handleBlur}
          multiple
        />
        {errors.image && touched.image && (
          <p className="text-sm text-red-600">{errors.image}</p>
        )}
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
        {errors.username && touched.username && (
          <p className="text-sm text-red-600">{errors.username}</p>
        )}
        <label htmlFor="biography" >Biography</label>
        <textarea
          type="text"
          placeholder='Biography'
          className={errors.biography && touched.biography ? "input-error" : "input-pirimary"}
          id='biography'
          value={values.biography}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.biography && touched.biography && (
          <p className="text-sm text-red-600">{errors.biography}</p>
        )}
        <label htmlFor="biography" >Birthday</label>
        <input
          type="text"
          placeholder='Birthday'
          className={errors.birthday && touched.birthday ? "input-error" : "input-pirimary"}
          id='birthday'
          value={values.birthday}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.birthday && touched.birthday && (
          <p className="text-sm text-red-600">{errors.birthday}</p>
        )}
        <label htmlFor="hometown" >Hometown</label>
        <input
          type="text"
          placeholder='hometown'
          className={errors.hometown && touched.hometown ? "input-error" : "input-pirimary"}
          id='hometown'
          value={values.hometown}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.hometown && touched.hometown && (
          <p className="text-sm text-red-600">{errors.hometown}</p>
        )}
        <label htmlFor="relations" >Relationships</label>
        <input
          type="text"
          placeholder='relations'
          className={errors.relations && touched.relations ? "input-error" : "input-pirimary"}
          id='relations'
          value={values.relations}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.relations && touched.relations && (
          <p className="text-sm text-red-600">{errors.relations}</p>
        )}
        <label htmlFor="languages" >Languages</label>
        <input
          type="text"
          placeholder='languages'
          className={errors.languages && touched.languages ? "input-error" : "input-pirimary"}
          id='languages'
          value={values.languages}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.languages && touched.languages && (
          <p className="text-sm text-red-600">{errors.languages}</p>
        )}
        <button disabled={isSubmitting} type="submit" className="button-primary mt-[20px]">Submit</button>

        </form>
    </div>
  )
}

export default EditProfile
