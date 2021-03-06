import React, { PureComponent } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask' 
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal';
import { connect } from 'react-redux';
import { getTasks, deleteTask, deleteTasks,editTask,addTask } from '../../../store/actions';



//OLD TODO VERSION

class ToDo extends PureComponent{

    state = {
        inputValue: "",
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        openNewTaskModal:false,
        openEdit:false,
        taskToBeEdited:null
    }


handleChange = (event) => {
 this.setState({
    inputValue: event.target.value
}
);
};

handleClick = (tempTask) => {
this.props.addTask(tempTask)
            }

componentDidMount(){
    this.props.getTasks();
}

removeTask = (taskId) => {
     this.props.deleteTask(taskId)
    };

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
    const { selectedTasks } = this.state;
        this.props.deleteTasks(selectedTasks);

};

handleKeyDown = (e) =>{
    if(e.key === "Enter"){
        this.handleClick();
    }
}

toggleConfirm = () => {
    this.setState({
        showConfirm: !this.state.showConfirm
    });
};

openCloseNewTaskModal = () =>{
this.setState({
    openNewTaskModal: !this.state.openNewTaskModal
})
}

onOpenEdit = (taskToBeEdited) =>{

this.setState({
    openEdit: !this.state.openEdit,
    taskToBeEdited
})
}

confirmEditedTask = (editedTask) => {
   this.props.editedTask(editedTask)
};


    
render(){
    const tasks = this.state.tasks.map((t) => {
        return (
            <Col 
            key = {t._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            >
            <Task task = {t}
            onOpenEdit = {this.onOpenEdit}
            onSelect = {this.selectTask}
            selectedTasks = {this.state.selectedTasks}
            deleteTask = {this.removeTask}
            />
            </Col>
        )
    })
        return(
            <div>
            <Container>
             <Row>   
             <Col>
             <Button
             className = "mb-2"
                 variant="success"
                 onClick={this.openCloseNewTaskModal}
             >
                 Add  Task
           </Button>
         </Col>
             </Row>
             
             <Row>
             {tasks}
             </Row>

             <Row>
             <Button 
             variant="danger" 
             onClick = {this.toggleConfirm} 
             disabled = {this.state.selectedTasks.size === 0}
             > 
             Delete Selected
             </Button>
             </Row>
            
             </Container>
             {this.state.showConfirm &&
                <Confirm
                    onClose={this.toggleConfirm}
                    onConfirm={this.deleteSelected}
                    count={this.state.selectedTasks.size}
                />
            }
            
            {this.state.openNewTaskModal &&
            <NewTask
              onClose = {this.openCloseNewTaskModal}
              addTask = {this.handleClick}
            /> }

            {this.state.openEdit &&
            <EditTaskModal
            task = {this.state.taskToBeEdited}
            onClose = {this.onOpenEdit}
            onConfirm = {this.confirmEditedTask}
            
        />}
            </div>

        )
        }
    }
    const mapStateToProps = (state) => {
        return {
            tasks: state.tasks,
            addTaskSuccess: state.addTaskSuccess,
            deleteTasksSuccess: state.deleteTasksSuccess,
            editTasksSuccess: state.editTasksSuccess
        };
    };
    
    const mapDispatchToProps = {
        getTasks,
        deleteTask,
        deleteTasks,
        addTask,
        editTask
    };
    
    export default connect(mapStateToProps, mapDispatchToProps)(ToDo);