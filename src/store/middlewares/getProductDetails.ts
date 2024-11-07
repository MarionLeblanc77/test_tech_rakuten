import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getProductDetails = createAsyncThunk(
  'GET_PRODUCTS_DETAILS',
  async (id: number) => {
    const result = await axios.get(`https://rakuten-vis-internsip-test-api.koyeb.app/product/${id}`);
    return result.data;
  }
);

export default getProductDetails;
