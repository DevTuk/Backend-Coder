import { promises as fs } from 'fs';

class ProductManager {
  constructor() {
    this.path = './productos.txt';
    this.products = [];
    this.newId = 1;
  }
  addProduct = async (title, description, price, image, code, stock) => {
    if (error) throw console.log(error);

    let newProduct = {
      title,
      description,
      price,
      image,
      code,
      stock,
      id: this.newId++,
    };
    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products));
  };

  respuestaProduct = async () => {
    let respuesta = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let productRes = await this.respuestaProduct();
    return console.log(productRes);
  };
  getProductsById = async (id) => {
    let idProduct = await this.respuestaProduct();
    let filtrado = idProduct.find((product) => product.id === id);
    console.log(filtrado);
  };
  updateProduct = async (id) => {};

  deleteProduct = async () => {};
}

const productos = new ProductManager();
// productos.addProduct('titulo1', 'descripcion1', 800, 'imagen1', 'abc123', 3);
// productos.addProduct('titulo2', 'descripcion2', 300, 'imagen2', 'abc124', 6);
// productos.addProduct('titulo3', 'descripcion3', 700, 'imagen3', 'abc125', 2);
//productos.getProducts();
productos.getProductsById(3);
