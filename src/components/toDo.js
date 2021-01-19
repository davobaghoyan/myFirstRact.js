import React, { Component } from "react";
import { Container, Row, Col, Button, Card, FormControl} from "react-bootstrap";
import mystyles  from './todo.module.css';
import idGenerator from  '../helpers/idGenerator';


class ToDo extends Component{

    state = {
        inputValue: "",
        tasks: [],
        selectedTasks: new Set()
    }
handleChange = (event) => {
this.setState({
    inputValue: event.target.value
}
);
};

handleClick = () => {
    if(this.state.inputValue !== "")
    {
        let tempTask = {  
            id : idGenerator(),
            title: this.state.inputValue
        }
this.setState({
    tasks: [...this.state.tasks, tempTask],
    inputValue: ''
})
}
}

removeTask = (id) =>{
this.setState({
    tasks: this.state.tasks.filter(function(value, index, arr){ 
        return value.id !== id ;
})})
}

selectTask = (id) => {
    const selectedTasks = new Set(this.state.selectedTasks);
    if (selectedTasks.has(id)){
        selectedTasks.delete(id);
    }
    else{
        selectedTasks.add(id);
    }
    this.setState({
       selectedTasks
    })
}

deleteSelected = () => {
    const{selectedTasks, tasks} = this.state;
    this.setState({
        tasks: tasks.filter( function(value, index, arr) {
            return  !selectedTasks.has(value.id)
              }),
        selectedTasks: new Set()
})
}

handleKeyDown = (e) =>{
    if(e.key === "Enter"){
        this.handleClick();
    }
}

    
render(){
        return(
            <Container>
            <Row>
            <FormControl 
            className = "mb-2"
            placeholder = "Write description" 
            value = {this.state.inputValue} 
            onChange = {this.handleChange}
            onKeyDown = {this.handleKeyDown}
            disabled = {!!this.state.selectedTasks.size} />
            <Button 
            className = "mb-2"
            disabled = {!!this.state.selectedTasks.size} 
            style = {{backgroundColor:'green', color: 'white'}} 
            onClick = {this.handleClick}
            >
            Add Task
            </Button>
           </Row>             

             <Row>   
                 {this.state.tasks.map((item, index) => <Col xl = {2} lg = {3} md = {4} key = {item.id}>
             <Card className = {mystyles.task}>
             <input type = "checkbox" onClick = {() => this.selectTask(item.id)}/>
              <Card.Body>
               <Card.Title>Task #{index + 1}</Card.Title>
               <Card.Text>
                {item.title}
               </Card.Text>
               <Button disabled = {!!this.state.selectedTasks.size} variant="danger" onClick = {() => this.removeTask(item.id)}>Delete</Button>
             </Card.Body>
            </Card>             </Col>)} 
             </Row>
            
             <Row>
             <Button 
             variant="danger" 
             onClick = {this.deleteSelected} 
             disabled = {this.state.selectedTasks.size === 0}
             > 
             Delete Selected
             </Button>
             </Row>
            
             </Container>
        )
        }
    }


export {ToDo};