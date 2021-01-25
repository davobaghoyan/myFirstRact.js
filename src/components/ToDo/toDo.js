import React, { PureComponent } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask' 
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal';

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
  
this.setState({
    tasks: [...this.state.tasks, tempTask],
    openNewTaskModal:false
})

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
        selectedTasks: new Set(),
        showConfirm:!this.state.showConfirm
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

confirmEditedTask = (taskToBeEdited) => {
    const tasks = [...this.state.tasks];
    const foundIndex = tasks.findIndex((task)=> task.id === taskToBeEdited.id);
    tasks[foundIndex] = taskToBeEdited;
    this.setState({
        tasks,
        taskToBeEdited: null,
        openEdit:false
    })

}

    
render(){
    const tasks = this.state.tasks.map((t) => {
        return (
            <Col 
            key = {t.id}
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


export {ToDo};