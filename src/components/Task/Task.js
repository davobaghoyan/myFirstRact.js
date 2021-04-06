import React, {PureComponent} from 'react';
import {Card, Button} from 'react-bootstrap';
import mystyles from './taskStyle.module.css';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faUserEdit,faRedo, faCalendarCheck} from '@fortawesome/free-solid-svg-icons'
import {formatDate,textTruncate} from '../../helpers/utils';
import {Link} from 'react-router-dom';
import {editTask} from '../../store/actions'
import {connect} from 'react-redux';

class Task extends PureComponent{



    render(){
       const {task,onSelect,selectedTasks,deleteTask,onOpenEdit} = this.props
        return(
            <Card className = {mystyles.task}>
             <input type = "checkbox" onClick = {() => onSelect(task._id)}/>
              <Card.Body>
              <Link to={`/task/${task._id}`}>
              <Card.Title>{textTruncate(task.title,20)}</Card.Title>
              </Link>
               <Card.Text>
               Description: {textTruncate(task.description,60)}
               </Card.Text>
               <Card.Text>
               Date: {formatDate(task.date)}
               </Card.Text>
               <Card.Text>
               Created at: {formatDate(task.created_at)}
               </Card.Text>
               {
                task.status==="active" ?
                                <Button
            className='m-1'
            variant="success"
            disabled={!!selectedTasks.size}
            onClick={() => this.props.editTask({
                status: 'done',
                _id: task._id
            })}
        >
            <FontAwesomeIcon icon={faCalendarCheck} />
        </Button> :
        
        <Button
        className='m-1'
        variant="secondary"
        disabled={!!selectedTasks.size}
        onClick={() => this.props.editTask({
            status: 'active',
            _id: task._id
        })}
    >
        <FontAwesomeIcon icon={faRedo} />
    </Button>
            }

               <Button 
               disabled = {!!selectedTasks.size} 
               variant="outline-danger" 
               onClick = {() => deleteTask(task._id)}>
               <FontAwesomeIcon icon = {faTrashAlt}/>
               </Button>
               
               <Button  
               className = "m-2" 
               variant="outline-warning" 
               onClick = {() => onOpenEdit(task)}>
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

const mapDispatchToProps = {
    editTask
};

export default connect(null, mapDispatchToProps)(Task);