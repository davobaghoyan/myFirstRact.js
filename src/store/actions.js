import request from '../helpers/request';
import {history} from '../helpers/history'
import requestWithoutToken from '../helpers/storage';

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params = {}){
    const query = Object.entries(params).map(([key, value])=>`${key}=${value}`).join('&');
    return (dispatch)=>{
        dispatch({type: 'PENDING'});
        request(`${apiHost}/task?${query}`)
        .then((tasks)=>{
        dispatch({type: 'GET_TASKS', tasks: tasks});
        }).catch((error) => {
            dispatch({type:'ERROR',message:error.message})
        });;
    }
}

export function addTask(newTask){

    return (dispatch)=>{
        dispatch({type: 'PENDING'});
        request(`${apiHost}/task`, 'POST', newTask)
        .then((task)=>{
        dispatch({type: 'ADD_TASK', task});
        }).catch((error) => {
            dispatch({type:'ERROR',message:error.message})
        });;
    }
};

export function deleteTask(taskId,from){
        return function(dispatch){
            dispatch({type: 'PENDING'});
            request(`${apiHost}/task/${taskId}`, 'DELETE')
            .then(()=>{
                dispatch({type: 'DELETE_TASK', taskId,from});
                if(from === 'single'){
                   history.push('/');
               }
                }).catch((error) => {
                    dispatch({type:'ERROR',message:error.message})
                });
        }
}

export function deleteTasks(taskIds){
    return function(dispatch){
        dispatch({type: 'PENDING'});
        request(`${apiHost}/task`, 'PATCH', {
            tasks: [...taskIds]
        })
        .then(()=>{
            dispatch({type: 'DELETE_TASKS', taskIds});
            }).catch((error) => {
                dispatch({type:'ERROR',message:error.message})
            });;
    }
}

export function editTask(data,from){
    return function(dispatch){
        dispatch({type: 'PENDING'});
        request(`${apiHost}/task/${data._id}`, 'PUT', data)
        .then((editedTask)=>{
            dispatch({type:'EDIT_TASK', editedTask,from});
            }).catch((error) => {
                dispatch({type:'ERROR',message:error.message})
            });;
    }
}

export function getTask(id){
return function (dispatch){
    dispatch({type: 'PENDING'});
    request(`${apiHost}/task/${id}`)
    .then((task) => dispatch({type:'GET_TASK',task})).catch((error) => {
    dispatch({type:'ERROR',message:error.message})
});
}
}

export function register(data) {
    return function (dispatch) {
        dispatch({ type: 'PENDING' });
        requestWithoutToken(`${apiHost}/user`, 'POST', data)
            .then(() => {
                dispatch({ 
                    type:'REGISTER'
                });
                history.push('/login')
            })
            .catch((err) => {
                dispatch({
                    type: 'ERROR',
                    message: err.message
                });
            });
    }
}

export function login(data) {
    return function (dispatch) {
        dispatch({ type: 'PENDING' });
        requestWithoutToken(`${apiHost}/user/sign-in`, 'POST', data)
            .then((res) => {
                localStorage.setItem('token', JSON.stringify(res));
               dispatch({
                   type:'LOGIN'
               })
               history.push('/home')

            })
            .catch((err) => {
                dispatch({
                    type: 'ERROR',
                    message: err.message
                });
            });
    }
}

