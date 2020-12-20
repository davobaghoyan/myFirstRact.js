import './App.css';
import {Product} from './Product'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h3>Products</h3>
      <Product name = "Apple" 
      descriptionText = "Granny Smith" 
      price = {1899}/>
      <Product name = "Orange" 
      descriptionText = "Cara Cara" 
      price = {2999}/>
      </header>
    </div>
  );
}

export default App;
