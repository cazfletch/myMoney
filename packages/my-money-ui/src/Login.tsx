import React, {useState, useEffect} from 'react';
import {
    Link
} from 'react-router-dom';
import './Login.scss';

export default function Login() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [children, setChildren] = useState([]);

    useEffect(() => {
        fetch('/api/children')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setChildren(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    if (error) {
        // @ts-ignore
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="Login">
                <header>
                    <h1>Select Child</h1>
                </header>
                <div className="users">
                    {children.map((child: any) => (
                        <div className="card" key={child.name}>
                            <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{child.name}</h5>
                                <p className="card-text">Some quick example text to build on the card title
                                    and
                                    make
                                    up
                                    the bulk of the card's content.</p>
                                <Link to={`/money/${child.name}`} className="btn btn-primary">Login</Link>
                            </div>
                        </div>
                    ))}

                    <div className="card">
                        <img src="..." className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Add a new child</h5>
                            <p className="card-text">Some quick example text to build on the card title and
                                make
                                up
                                the bulk of the card's content.</p>
                            <Link to='/addChild' className="btn btn-primary">Add Child</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

