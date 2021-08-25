import React from "react"

const Error = (props) => {
    const repo = props.repo

    return (
        <div className="error">
            <button className="search__btn" onClick={() => props.history.push('/')}>Go to Main Page</button>
        </div >
    )
}

export default Error