import React, { PureComponent } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import Task from '../../Task/Task';
import NewTask from '../../NewTask/NewTask' 
import Confirm from '../../Confirm';
import EditTaskModal from '../../EditTaskModal';
import {getTasks,deleteTask,deleteTasks} from '../../../store/actions'
import {connect} from 'react-redux';
import Search from '../../Search/Search';

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



componentDidMount(){
   this.props.getTasks()

}

componentDidUpdate(prevProps) {
    if (!prevProps.opendAddTask && this.props.opendAddTask){
        this.setState({
            openNewTaskModal: false
        });
        return;
    }

    if (!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess){
        this.setState({
            selectedTasks: new Set(),
            showConfirm: false
        });
        return;
    }
    if (!prevProps.editTasksSuccess && this.props.editTasksSuccess){
        this.setState({
            openEdit:false
        });
        return;
    }
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


render(){
    const tasks = this.props.tasks.map((t) => {
        return (
            <Col 
            key = {t._id}
            xs={10}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            >
            <Task task = {t}
            onOpenEdit = {this.onOpenEdit}
            onSelect = {this.selectTask}
            selectedTasks = {this.state.selectedTasks}
            deleteTask = {this.props.deleteTask}
            />
            </Col>
        )
    })
        return(
            <div>
            <Container>
            <Row>
            <Search/>
            </Row>
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
                    onConfirm={() => this.props.deleteTasks(this.state.selectedTasks)}
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
        />}
            </div>

        )
        }
    }

    const mapStateToProps = (state) =>{
        return {
            opendAddTask: state.addTaskSuccess,
            deleteTasksSuccess:state.deleteTasksSuccess,
            editTasksSuccess: state.editTasksSuccess,
            tasks:state.tasks
        }
    }

    const mapDispatchToProps = {
        getTasks,
        deleteTask,
        deleteTasks
    }

    export default connect(mapStateToProps,mapDispatchToProps)(ToDo)
