import { useFormik } from "formik"
import { postSchema } from "../schemas";
import { useState } from "react";
import { deleteIcon } from "../assets/icons"
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  // const [imageFiles, setImageFiles] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [music64, setMusic64] = useState('');
  const [somethingWrong, setSomethingWrong] = useState(false)

  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    console.log('images: ', base64Images)
    console.log('music: ', music64)
    console.log('description: ', values.description)

    const postData = {
      images: base64Images,
      music: music64,
      description: values.description
    };

    fetch('http://localhost:5000/post/createPost', {
      method: 'POST',
      headers: {  'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(postData)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setBase64Images([])
      // setImageFiles([])
      setMusic64('')
      actions.resetForm();
      navigate("/");
    })
      .catch(error => {
        console.error('Error:', error);
        setSomethingWrong(true);
      });
  }

  const handleConvert = (e) => {
      if (base64Images.length < 5) {
        const file = e.target.files[0];

        if (!file) {
          console.error("No file selected.");
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setBase64Images(prev => [...prev, reader.result]);
        }
        
      }
  };

  const { setFieldValue, values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      images: [],
      description: "",
      music: ""
    },
    validationSchema: postSchema,
    onSubmit
  })

  const deleteImage = (index) => {
    console.log('deleting index: ', index);

    const updatedBase64Images = base64Images.filter((_, i) => i !== index);

    // Update state with the new arrays
    setBase64Images(updatedBase64Images);
    
  }

  const handleChanging = (e) => {
    setFieldValue('images', e.target.files[0]);
  };

  const handleConvertMusic = (e) => {
    const file = e.target.files[0]; // Get the selected file

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMusic64(reader.result)
    }
  };


  return (
    <div>
      <h2 className=" mt-[23px] text-3xl font-bold">Add post</h2>
      <form action="" onSubmit={handleSubmit}>
        {base64Images.length !== 0 && (
          <div className="flex flex-col lg:flex-row lg:h-[400px] mt-[30px] gap-2 rounded-md border border-white ">
            {base64Images.map((image, index) => (
            <div className="h-[200px] lg:h-full w-full relative top-0 left-0" key={index}>
              <div className="absolute top-0 left-0 h-full w-full
                flex justify-center items-center bg-[rgba(0,0,0,0.16)]
                opacity-0 hover:opacity-100 transition cursor-pointer" onClick={()=>deleteImage(index)}>
                <img src={deleteIcon} alt="" />
              </div>
            <img className="h-full w-full object-cover object-center" src={image} alt="" />
          </div>
          ))}
        </div>
        )}
        {somethingWrong &&
          <p className="text-sm text-red-600">
            Something went wrong.
          </p>
        }
        <label htmlFor="images" className=" block mt-[20px]">Select image (jpg, png, jpeg, svg)</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .svg"
          placeholder="Images"
          className={errors.images && touched.images ? "input-error" : "input-pirimary"}
          id="images"
          onChange={(e) => {
            handleChanging(e)
            handleConvert(e)
          }}
          onBlur={handleBlur}
          multiple
        />
        {errors.images && touched.images && (
          <p className="text-sm text-red-600">{errors.images}</p>
        )}
        
        <label htmlFor="music" className=" block mt-[20px]">Select music. (mp3)</label>
        <input
          type="file"
          accept=".mp3"
          placeholder='Music'
          className={errors.music && touched.music ? "input-error" : "input-pirimary"}
          id='music'
          
          onChange={(e) => handleConvertMusic(e)}
          onBlur={handleBlur}
        />
        {errors.music && touched.music && <p className='text-sm text-red-600' >{errors.music}</p>}
        
        <label htmlFor="description" className=" block mt-[20px]" >Description</label>
        <textarea
          type="text"
          placeholder='Description'
          className={errors.description && touched.description ? "input-error" : "input-pirimary"}
          id='description'
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.description && touched.description && <p className='text-sm text-red-600' >{errors.description}</p>}
        <button disabled={isSubmitting} type="submit" className="button-primary mt-[20px]">Submit</button>
      </form>
    </div>
  )
}

export default CreatePost
