import React, {Component} from 'react';


class Description extends Component{


    render(){
        return(
            <p>Description: {this.props.descriptionText}</p>
        )
        
    }
}

export {Description};