import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {
  LandingP,
  HomeP,
  LoginP,
  AboutP,
  MemoryBank,
  UserProfile,
  ContactP,
} from './pages';
import './assets/css/all.css';
import Admin from './pages/Admin';
import Sidebar from './components/Dashboard/LeftSideBar/FixedSidebar';
import { useDispatch, useSelector } from 'react-redux';
import EditUser from './components/Profile/User/EditUser';
import MyMemories from './pages/MyMemories';
import MemoryView from './pages/MemoryView';
import { authenticate } from './redux/actions/authActions';
import SocialMediaSettings from './pages/SocialMediaSettings';
import Friends from './pages/Friends';
import OtherUserProfile from './components/Search/OtherUserProfile';

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.auth);

  useEffect(() => {
    userAlreadyLogin();
  }, []);

  const userAlreadyLogin = async () => {
    // console.log(
    //   'Checking if the user is already login into the application or not'
    // );
    await authenticate(dispatch);
  };

  return (
    <>
      {isLogin && <Sidebar />}
      <Routes>
        <Route path="/" element={<LandingP />} />
        <Route path="/sign-on" element={<LoginP />} />
        <Route path="/about" element={<AboutP />} />
        <Route path="/contact" element={<ContactP />} />
        <Route path="/home" element={<HomeP />} />

        {/* Other user's profile */}
        <Route path="/users/:username" element={<OtherUserProfile />} />

        {/* Personal Profile */}
        <Route path="/home/profile" element={<UserProfile />} />
        <Route path="/home/profile/edit" element={<EditUser />} />
        <Route path="/home/mymemories" element={<MyMemories />} />
        <Route path="/home/memorybank" element={<MemoryBank />} />
        <Route path="/home/friends" element={<Friends />} />
        {/* Actual memory */}
        <Route path="/memories/:id/view" element={<MemoryView />} />
        {/* admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/settings" element={<SocialMediaSettings />} />
        <Route path="*" element={<>404 Error Page, Page not found. Thanks</>} />
      </Routes>
    </>
  );
}

export default App;
