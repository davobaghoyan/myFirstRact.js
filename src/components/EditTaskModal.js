import React, {PureComponent} from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import idGenerator from '../helpers/idGenerator';
import PropTypes from 'prop-types'; 

class EditTaskModal extends PureComponent{
    constructor(props){
        super(props);
    this.state = {
        title: props.task.title,
        description: props.task.description
    };
    }
    
    
    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    };

    handleSubmit = ()=>{
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }

        const newTask = {
            id: idGenerator(),
            title,
            description
        };

        this.props.addTask(newTask);
    };


    onSave = (t,d) =>{
    let editedTask = {
    id:this.props.task.id,
    title:t,
    description:d
}
this.props.onConfirm(editedTask)

    }

    render(){
        const {onClose} = this.props;
        const{title, description} = this.state;
        return(
            <div>
            <Modal
            show={true}
            onHide={onClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>
           Edit task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <FormControl
            name='title'
            value = {title}
            onKeyPress={this.handleKeyDown}
            onChange = {this.handleChange}
            className='mb-3'
          />
          <FormControl 
          value = {description}
          as="textarea" 
          rows={5} 
          name='description'
          onChange={this.handleChange}

          
          />

         </Modal.Body>
          <Modal.Footer>
            <Button 
            onClick={() => this.onSave(title,description)}
            variant='success'
            >
            Save
            </Button>
            
            <Button onClick={onClose}
            >
            Cancel
            </Button>
          
            </Modal.Footer>
        </Modal>
</div>
        );
    }
}
EditTaskModal.propTypes = {
    addTask : PropTypes.func.isRequired,
    onClose:PropTypes.func.isRequired
}

export default EditTaskModal;