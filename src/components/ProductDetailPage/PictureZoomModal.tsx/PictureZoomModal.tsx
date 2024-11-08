import { useAppDispatch } from '../../../store/hooks-redux';
import { actionClosePictureZoom } from '../../../store/reducers/productReducer';
import './PictureZoomModal.css';
import {HighlightOffSharp} from '@mui/icons-material';

interface Props {
  picture: string;
}
function PictureZoom({ picture }: Props) {

  const dispatch = useAppDispatch();

  const handleCrossClick = () => {
    dispatch(actionClosePictureZoom());
  };
  return (
    <div className="picturezoom">
      <img
        className="picturezoom--picture"
        src={`${picture}`}
        alt="produit agrandit"
      />
      <button
        className="closingButton"
        type="button"
        onClick={handleCrossClick}
      >
        <HighlightOffSharp fontSize='large' sx={{color:'white'}}/>
      </button>
    </div>
  );
}

export default PictureZoom;
