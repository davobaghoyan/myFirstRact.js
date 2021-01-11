import React, { Component } from "react";
import { Container, Row, Col, Button,Form, Card} from "react-bootstrap";
import mystyles  from './todo.module.css';
import idGenerator from  '../helpers/idGenerator';


class ToDo extends Component{

    state = {
        inputValue: "",
        tasks: []
    }
handleChange = (event) => {
this.setState({
    inputValue: event.target.value
}
);
};

handleClick = () => {
    if(this.state.inputValue !== " ")
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

    
render(){
        return(
            <Container>
            <Row>
            <Form>
            <Form.Control placeholder = "Write description" type="text" value = {this.state.inputValue} onChange = {this.handleChange}/>
            </Form>
            <Button style = {{backgroundColor:'green', color: 'white'}} onClick = {this.handleClick}>Add Task</Button>
            </Row>
             <Row> 
             {this.state.tasks.map((item, index) => <Col xl = {2} lg = {3} md = {4} key = {item.id}>
             <Card className = {mystyles.task}>
             <Card.Body>
               <Card.Title>Task #{index + 1}</Card.Title>
               <Card.Text>
                {item.title}
               </Card.Text>
               <Button variant="danger" onClick = {() => this.removeTask(item.id)}>Delete</Button>
             </Card.Body>
           </Card>             </Col>)} 
             </Row>
            </Container>
        )
        }
    }


export {ToDo};