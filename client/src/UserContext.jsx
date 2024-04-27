import { createContext, useEffect, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/auth/getUserInfo', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                setUserData({})
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        }).then((data) => {
            setIsLogged(true)
            console.log('User logged: ', data)
            setUserData(data)
        })
        fetch('http://projekt-aa.wit.pansjar.eu/test', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                setUserData({})
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        }).then((data) => {
            console.log('Server is working properly: ', data)
        })
    }, []);

    return (
        <UserContext.Provider value={{ isLogged, userData }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;