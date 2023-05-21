import { promises as fs } from 'fs';
class ProductManager {
  constructor() {
    this.path = './productos.txt';
    this.products = [];
    this.newId = 1;
  }
  addProduct = async (title, description, price, image, code, stock) => {
    try {
      //Validar que no se repita el campo “code” y que todos los campos sean obligatorios. Al agregarlo, debe crearse con un id autoincrementable
      const productoExistente = this.products.find(
        (producto) => producto.code === code
      );
      //hacemos referencia a products, y con find buscamos que cumpla con determinada condición. En este caso "code".
      //Entonces si code existe en el array de products, el producto que quiero agregar debería mostrar un error de que ya existe.
      if (productoExistente) {
        console.log(
          `Producto "${title}" tiene un error, el codigo "${code}" es el mismo del producto "${productoExistente.title}".`
        );
        return;
      }
      //verificamos si todos los campos obligatorios fueron proporcionados
      if (!title || !description || !price || !image || !code || !stock) {
        console.log(
          `Todos los campos son obligatorios en el producto "${title}" que estas intentando ingresar`
        );
        return;
      } //creamos el nuevo producto
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
      //si esta correcto pusheamos el archivo
      await fs.writeFile(this.path, JSON.stringify(this.products));
      //escribimos nuestros productos en la base de datos
    } catch (error) {
      console.log(error);
    }
  };
  responseProduct = async () => {
    try {
      //creamos una función de respuesta para reutilizar en el código
      let response = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(response);
    } catch (error) {
      console.log(error);
    }
  };
  getProducts = async () => {
    try {
      //llamamos a todos nuestros productos
      let productRes = await this.responseProduct();
      return console.log(productRes);
    } catch (error) {
      console.log(error);
    }
  };

  getProductsById = async (id) => {
    try {
      //llamamos a nustra lista productos
      let idProduct = await this.responseProduct();
      //llamamos a un producto por el ID indicado
      let productFilter = idProduct.find((product) => product.id === id);
      console.log(productFilter);
    } catch (error) {
      console.log(error);
    }
  };
  updateProduct = async (id, title, description, price, image, code, stock) => {
    try {
      //llamamos a nustra lista productos
      let toUpdateProduct = await this.responseProduct();
      //Verificamos que el ID exista en nuestros productos.
      let productUpdate = toUpdateProduct.findIndex(
        (product) => product.id === id
      );
      if (productUpdate.length > 0) {
        return;
      }
      //Validar que no se repita el campo “code” y que todos los campos sean obligatorios.
      let codeExists = toUpdateProduct.some((product) => product.code === code);
      // si el código se encuentra en alguno de nuestros productos, entonces mostramos un error por consola
      if (codeExists) {
        return console.log('El "code" ingresado esta duplicado');
      }
      //verificamos que no quede ningún campo vacío
      if (
        !id ||
        !title ||
        !description ||
        !price ||
        !image ||
        !code ||
        !stock
      ) {
        //verificamos que no queden campos vaciós al actualizar el producto sino arrojamos un error
        throw new Error('No se puede actualizar el producto con campos vacios');
      }
      //Verificamos que el ID en el indice 0 coincida con el ingresado.
      if (productUpdate !== -1) {
        toUpdateProduct[productUpdate].title = title;
        toUpdateProduct[productUpdate].description = description;
        toUpdateProduct[productUpdate].price = price;
        toUpdateProduct[productUpdate].image = image;
        toUpdateProduct[productUpdate].code = code;
        toUpdateProduct[productUpdate].stock = stock;
        await fs.writeFile(this.path, JSON.stringify(toUpdateProduct));
        //si esta todo correcto actualizamos el producto
        console.log(`Producto actualizado`);
      } else {
        console.log(
          `No existe el producto con el id ingresado que quieres actualizar`
        );
      }
    } catch (error) {
      console.error('Se produjo un error:', error);
    }
  };

  deleteProduct = async (id) => {
    try {
      //llamamos a nustra lista productos
      let productToDelete = await this.responseProduct();
      //buscamos el producto por id para eliminar
      let productDelete = productToDelete.findIndex(
        (product) => product.id === id
      );
      //verificamos que el ID exista en nuestros productos.
      if (productDelete !== -1) {
        productToDelete.splice(productDelete, 1);
        //eliminamos el producto del array, "productToDelete" es el indice del producto a eliminar
        //el 1 es la cantidad de productos a eliminar desde el indice de "productToDelete".
        await fs.writeFile(this.path, JSON.stringify(productToDelete));
        //borramos el producto encontrado por el id y actualizamos nuestro archivo de productos
        console.log(`Producto eliminado`);
      } else {
        console.log(`No existe el producto con el ID ingresado`);
      }
    } catch (error) {
      console.error('Se produjo un error:', error);
    }
  };
}
const productos = new ProductManager();
// productos.addProduct('titulo1', 'descripcion1', 800, 'imagen1', 'abc123', 3);
// productos.addProduct('titulo2', 'descripcion2', 300, 'imagen2', 'abc124', 6);
// productos.addProduct('titulo3', 'descripcion3', 700, 'imagen3', 'abc125', 2);
//productos.getProducts();
//productos.getProductsById(2);
//productos.updateProduct(
//   2,
//   'titulo1updated',
//   'descripcion2',
//   10,
//   'imagen2',
//   'abc127',
//   200
// );
//productos.deleteProduct(1);
