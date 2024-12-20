const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const products = [
    { id: 1, productName: "Laptop", price: 89000 },
    { id: 2, productName: "Shoes", price: 5999 },
    { id: 3, productName: "Mobile", price: 12999 },
]

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Homepage.")
})

app.get('/about', (req, res) => {
    res.send("About page.")
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.post('/products', (req, res) => {
    const { productName, price } = req.body
    if (!productName || !price) {
        return res.status(400).send({ error: "Product name and price are required." })
    }
    const newProduct = {
        id: products.length > 0 ?
            Math.max(...products.map(p => p.id)) + 1
            : 1,
        productName,
        price
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})

app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id)
    const product = products.find(p => p.id === productId)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({
            error: "No such product exists.",
            productId: productId
        })
    }
})
// fully update the product
app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id)
    const { productName, price } = req.body
    if (!productName || !price) {
        return res.status(400).json({
            error: "All the fields are required to replace the resource."
        })
    }

    const productIndex = products.findIndex(p => p.id === productId)
    if (productIndex === -1) {
        // Not to create a new product if not found
        // res.status(404).json({
        //     error: "Product not found.",
        //     productId: productId
        // })

        // create a new product if not found
        const newProduct = {
            id: productId,
            productName,
            price
        }
        products.push(newProduct)
        return res.status(201).json(newProduct)
    }

    // replace the product with new info if it exists
    const updatedProduct = {
        id: productId,
        productName,
        price
    }
    products[productIndex] = updatedProduct
    res.status(200).json(updatedProduct)
})

// partial update product
app.patch("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id)
    const receivedProduct = req.body

    if (Object.keys(receivedProduct).length === 0) {
        return res.status(400).json({
            error: "Request body cannot be empty.",
            message: "Provide field to update."
        })
    }

    const productIndex = products.findIndex(p => p.id === productId)

    if (productIndex === -1) {
        return res.status(404).json({
            error: "Product not found to update.",
            productId: productId
        })
    }

    const updatedProduct = { ...products[productIndex], ...receivedProduct }
    products[productIndex] = updatedProduct
    return res.status(200).json(updatedProduct)
})

app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id)
    const productIndex = products.findIndex(p => p.id === productId)
    if (productIndex !== -1) {
        products.splice(productIndex, 1)
        res.status(204).send()
    }
    else {
        res.status(404).send({
            error: "Product not found."
        })
    }
})

app.use((req, res) => {
    res.status(404).send("Page not found.")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})