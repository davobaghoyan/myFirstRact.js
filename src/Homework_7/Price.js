import React, {Component} from 'react';


class Price extends Component{
    constructor(props){
super(props);
this.state = {
currency:  "$",
amount : props.amount

}
    }

handleCurrencyChange = () =>{
    let nextCurrency = this.state.currency === "$"? "֏" : "$";
    let nextAmount = nextCurrency === "$"?parseFloat(this.state.amount/522) : parseFloat(this.state.amount * 522);


    this.setState({
      currency: nextCurrency,
      amount: nextAmount
        }
        
    )
}

    render(){
        return(
            <>
            <p>Price: {this.state.amount} {this.state.currency}</p>
            <button onClick = {this.handleCurrencyChange} >Change currency</button>
            </>
        )
    }
}

export {Price};