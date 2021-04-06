import React, {Component} from 'react';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit,faCalendarCheck,faRedo } from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../../helpers/utils';
import EditTaskModal from '../../EditTaskModal';
import { connect } from 'react-redux';
import {getTask,deleteTask,editTask} from '../../../store/actions'

  class SingleTask extends Component{
    state={
        openEditModal: false
    };
 

    componentDidMount(){
        const taskId = this.props.match.params.taskId;
        this.props.getTask(taskId)
    }

    deleteTask = ()=>{
        const taskId = this.props.task._id;
        this.props.deleteTask(taskId,'single')
    }

    handleSaveTask = (editedTask)=>{
        
        this.props.editTask(editedTask,'single')
       this.setState({
           openEditModal:!this.props.editTasksSuccess
       })
    };

    toggleEditModal = ()=>{
        this.setState({
            openEditModal: !this.state.openEditModal
        });
    };

render(){
    const {openEditModal} = this.state;
    const {task} = this.props

    return(
     <div className='mt-5'>
     <Container >
     <Row >
     <Col xs={12}>
        {
            task ? 
            <Card className='text-center'>

            <Card.Body>
                <Card.Title>{task.title}</Card.Title>  
                <Card.Text>
                   Description: {task.description}
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
            onClick={() => this.props.editTask({
                status: 'done',
                _id: task._id
            },'single')}
        >
            <FontAwesomeIcon icon={faCalendarCheck} />
        </Button> :
        
        <Button
        className='m-1'
        variant="secondary"
        onClick={() => this.props.editTask({
            status: 'active',
            _id: task._id
        },'single')}
    >
        <FontAwesomeIcon icon={faRedo} />
    </Button>
            }
                <Button
                    className='m-1'
                    variant="warning"
                    onClick={this.toggleEditModal}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>

                <Button
                className='m-1'
                    variant="danger"
                    onClick={this.deleteTask}

                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>

            </Card.Body>
        </Card> :
            <p>Task data not exists!</p>
        }

        </Col>
        </Row>
        </Container>

        {
            openEditModal &&
            <EditTaskModal
            task={task}
            onClose={this.toggleEditModal}
            onConfirm={this.handleSaveTask}
            single = {true}
        />
        }
     </div>
    );
}


};

const mapStateToProps = (state) => {
return {
    editTasksSuccess:state.editTasksSuccess,
    task:state.task
}
}

const mapDispatchToProps = {
    editTask,
    getTask,
    deleteTask
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleTask)