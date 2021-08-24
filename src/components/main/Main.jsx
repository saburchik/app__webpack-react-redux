import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './Main.scss'
import { getRepos } from "../actions/repos"
import Repo from "./repo/Repo"
import { setCurrentPage } from "../../reducers/reposReducer"
import { createPages } from "../../utils/pagesCreator"

const Main = () => {
    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const perPage = useSelector(state => state.repos.perPage)
    const [searchValue, setSearchValue] = useState("")
    const pagesCount = Math.ceil(totalCount / perPage)
    const pages = []
    createPages(pages, pagesCount, currentPage)

    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage])

    function searchHandler() {
        dispatch(currentPage(1))
        dispatch(getRepos(searchValue, currentPage, perPage))
    }

    return (
        <div className="main">
            <div className="search">
                <input
                    className="search__input"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Enter repository name" />
                <button
                    className="search__btn"
                    onClick={() => searchHandler()}
                >Search</button>
            </div>
            <h1 style={{ textAlign: "center" }}>Repositories from GitHub througth API</h1>
            <div className="fetching">
                {isFetching === false
                    ?
                    repos.map(repo => <Repo repo={repo} />)
                    :
                    <div className="fetching__el">
                        <h2>Loading..</h2>
                    </div>
                }
            </div>
            <div className="pages">
                {pages.map((page, index) => <span
                    key={index}
                    className={currentPage == page ? "current-page" : "page"}
                    onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
            </div>
        </div>
    )
}

export default Main;