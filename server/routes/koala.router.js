const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool')

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas" ORDER BY "ready_to_transfer";';
    pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
    })
    .catch(error => {
        console.log('error', error);
        res.sendStatus(500);
    });
});

// POST
// /koalas
koalaRouter.post('/', (req, res) => {
        console.log(req.body);
        let queryText = `INSERT INTO "koalas" ("name", "age", "gender", "ready_to_transfer", "notes")
                        VALUES ($1, $2, $3, $4, $5);`;
        pool.query(queryText,[req.body.name, req.body.age, req.body.gender, req.body.readyToTransfer, req.body.notes])
        .then(result => {
        res.send(201);  
        })
        .catch(error =>{
            console.log('a koala got stuck in the server', error );
            res.sendStatus(500)
        })
    });




// PUT
koalaRouter.put('/:id' , (req , res) => {
    let idToUpdate = req.params.id
    console.log('got to put' , req.params.id);
    // let queryText = '';
    
    let ready = req.body.readyForTransfer
    console.log(ready);

    
    let queryText = `UPDATE "koalas"
        SET "ready_to_transfer" = '1'
        WHERE "id" = $1;
        `
    


    pool.query(queryText , [idToUpdate]) 
    .then(result =>{
        res.sendStatus(201);
        // getKoalas()
    })
    .catch(error =>{
        console.log('Query text: ', queryText, 'error' , error);
        res.sendStatus(500);
    })
    
});

// DELETE
koalaRouter.delete ('/:id', ( req, res ) => {

    const idToDel = req.params.id;
    let queryText = 'DELETE FROM "koalas" WHERE "id" = $1;';

    pool.query(queryText, [idToDel] )
        .then((result) => {
            console.log(`Koala deleted with the id ${idToDel}, ${result.rows}`);
            res.sendStatus(200)
        })
        .catch ((error) => {
            console.log('Error with deleting koala');
            res.sendStatus(500)
        })
})
module.exports = koalaRouter;