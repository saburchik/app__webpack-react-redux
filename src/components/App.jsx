import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import './App.scss'

// Components
import Main from "./main/Main"
import Card from "./card/Card"
import Error from "./main/Error"


const App = () => {
    const dispatch = useDispatch()

    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/card/:username/:reponame" component={Card} />
                    <Route path="/error" component={Error} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;