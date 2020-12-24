import React, {Component} from 'react';
import {Name} from './Name';
import { Description } from "./Description";
import { Price } from "./Homework_7/Price";

class Product extends Component{

    render(){
        return(
            <div>
            <Name name = {this.props.name}/>
            <Description descriptionText = {this.props.descriptionText} />
            <Price amount = {this.props.amount} />
            </div>
        )
    }
}


export {Product};