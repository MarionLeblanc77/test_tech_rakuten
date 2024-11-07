import { useEffect } from 'react';
import './ProductDetailPage.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import Review from './Review/Review';
import getProductDetails from '../../store/middlewares/getProductDetails';
import { CircularProgress, Rating } from '@mui/material';

interface ProductDetailPageProps {
  productId: number
}

function ProductDetailPage({productId}: ProductDetailPageProps) {
  const dispatch = useAppDispatch();

  const productDetails = useAppSelector(
    (state)=> state.productReducer.productDetails
  );

  console.log(productDetails);
  
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch]);
  
  return (
    <div className="productDetailPage">
      {productDetails ? (
        <div>
          <img src={productDetails.data.images[0].imagesUrls.entry[0].url} alt="" />
          {/* {productDetails.data.images.map((image:any)=> (
            <div key={image.id}>
              <img src={image.imagesUrls.entry[0].url} alt="" />
            </div> */}
          {/* ))} */}
          {productDetails.data.headline}
          {productDetails.data.priceList}
          <div 
            dangerouslySetInnerHTML={{__html: productDetails.data.description}}/>
          <Rating name="read-only" value={productDetails.data.globalRating.score} precision={0.5} readOnly />   
          {productDetails.data.globalRating.score}
          {productDetails.data.breadcrumbs.map((breadcrumb:any)=>(
            <div>{breadcrumb.label}</div>)
          )}
        </div>
      ) : (
      <CircularProgress />
    )}
      <Review productReviews = {productDetails.data.reviews}/>
    </div>
  );
}

export default ProductDetailPage;
