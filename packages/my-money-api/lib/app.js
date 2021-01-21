'use strict';

const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3001;
app.set("port", process.env.PORT || port);

app.use(bodyParser.json());

const children = [
    {
        name: "Isaac",
        balance: "5.00",
        transactions: [
            {
                id: "1",
                date: "14/05/20",
                amount: "2.00",
                thing: "sweets"
            },
            {
                id: "2",
                date: "20/12/20",
                amount: "4.00",
                thing: "chocolate"
            }
        ]
    },
    {
        name: "Chloe",
        balance: "3.50",
        transactions: [
            {
                id: "1",
                date: "18/05/20",
                amount: "7.00",
                thing: "sweets"
            },
            {
                id: "2",
                date: "29/12/20",
                amount: "1.00",
                thing: "chocolate"
            }
        ]
    }
];

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/api/child', (req, res) => {
    res.json({result: "success"});
});

app.get('/api/child/:id', (req, res) => {
    const childName = req.params.id;
    const child = children.find((_child) => {
        return _child.name.toLowerCase() === childName.toLowerCase();
    });
    res.json(child);
});

app.post('/api/transaction', (req, res) => {
    const transactionDetails = req.body;
    console.log(transactionDetails);
    const child = children.find((_child) => {
        return _child.name.toLowerCase() === transactionDetails.child.toLowerCase();
    });

    const parsedAmount = parseFloat(transactionDetails.amount);
    child.balance = parseFloat(child.balance) + parsedAmount;

    const id = child.transactions.length;
    child.transactions.push({
        id,
        date: transactionDetails.transactionDate,
        amount: transactionDetails.amount,
        thing: transactionDetails.thing
    });
    res.json({result: "success"});
});

app.get('/api/children', (req, res) => {
    res.json(
        [
            {
                name: "Isaac"
            },
            {
                name: "Chloe"
            }
        ]
    );
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
