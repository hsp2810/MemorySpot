import React from 'react';
import Map from '../components/Map/Map.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionFtHUserMemories } from '../redux/actions/memoryActions.js';

const HomeP = () => {
  const navigate = useNavigate();
  const { isLogin, homeUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    } else {
      fetchHomeUserMemories();
    }
  }, []);

  const fetchHomeUserMemories = async () => {
    await actionFtHUserMemories(homeUser._id, dispatch);
  };

  return <>{isLogin && <Map />}</>;
};

export default HomeP;
