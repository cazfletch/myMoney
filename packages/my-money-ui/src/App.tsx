import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import './App.scss';
import Login from './Login';
import Money from './Money';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div className="App">
                        <header className="App-header">
                            <h1><Link to='/login'>Welcome to My Money</Link></h1>
                        </header>
                    </div>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/money/:id">
                    <Money/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
