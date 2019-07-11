const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Product {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid()
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    static async update(product){
        const prod = await Product.getAll();

        const idx = prod.findIndex(c => c.id === product.id);
        prod[idx] = product;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'product.json'),
                JSON.stringify(prod),
                (err) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    async save() {
        const product = await Product.getAll();
        product.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'product.json'),
                JSON.stringify(product),
                (err) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
        
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '/..', 'data', 'product.json'),
                'utf-8',
                (err, content) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            );
        });       
    }

    static async getByID(id){
        const prod = await Product.getAll();
        return prod.find(p => p.id === id);
    }
}

module.exports = Product;