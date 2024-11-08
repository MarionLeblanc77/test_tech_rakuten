import './App.css';
import ProductDetailPage from '../ProductDetailPage/ProductDetailPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  const productId = 13060247469;
  
  return (
    <div className="App">
      <Header/>
      {productId && (
        <ProductDetailPage productId={productId}/>
      )} 
      <Footer/>
    </div>
  );
}

export default App;
