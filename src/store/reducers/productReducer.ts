import { createReducer } from "@reduxjs/toolkit";
import getProductDetails from "../middlewares/getProductDetails";

interface IProductState {
    productData: any;
    errorMsg: string[];
    okMsg: string[]
  }
const initialState : IProductState= {
    productData: '',
    errorMsg: [],
    okMsg: ['Coucou'],
  };
  
  const productReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log('Action getProductDetails fullfilled');
        state.productData = action.payload;
      });
  });
  
  export default productReducer;