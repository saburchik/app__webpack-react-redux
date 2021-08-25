import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRepos } from "../actions/repos"
import { createPages } from "../../utils/pagesCreator"
import { setCurrentPage } from "../../reducers/reposReducer"
// Styles:
import "./Main.scss"
// Components:
import Repo from "./repo/Repo"

const Main = () => {
    const dispatch = useDispatch()
    const isFetchError = useSelector(state => state.repos.isFetchError)
    const isFetching = useSelector(state => state.repos.isFetching)
    const repos = useSelector(state => state.repos.items)
    const totalCount = useSelector(state => state.repos.totalCount)
    const perPage = useSelector(state => state.repos.perPage)
    const currentPage = useSelector(state => state.repos.currentPage)
    const [searchValue, setSearchValue] = useState("")
    const pagesCount = Math.ceil(totalCount / perPage)
    const pages = []
    createPages(pages, pagesCount, currentPage)

    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage])

    function searchHandler() {
        dispatch(setCurrentPage(1))
        dispatch(getRepos(searchValue, currentPage, perPage))
    }

    return (
        <main className="main">
            {isFetchError &&
                <section class="alert alert-danger" role="alert">
                    <h2 className="alert__title">An error has occurred! Please refresh the page or restart the browser</h2>
                </section>}
            <h1 className="title">Repositories from GitHub througth API</h1>
            <div className="search">
                <input
                    className="search__input"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Enter repository name" />
                <button className="search__btn" onClick={() => searchHandler()} disabled={false}>
                    Search
                </button>
            </div>
            <article className="fetching">
                {isFetching === false
                    ?
                    repos.map((repo, index) => <Repo key={index} repo={repo} />)
                    :
                    <section className="fetching__loading">
                        <h2>Loading..</h2>
                    </section>
                }
            </article>
            <div className="pages">
                {pages.map((page, index) => <ul
                    key={index}
                    className={currentPage == page ? "current-page" : "page"}
                    onClick={() => dispatch(setCurrentPage(page))}><li>{page}</li></ul>)}
            </div>
        </main>
    )
}

export default Main;