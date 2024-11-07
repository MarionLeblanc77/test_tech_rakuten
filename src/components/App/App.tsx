import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import getProductDetails from '../../store/middlewares/getProductDetails';
import Review from '../Review/Review';

function App() {
  const dispatch = useAppDispatch();
  const id = 13060247469;

  const test = useAppSelector((state)=> state.productReducer.productData);
  console.log (test);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch]);
  
  return (
    <div className="App">
      {test ? ( <div> {test.data.headline} </div>) : (<> Oups </>)} 
      <Review/>
    </div>
  );
}

export default App;
