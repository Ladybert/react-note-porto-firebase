import react from "react"

const Button = ({onClick, title, loading, classNameButton=''}) => {
    if(loading) {
        return(
            <button className="btn disable">Loading ....</button>
        )
    }
    return(
        <button className={`btn ${classNameButton}`} onClick={onClick}>{title}</button>
    )
}

export default Button