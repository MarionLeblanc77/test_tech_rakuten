import { Rating } from '@mui/material';
import './Review.css';
import { useAppSelector } from '../../store/hooks-redux';

function Review() {
    const productDetails = useAppSelector((state)=> state.productReducer.productData);

  return (
    <div className="Review">
        <Rating name="read-only" value={productDetails.data.globalRating.score} precision={0.5} readOnly />   
        {productDetails.data.globalRating.score}
    </div>
  );
}

export default Review;
