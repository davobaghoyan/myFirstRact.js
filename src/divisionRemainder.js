function Remainder(props)
{
    var rem = props.x % props.y;
    return(
        <h3>Remainder of {props.x}/{props.y} is equal to {rem}!</h3>
    )
}

export {Remainder};