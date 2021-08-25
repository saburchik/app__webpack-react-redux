import React from "react"
import './Repo.scss'
import { NavLink } from "react-router-dom"

const Repo = (props) => {
    const repo = props.repo

    return (
        <div className="repo">
            <div className="repo-header">
                <div className="repo-header-name">Name the repository: <NavLink to={`/card/${repo.owner.login}/${repo.name}`}>
                    <b>{repo.name}</b>
                </NavLink>
                </div>
                <div className="repo-header-stars">Quantity stars: <b>{repo.stargazers_count}</b></div>
            </div>
            <div className="repo-last-commit">Last commit: <b>{repo.updated_at}</b></div>
            <a className="repo-link" href={repo.html_url}>Link on a repository: <b>{repo.html_url}</b></a>
        </div >
    )
}

export default Repo