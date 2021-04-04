import React  from 'react';
import { Spinner as BSpinner } from 'react-bootstrap';
import styles from './spinnerStyle.module.css'

export default function Spinner(){
    return (
        <div className = {styles.spinnerContainer}>
        <BSpinner className = {styles.spinner} animation="grow" variant="success" />
        </div>
        )
}