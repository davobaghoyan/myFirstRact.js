import {checkLoginStatus} from '../helpers/storage';


const defaultState = { 
    task:null,
    tasks: [],
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    editTasksSuccess:false,
    loading:false,
    successMessage:'',
    errorMessage:'',
    isauthenticated:checkLoginStatus()
};


export default function reducer(state=defaultState, action){
    
    switch(action.type){
      case 'GET_TASKS':{
        return {
          ...state,
          tasks: action.tasks,
          loading:false
        };
      }
      case 'ADD_TASK':{
        return {
          ...state,
          tasks: [...state.tasks, action.task],
          addTaskSuccess: true,
          loading:false,
          successMessage:'Your task was created successfully!',
        };
      }
      case 'PENDING':{
        return {
          ...state,
          addTaskSuccess: false,
          deleteTasksSuccess: false,
          editTasksSuccess:false,
          loading:true,
          successMessage:'',
          errorMessage:''
        };
      }

      case 'ERROR':{
        return {
          ...state,
          errorMessage:action.message,
          loading:false
        };
      }


      case 'DELETE_TASK':{
        if(action.from === 'single'){
           return {
             ...state,
             task:null,
             loading:false,
             successMessage:'Task was deleted successfully!',

           }
        }
        const newTasks = state.tasks.filter((task) => action.taskId !== task._id);
        return {
          ...state,
          tasks: newTasks,
          loading:false,
          successMessage:'Task was deleted successfully!',
        };
      }

      case 'DELETE_TASKS':{

        const newTasks = state.tasks.filter((task) => {
          if (action.taskIds.has(task._id)) {
              return false;
          }
          return true;
      });

        return {
          ...state,
          tasks: newTasks,
          deleteTasksSuccess: true,
          loading:false,
          successMessage:'Tasks were deleted successfully!',
        };
      }

      case 'EDIT_TASK':{
        if(action.from === 'single'){
          return{
            ...state,
            task:action.editedTask,
            editTasksSuccess: true,
            loading:false,
            successMessage:'Task was edited successfully!',
           }
        }
    const tasks = [...state.tasks];
    const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id);
    tasks[foundIndex] = action.editedTask;
    return {
      ...state,
      tasks: tasks,
      editTasksSuccess: true,
      loading:false,
      successMessage:'Task was edited successfully!',
      };
      }
      case 'GET_TASK':{
        return {
          ...state,
          task:action.task,
          loading:false

        };
          }

          case 'REGISTER':{
            return {
              ...state,
              loading:false,
              successMessage:'Congratulations!!!! You were registered succesfully!'
    
            };
              }

              case 'LOGIN':{
                return {
                  ...state,
                  loading:false,
                  isauthenticated:true
        
                };
                  }

                  case 'LOGOUT':{
                    return {
                      ...state,
                      loading:false,
                      isauthenticated:false
            
                    };
                      }

    

      default: return state;
    }
    }