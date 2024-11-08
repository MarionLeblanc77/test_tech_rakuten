import { Card, CardContent, Typography } from '@mui/material';
import './Review.css';

interface ReviewProps {
  review: {
    author : {
      firstName: string;
      isPreOrderGrant:false;
      isUserBuyer:false;
      login:string;
      userBirthDate: number };
    date : number;
    description: string;
    feedbackNegativeCount : number;
    feedbackPositiveCount: number;
    id: string;
    note:number;
    title: string
  }
}

function Review({review}: ReviewProps) {

  return (
        <div className="review" id={review.id}>
          <Card>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {review.author.firstName}
              </Typography >
              <Typography variant="h5" component="div">
                {review.note}
              </Typography>
              <Typography variant="body2">
                <div dangerouslySetInnerHTML={{__html: review.description}}/>
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
  ;


export default Review;
