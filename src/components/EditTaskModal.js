import React, {PureComponent, createRef} from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from '../helpers/utils';
import {editTask} from '../store/actions'
import { connect } from 'react-redux';

class EditTaskModal extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
        title: props.task.title,
        description: props.task.description,
        date: props.task.date ? new Date(props.task.date) : new Date(),
    };

    this.inputRef = createRef();
    }
    
    
    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };




    onSave = (title,description,date) =>{
      console.log(this.props.task._id)
    let editedTask = {
    _id:this.props.task._id,
    title:title,
    description:description,
    date: formatDate(date.toISOString())
}
if(this.props.single === true){
  console.log('sd')
  this.props.onConfirm(editedTask)
}
else{
this.props.editTask(editedTask)
}
    }

    handleChangeDate=(value)=>{
        this.setState({
          date: value || new Date()
        });
      };

      componentDidMount(){
        this.inputRef.current.focus();
    }

    render(){
        const {onClose} = this.props;
        const{title, description,date} = this.state;
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
            onChange = {this.handleChange}
            className='mb-3'
            ref = {this.inputRef}
          />
          <FormControl 
          value = {description}
          as="textarea" 
          rows={5} 
          name='description'
          onChange={this.handleChange}
         />

         <DatePicker 
          minDate = {new Date()}
          selected={this.state.date}
          onChange={this.handleChangeDate}
          />

         </Modal.Body>
          <Modal.Footer>
            <Button 
            onClick={() => this.onSave(title,description,date)}
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
    onClose:PropTypes.func.isRequired
}

const mapDispatchToProps = {
  editTask
}

export default connect(null,mapDispatchToProps)(EditTaskModal);