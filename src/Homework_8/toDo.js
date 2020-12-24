import React, { Component } from "react";


class ToDo extends Component{

    state = {
        inputValue: " ",
        tasks: []
    }
handleChange = (event) => {
this.setState({
    inputValue: event.target.value
}
);
};

handleClick = () => {
this.setState({
    tasks: [...this.state.tasks, this.state.inputValue],
    inputValue: ' '
})
    
}
    
render(){
        return(
            <>
            <input value = {this.state.inputValue} type = "text" onChange = {this.handleChange}/>
            <button onClick = {this.handleClick}>Add</button>
          <ol>  {this.state.tasks.map((item, index) => <li key = {index}>{item}</li>)}</ol>
            </>
        )
        }
    }


export {ToDo};