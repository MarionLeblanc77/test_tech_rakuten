import './Review.css';

interface ReviewProps {
  productReviews: []
}

function Review({productReviews}: ReviewProps) {

  return (
    <div className="Review">
      {productReviews.map((review)=> (
        <div>
          {/* {review} */}
        </div>
      ))}
    </div>
  );
}

export default Review;
