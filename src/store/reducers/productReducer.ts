import { createReducer } from "@reduxjs/toolkit";
import getProductDetails from "../middlewares/getProductDetails";

interface IProductState {
    productDetails: any;
    errorMsg: string[];
    okMsg: string[]
  }
const initialState : IProductState= {
    productDetails: undefined,
    errorMsg: [],
    okMsg: ['Coucou'],
  };
  
  const productReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log('Action getProductDetails fullfilled');
        state.productDetails = action.payload;
      });
  });
  
  export default productReducer;