// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layouts/Layout';
import {
  Main,
  Profile,
  Explore,
  Saved,
  CreatePost,
  EditPost,
  Apps,
  EditProfile,
} from './pages';
import UserContext, { UserProvider } from './UserContext';
import ProfileGuest from './pages/ProfileGuest';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:postId/:creatorId" element={<EditPost />} />
            <Route path="/applications" element={<Apps />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/profile-guest/:idUser" element={<ProfileGuest />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
