import React from 'react'

const GetUsers = () => {
    const handleGetUsers = () => {
        fetch('http://localhost:5000/post/get-users', {
            method: 'POST',
            credentials: 'include',
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Помилка:', error));
    }

    const handleGetUserPost = () => {
        fetch('http://localhost:5000/post-fetching/user-post', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'id': 1})
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Помилка:', error));
    }
  return (
      <div>
          <p></p>
          <button onClick={handleGetUsers}>GetUsers</button>
          <p></p>
        <button onClick={handleGetUserPost}>GetUserPosts</button>
    </div>
  )
}

export default GetUsers
