import React, {PureComponent} from 'react';
import {Card, Button} from 'react-bootstrap';
import mystyles from './taskStyle.module.css';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'


class Task extends PureComponent{



    render(){
       const {task,onSelect,selectedTasks,deleteTask,onOpenEdit} = this.props
        return(
            <Card className = {mystyles.task}>
             <input type = "checkbox" onClick = {() => onSelect(task.id)}/>
              <Card.Body>
               <Card.Title>{task.title}</Card.Title>
               <Card.Text>
                {task.description}
               </Card.Text>
               
               <Button disabled = {!!selectedTasks.size} variant="outline-danger" onClick = {() => deleteTask(task.id)}>
               <FontAwesomeIcon icon = {faTrashAlt}/>
               </Button>
               
               <Button  className = "m-2" variant="outline-warning" onClick = {() => onOpenEdit(task)}>
               <FontAwesomeIcon icon = {faUserEdit}/>
               </Button>
             </Card.Body>
            </Card>   
        )
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedTasks: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired 
}

export default Task;