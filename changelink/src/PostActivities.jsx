import React from 'react'
import { useState } from 'react';

const PostActivities = () => {
    const [comment, setComment] = useState('')

    const handleLike = () => {
        fetch('http://localhost:5000/post/like', {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'postId': 1 })
        }).then((response) => {
            if (!response.ok) {
                console.log('Like was created');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleSave = () => {
        fetch('http://localhost:5000/post/save', {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'postId': 1 })
        }).then((response) => {
            if (!response.ok) {
                console.log('Save was created/deleted');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleCreateComment = (e) => {
        e.preventDefault()

        fetch('http://localhost:5000/post/comment', {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'postId': 1, 'comment': comment })
        }).then((response) => {
            if (!response.ok) {
                console.log('Save was created/deleted');
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    const handleDeleteComment = () => {
        fetch('http://localhost:5000/post/deleteComment', {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'id': 2, })
        }).then((response) => {
            if (!response.ok) {
                console.log('Comment deleted');
            }
        }).catch((err) => {
            console.log(err);
        });
    } 

    const handleSubscribe = () => {
        fetch('http://localhost:5000/user/subscribe', {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'idCreator': 1 })
        }).then((response) => {
            if (!response.ok) {
                console.log('Comment deleted');
            }
        }).catch((err) => {
            console.log(err);
        });
    }



  return (
    <div>
        <button onClick={handleLike}>Like</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDeleteComment}>DeleteComment</button>

        <form action="" onSubmit={handleCreateComment}>
            <input type="text" value={comment} onChange={e=>setComment(e.target.value)}/>
            <button type='submit' >Comment</button>
        </form>
        
        <p></p>
        <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  )
}

export default PostActivities
