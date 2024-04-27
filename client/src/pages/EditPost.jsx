import { useFormik } from "formik"
import { postSchema } from "../schemas";
import { useState, useEffect } from "react";
import { deleteIcon } from "../assets/icons"
import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
  const [base64Images, setBase64Images] = useState([]);
  const [music64, setMusic64] = useState('');
  const [somethingWrong, setSomethingWrong] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [postData, setPostData] = useState({})

  const navigate = useNavigate();

  const { postId, creatorId } = useParams()

  
  
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
    console.log('useEffect');

    //get the 
    console.log(postId, creatorId);

    fetch('http://localhost:5000/post/get-postdata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ postId })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(async data => {
      console.log(data.postData);
      setPostData(data.postData);
      setSomethingWrong(false);
      setIsLoading(true);

      // Convert each image URL to base64
      const promises = JSON.parse(data.postData.imageUrl).map(link => {
        return new Promise((resolve, reject) => {
          convertToBase64(link, (base64Img) => {
            resolve(base64Img);
          });
        });
      });

      // Wait for all promises to resolve
      Promise.all(promises)
        .then(base64Images => {
          setBase64Images(base64Images);
          setFieldValue('description', data.postData.description);
        })
        .catch(error => {
          console.error('Error converting images to base64:', error);
          setSomethingWrong(true);
          setIsLoading(true);
        });
    }).catch(error => {
      console.error('Error:', error);
      setSomethingWrong(true);
      setIsLoading(true);
    });
  }, []);


  const onSubmit = (values, actions) => {
    console.log('images: ', base64Images)
    console.log('music: ', music64)
    console.log('description: ', values.description)

    const updatedPost = {
      images: base64Images,
      music: music64,
      description: values.description
    };
    const oldPost = postData;

    fetch('http://localhost:5000/post/edit-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({updatedPost, oldPost})
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
      .then(data => {
        console.log(data.message); 
        
        setBase64Images([]);
        setMusic64('');
        navigate('/')
        actions.resetForm();
      })
      .catch(error => {
        actions.resetForm();
        console.error('Error:', error);
        setSomethingWrong(true);
      });
  }

  const deleteImage = (index) => {
    console.log('deleting index: ', index);

    const updatedBase64Images = base64Images.filter((_, i) => i !== index);

    // Update state with the new arrays
    setBase64Images(updatedBase64Images);
  }

  const handleChangingImages = (e) => {
    setFieldValue('images', e.target.files[0]);
  };

  const handleConvertImage = (e) => {
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

  const { setFieldValue, values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      images: [],
      description: "",
      music: ""
    },
    validationSchema: postSchema,
    onSubmit
  })

  return (
    <div>
      <h2 className=" mt-[23px] text-3xl font-bold">Edit post</h2>
      <form action="" onSubmit={handleSubmit}>
        {base64Images.length !== 0 && (
          <div className="flex flex-col lg:flex-row lg:h-[400px] mt-[30px] gap-2 rounded-md border border-white ">
            {base64Images.map((image, index) => (
              <div className="h-[200px] lg:h-full w-full relative top-0 left-0" key={index}>
                <div className="absolute top-0 left-0 h-full w-full
                flex justify-center items-center bg-[rgba(0,0,0,0.16)]
                opacity-0 hover:opacity-100 transition cursor-pointer" onClick={() => deleteImage(index)}>
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
        <label htmlFor="images" className=" block mt-[20px]">Add image (jpg, png, jpeg, svg)</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .svg"
          placeholder="Images"
          className={errors.images && touched.images ? "input-error" : "input-pirimary"}
          id="images"
          onChange={(e) => {
            handleChangingImages(e)
            handleConvertImage(e)
          }}
          onBlur={handleBlur}
          multiple
        />
        {errors.images && touched.images && (
          <p className="text-sm text-red-600">{errors.images}</p>
        )}

        <label htmlFor="music" className=" block mt-[20px]">Add / change music. (mp3)</label>
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
