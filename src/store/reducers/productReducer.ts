import { createReducer } from "@reduxjs/toolkit";
import getProductDetails from "../middlewares/getProductDetails";

interface IProductState {
    productDetails: any;
    errorMsg: string[];
    loading: boolean
  }
const initialState : IProductState= {
    productDetails: undefined,
    errorMsg: [],
    loading: false,
  };
  
  const productReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(getProductDetails.pending, (state, action) => {
      console.log('Action getProductDetails pending');
      state.errorMsg=[];
      state.loading = true;
    })
    .addCase(getProductDetails.fulfilled, (state, action) => {
      console.log('Action getProductDetails fullfilled');
      console.log(action.payload);
      if (action.payload.status === 200) {
        state.productDetails = action.payload;
      }
      else {
        state.errorMsg[0]="Désolée nous n'arrivons pas à trouver ce produit."
      }
      state.loading = false;
    })
    .addCase(getProductDetails.rejected, (state, action) => {
      console.log('Action getProductDetails rejected');
      state.errorMsg[0]="Désolée nous n'arrivons pas à trouver ce produit."
      state.loading = false;
    });
  });
  
  export default productReducer;