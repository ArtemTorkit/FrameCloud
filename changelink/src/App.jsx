import { useState } from 'react'
import { useEffect } from 'react';
import SendPost from './SendPost';

import './App.css'
import PostActivities from './PostActivities';
import InfiniteScrolling from './InfiniteScroll';
import GetUsers from './GetUsers';

function App() {
  // const [username, setUsername] = useState('');
  // const [login, setLogin] = useState('')
  // const [password, setPassword] = useState('')
  const [link, setLink] = useState('')
//   const handleLogin = (e) => {
//     e.preventDefault()
//     console.log('im fetching...')

//     fetch(`http://localhost:5000/auth/login?login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Handle the response data
//         console.log(data);
//         setUser(data)
//         setIsLogged(true)
//       })
//       .catch(error => {
//         // Handle errors
//         setIsLogged(false)
//         console.error('Error:', error.message);
//       });
//   }
//   const handleRegister = (e) => {
//     e.preventDefault()
//     console.log('im fetching...')

//     fetch(`http://localhost:5000/auth/register?login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(username)}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Handle the response data
//         console.log(data);
//         setUser(data);
//       })
//       .catch(error => {
//         // Handle errors
//         console.error('Error:', error.message);
//       });
//   }

//   const handleLogOut = () => {
//     fetch('http://localhost:5000/auth/logout', {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//     }).then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     }).then(data => { console.log(data) })
// }

//   // useEffect(() => {
//   //   fetch('http://localhost:5000/auth/getUserInfo', {
//   //     method: 'GET',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     credentials: 'include',
//   //   }).then((response) => {
//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! Status: ${response.status}`)
//   //     }
//   //     return response.json()
//   //   }).then((data) => {
//   //     console.log(data)
//   //   })
//   // }, [])
  
//   const handleCreatePost = (e) => {
//     e.preventDefault();

//     console.log(images)
//     const formData = new FormData();

//     formData.append('description', 'hello');
//     for (let i = 0; i < images.length; i++) {
//       formData.append('images', images[i]);
//     }
//     formData.append('music', music[0]);


//     console.log(formData)

//     fetch('http://localhost:5000/post/createPost', {
//       method: 'POST',
//       headers: {},
//       credentials: 'include',
//       body: formData
//     }).then(response => response.json())
//       .then(data => console.log(data))
//       .catch(error => console.error('Помилка:', error));

//   }

//   const handleSetImages = (e) => {
//     const file = e.target.files[0];
//     if (images.length <= 5) {
//       setImages(prev => [...prev, file]);
//     }
//     console.log(images)
//   };

//   // const handleSetMusic = (e) => {
//   //   const files = e.target.files;

//   //   if (files.length > 0) {
//   //     const file = files[0];
//   //     const reader = new FileReader();

//   //     reader.onloadend = () => {
//   //       const base64Music = reader.result;
//   //       setMusic(base64Music);
//   //       console.log(music)
//   //     };

//   //     reader.readAsDataURL(file);
//   //   }
//   // };

  const changeLink = () => {
    fetch('http://localhost:5000/user/change-link', {
          method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
        'Accept': 'application/json',
},
          credentials: 'include',
          body: JSON.stringify({link})
        }).then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Помилка:', error));
  }
    return (
      <div>
        <input type="text" onChange={e => setLink(e.target.value)} />
        <button onClick={changeLink}>ChangeLink</button>
      </div>
  )
}

export default App
