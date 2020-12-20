import React, {Component} from 'react';
import {Name} from './Name';
import { Description } from "./Description";
import { Price } from "./Price";

class Product extends Component{

    render(){
        return(
            <div color = 'red'>
            <Name name = {this.props.name}/>
            <Description descriptionText = {this.props.descriptionText}/>
            <Price price = {this.props.price} />
            </div>
        )
    }
}


export {Product};