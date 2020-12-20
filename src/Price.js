import React, {Component} from 'react';


class Price extends Component{

    render(){
        return(
            <p>Price: {this.props.price} AMD</p>
        )
    }
}

export {Price};