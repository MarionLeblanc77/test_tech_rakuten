import { useEffect } from 'react';
import './ProductDetailPage.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import Review from './Review/Review';
import getProductDetails from '../../store/middlewares/getProductDetails';
import { Alert, Breadcrumbs, CircularProgress, Rating } from '@mui/material';

interface ProductDetailPageProps {
  productId: number
}

function ProductDetailPage({productId}: ProductDetailPageProps) {
  const dispatch = useAppDispatch();


  const productDetails = useAppSelector(
    (state)=> state.productReducer.productDetails
  );
  const errorMsg = useAppSelector((state) => state.productReducer.errorMsg);
  const loading = useAppSelector((state) => state.productReducer.loading);
 
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, []);
  
  console.log(productDetails)

  return (
    <div className="productDetailPage">
      {loading && (
        <CircularProgress />
      )}
      {errorMsg.length === 1 && (
        <Alert severity="error"> {errorMsg} </Alert>
      )}
      {productDetails  && (
        <div className="productDetailPage__wrapper">
          <Breadcrumbs separator="›" aria-label="breadcrumb" className="productDetailPage__wrapper__breadcrumb">
            {productDetails.data.breadcrumbs.map((breadcrumb:any)=>(
            <div id={breadcrumb.url}>{breadcrumb.label}</div>)
          )}
          </Breadcrumbs>
          <div className="productDetailPage__wrapper__product">
            <div className="productDetailPage__wrapper__product__pictures">
              <img src={productDetails.data.images[0].imagesUrls.entry[1].url} alt=''/>
              {/* {productDetails.data.images.map((image:any)=> (
                <div key={image.id}>
                  <img src={image.imagesUrls.entry[0].url} alt="" />
                </div> */}
              {/* ))} */}
            </div>  
            <div className="productDetailPage__wrapper__product__infos">
                <h3>{productDetails.data.headline}</h3>
                <div className="productDetailPage__wrapper__product__infos__rating">
                  {productDetails.data.globalRating.score}
                  <Rating name="read-only" value={productDetails.data.globalRating.score} precision={0.5} readOnly />
                </div>

                <div dangerouslySetInnerHTML={{__html: productDetails.data.description}} /> 

                <p>{productDetails.data.priceList}€</p>
            </div>
          </div>
          <div className="productDetailPage__wrapper__reviews">
            {productDetails.data.reviews.map((review:any)=> (
              <Review review = {review}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
