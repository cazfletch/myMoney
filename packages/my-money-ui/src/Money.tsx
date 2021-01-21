import React, {useState, useEffect} from 'react';
import {
    useParams
} from 'react-router-dom';

import Transactions from './Transactions';
import './Money.scss';

export default function Money() {
    // @ts-ignore
    let {id} = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [child, setChild] = useState({
        name: undefined,
        balance: undefined,
        transactions: []
    });

    async function getChild() {
        const response = await fetch(`/api/child/${id}`);
        const result = await response.json();
        if(result) {
            setIsLoaded(true);
            setChild(result);
        } else {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
      getChild();
    }, []);

    if (error) {
        // @ts-ignore
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        // @ts-ignore
        return (
            <div className="Money">
                <header>
                    <div>
                        <h1>Hello {child.name}</h1>
                    </div>
                    <div className="balanceContainer">
                        <div className="balance">
                            <h1>£{child.balance}</h1></div>
                    </div>
                </header>
                <Transactions child={child} getChild={getChild} isLoaded={isLoaded} setIsLoaded={setIsLoaded} setError={setError}/>
            </div>
        );
    }
}

