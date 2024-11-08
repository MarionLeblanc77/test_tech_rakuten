import { useEffect } from 'react';
import './ProductDetailPage.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import Review from './Review/Review';
import getProductDetails from '../../store/middlewares/getProductDetails';
import { Alert, Box, Breadcrumbs, CircularProgress, ImageList, ImageListItem, Rating } from '@mui/material';

interface ProductDetailPageProps {
  productId: number
}

function ProductDetailPage({productId}: ProductDetailPageProps) {
  const dispatch = useAppDispatch();

  //Currently retrieving all the data 
  // TODO : BUT if productDetails was better type, maybe separate this component in several and get the right data there OR store bits of needed data in different variables
  const productDetails = useAppSelector(
    (state)=> state.productReducer.productDetails
  );

  // For managing error messages and loader
  const errorMsg = useAppSelector((state) => state.productReducer.errorMsg);
  const loading = useAppSelector((state) => state.productReducer.loading);
 
  // When the component does its first render, dispatch the action that retrieves and stores product data
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, []);
  
  // Just for the exercise to visualize the data
  console.log(productDetails)

  let priceList = 0;
  if (productDetails) {
    if (productDetails.data.priceList>productDetails.data.buybox.salePrice) {
      priceList = productDetails.data.priceList;
    }
  }

  return (
    <div className="productDetailPage">
      {loading && (
        <Box className='loader'>
          <CircularProgress />
        </Box>
      )}
      {errorMsg.length === 1 && (
        <Alert severity="error" className='error'> {errorMsg} </Alert>
      )}
      {productDetails && (
        <div className="productDetailPage__wrapper">
          <Breadcrumbs separator="›" aria-label="breadcrumb" className="productDetailPage__wrapper__breadcrumb">
            {productDetails.data.breadcrumbs.map((breadcrumb:any)=>(
            <div id={breadcrumb.url}>{breadcrumb.label}</div>)
          )}
          </Breadcrumbs>
          <div className="productDetailPage__wrapper__product">
            <div className="productDetailPage__wrapper__product__pictures">
              <Box sx={{ width:60, overflowY: 'scroll'}}>
                <ImageList 
                  variant="masonry"
                  gap={1} 
                  cols={1}
                >
                    {productDetails.data.images.map((image:any) => (
                      <ImageListItem key={image.id}>
                        <img
                          srcSet={`${image.imagesUrls.entry[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          src={`${image.imagesUrls.entry[0].url}?w=248&fit=crop&auto=format`}
                          alt=""
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                </ImageList>
              </Box>
              <img src={productDetails.data.images[0].imagesUrls.entry[1].url} alt=''/>
            </div>  
            <div className="productDetailPage__wrapper__product__infos">
                <h3>{productDetails.data.headline}</h3>
                <div className="productDetailPage__wrapper__product__infos__rating">
                  <div className='productDetailPage__wrapper__product__infos__rating__number'>
                    <p>{productDetails.data.globalRating.score}</p>
                    <span>/5</span>
                  </div>
                  <Rating name="read-only" value={productDetails.data.globalRating.score} precision={0.5} readOnly />
                </div>
                <div dangerouslySetInnerHTML={{__html: productDetails.data.description}} /> 
                <div className="productDetailPage__wrrapper__product__infos__price">
                  <p>{productDetails.data.buybox.salePrice}€</p>
                  {priceList && (
                    <span>{priceList}€</span>
                  )}
                </div>
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
