import React from "react"
import './Repo.scss'

const Repo = (props) => {
    const repo = props.repo

    return (
        <div className="repo">
            <div className="repo-header">
                <div className="repo-header-name">Name the repository: <b>{repo.name}</b></div>
                <div className="repo-header-stars">Quantity stars: <b>{repo.stargazers_count}</b></div>
            </div>
            <div className="repo-last-commit">Last commit: <b>{repo.updated_at}</b></div>
            <a className="repo-link" href={repo.html_url}>Link on a repository: <b>{repo.html_url}</b></a>
        </div>
    )
}

export default Repo