import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { user } from '../assets/icons';
import UserContext from '../UserContext';

const UserBelt = ({ userInfo, index }) => {
    const { isLogged } = useContext(UserContext);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/check-if-subscribed', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: userInfo.id })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setIsSubscribed(data.length > 0);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        checkSubscription();
    }, [userInfo.id]);

    const handleSubscribe = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/subscribe', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idCreator: userInfo.id })
            });
            if (!response.ok) {
                throw new Error('Failed to subscribe');
            }
            setIsSubscribed(!isSubscribed);
        } catch (error) {
            console.error('Subscription error:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className='w-full flex items-center justify-between mt-[15px]' key={index}>
            <div className="">
                <Link to={`/profile-guest/${userInfo.id}`} className="block flex">
                    <img src={userInfo.img || user} className='rounded-full hover:border border-white w-[40px] h-[40px] object-cover object-cover' alt="" />
                    <div className="ml-[5px] hover:underline">@{userInfo.username}</div>
                </Link>
            </div>
            {error ? (
                    <></>
            ) : (        
            <div onClick={handleSubscribe} className={`bg-${isSubscribed ? 'dark-blue' : 'blue'} py-2 px-4 rounded-md font-bold text-sm cursor-pointer hover:bg-${isSubscribed ? 'blue' : 'dark-blue'} ease-linear duration-75`}>
                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </div>
            )}
        </div>
    );
};

export default UserBelt;
