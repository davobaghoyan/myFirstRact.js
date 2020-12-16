import logo from './logo.svg';
import './App.css';
import { Sum } from './sum';
import { NewYearCalculator } from './HappyNewYear';
import { Remainder } from './divisionRemainder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Sum a = {10} b = {82}/>
      <NewYearCalculator month = {10} day = {22}/>
      <Remainder x = {85} y = {11}/>
      </header>
    </div>
  );
}

export default App;
