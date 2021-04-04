import decode from 'jwt-decode';
import {store} from '../store/store';
import { history } from '../helpers/history';

export function checkLoginStatus(){
    return !!localStorage.getItem('token');
} 
export default function requestWithoutToken(url, method='GET', body){
    const config = {
        method: method,
        headers: {
            "Content-Type": 'application/json',
        }
    };

    if(body){
        config.body = JSON.stringify(body);
    }

   return fetch(url, config)
        .then(async (response) => {
            const res = await response.json();

            if(response.status >=400 && response.status < 600){
                if(res.error){
                    throw res.error;
                }
                else {
                    throw new Error('Something went wrong!');
                }
            }
            
            return res;
        });
}


export const getToken = ()=>{
    const token = localStorage.getItem('token');
    if(token){
        const parsedToken = JSON.parse(token);
        const decodedToken = decode(parsedToken.jwt);
    
    
        if(decodedToken.exp - new Date().getTime()/1000 > 60){
            return Promise.resolve(parsedToken.jwt);
        }
        else {
            const apiHost = process.env.REACT_APP_API_HOST;
            return requestWithoutToken(`${apiHost}/user/${decodedToken.userId}/token`,'PUT', {
                refreshToken: parsedToken.refreshToken
            })
                .then(token => {
                    saveToken(token);
                    return token.jwt;
                })
                .catch(()=>{
                   logout();
                });
            }
        }
        else {
            logout();
        }
        
        }

        export function logout(){
            localStorage.removeItem('token');
            store.dispatch({type: 'LOGOUT'});
            history.push('/login');
        }

export function saveToken(token){
    localStorage.setItem('token', JSON.stringify(token));
}

