import React, {useState} from 'react';

import {Table} from 'react-bootstrap';

export default function Transactions(props) {

    const [isAdult, setIsAdult] = useState(false);
    const [thing, setThing] = useState('');
    const [amount, setAmount] = useState('0.00');

    const today = new Date(Date.now());
    const formattedDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`;
    const [transactionDate, setTransactionDate] = useState(formattedDate);

    async function addNewTransaction(event) {
        event.preventDefault();
        props.setIsLoaded(false);
        const newAmount = (parseFloat(amount) * -1) + '';
        const transactionDetails = JSON.stringify({
            child: props.child.name,
            transactionDate,
            amount: newAmount,
            thing
        });

        const response = await fetch('/api/transaction', {
            method: 'POST', body: transactionDetails,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        console.log(result);
        if(result.result) {
            setAmount('0.00');
            setThing('');
            setTransactionDate(formattedDate);
            await props.getChild();
        } else {
            props.setIsLoaded(true);
            props.setError('error');
        }
    }



    let deleteButton;
    if (isAdult) {
        deleteButton = <td>
            <button className="btn btn-error">Delete</button>
        </td>;
    }

    return (
        <div>
            <h2>Transactions</h2>
            <form onSubmit={addNewTransaction}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Thing</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.child.transactions.map((transaction: any) => (
                        <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.thing}</td>
                            <td>{transaction.amount}</td>
                            {deleteButton}

                        </tr>
                    ))}
                    <tr>
                        <td>
                            <input type="date" value={transactionDate}
                                   onChange={(event) => setTransactionDate(event.target.value)}/>
                        </td>
                        <td>
                            <input type="text" value={thing}
                                   onChange={(event) => setThing(event.target.value)}/>
                        </td>
                        <td>
                            <input type="text" value={amount}
                                   onChange={(event) => setAmount(event.target.value)}/>
                        </td>
                        <td>
                            <input type="submit" className="btn btn-primary" value="+ add new"/>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </div>
    )

}
