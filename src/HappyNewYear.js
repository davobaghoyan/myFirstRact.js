function NewYearCalculator (props){
    var days = 365 - ((props.month - 1) * 30 + props.day);
    return (
        <h2>It is remained about {days} days untill New Year !!</h2>
    );
}


export {NewYearCalculator};