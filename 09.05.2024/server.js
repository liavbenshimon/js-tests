const express = require('express');
const axios = require('axios'); 

const app = express();
const port = 3000;
const fakUrl = "https://fakestoreapi.com"

app.use(express.json());

// Route to get data

app.get('/api/product/get/:id', (req, res) => {
    const {id} = req.params;
    try {
         axios.get(`${fakUrl}/products/${id}`)
        .then(response => {
            if (!response.data) {
                res.status(400).send("id  is not exist");
                return
            }
            res.json(response.data)
        })
    } catch (err) {
        console.error('error:', err);
        res.status(500).send('Server Error');
    }
});

app.post('/api/Product/add', (req, res) => {
    const { title, price, description, image, category} = req.body;
    try {
        if ( !title || !price || !description || !image || !category) {
            res.status(400).send(`Missing required fields`)
            return    
        }
         const data = { title: title, price:price, description:description, image:image, category:category }
         axios.post(`${fakUrl}/products`, data)
        .then(response => {
            if (!response.data) {
                res.status(400).send("id  is not exist");
                return
            }
            res.json(response.data)
        })
    } catch (err) {
        console.error('error:', err);
        res.status(500).send('Server Error');
    }
});




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;

