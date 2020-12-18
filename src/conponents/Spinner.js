import React from "react"
import spinner from "./91.gif"

const Spinner = () => {
    return (
        <React.Fragment>
            <img src={spinner} style={{margin: 'auto', display: 'block'}} alt="Loading..." /> 
        </React.Fragment>
    )
}

export default Spinner