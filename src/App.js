import './App.css';
import {Product} from './Product'
import { ToDo } from './Homework_8/toDo';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <ToDo />
      <h3>Products</h3>
      <Product name = "Apple" 
      descriptionText = "Granny Smith" 
      amount = {2.9}/>
      <Product name = "Orange" 
      descriptionText = "Cara Cara" 
      amount = {4.2}/>
      </header>
    </div>
  );
}

export default App;
