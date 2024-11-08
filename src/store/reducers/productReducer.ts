import { createAction, createReducer } from "@reduxjs/toolkit";
import getProductDetails from "../middlewares/getProductDetails";

// TODO : productDetails should be better type with a product.d.ts file in a folder @types
interface IProductState {
    productDetails: any;
    pictureZoom: {
      isPictureZoomOpen: boolean;
      currentPicture: string;
    };
    errorMsg: string[];
    loading: boolean
  }
const initialState : IProductState= {
    productDetails: undefined,
    pictureZoom: { isPictureZoomOpen: false, currentPicture: '' },
    errorMsg: [],
    loading: false,
  };

  
export const actionOpenPictureZoom = createAction<{ currentPicture: string }>(
  'app/OPEN_PICTUREZOOM'
);
export const actionClosePictureZoom = createAction('app/CLOSE_PICTUREZOOM');
  
  const productReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(getProductDetails.pending, (state, action) => {
      // Empty the messages if there was one from previous trial and turn loader true
      console.log('Action getProductDetails pending');
      state.errorMsg=[];
      state.loading = true;
    })
    .addCase(getProductDetails.fulfilled, (state, action) => {
      // Fill the data if the request is a success 200
      // Any other code generates an error message (to optimize with better error management in the back-end or more cases for different status)
      // Then stop the loader
      console.log('Action getProductDetails fullfilled');
      console.log(action.payload);
      if (action.payload.status === 200) {
        state.productDetails = action.payload;
      }
      else if (action.payload.status === 404) {
        state.errorMsg[0]="Désolée nous n'arrivons pas à trouver ce produit."
      }
      else {
        state.errorMsg[0]="Désolée, il y a eu une erreur."
      }
      state.loading = false;
    })
    .addCase(getProductDetails.rejected, (state, action) => {
      // Generates an error message and stop the loader
      console.log('Action getProductDetails rejected');
      state.errorMsg[0]="Désolée, il y a eu une erreur."
      state.loading = false;
    })
    .addCase(actionOpenPictureZoom, (state, action) => {
      state.pictureZoom.isPictureZoomOpen = true;
      state.pictureZoom.currentPicture = action.payload.currentPicture;
    })
    .addCase(actionClosePictureZoom, (state) => {
      state.pictureZoom.isPictureZoomOpen = false;
      state.pictureZoom.currentPicture = '';
    });
  });
  
  export default productReducer;