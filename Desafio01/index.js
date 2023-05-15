class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }
  addProduct(title, description, price, thumbnail, code, stock) {
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
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log(
        `Todos los campos son obligatorios en el producto "${title}" que estas intentando ingresar`
      );
      return;
    } //creamos el nuevo producto
    const producto = {
      id: this.nextId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    //si no existe, entonces agregamos el producto con los campos que debe reunir de forma obligatoria.
    this.products.push(producto);
    console.log(`El producto ${producto.id} fue agregado correctamente`);
  }
  getProducts() {
    // debe devolver el arreglo con todos los productos creados hasta ese momento
    return this.products;
  }
  getProductById(id) {
    const producto = this.products.find((producto) => producto.id === id);
    //buscamos en products que el id ingresado exista
    // En caso de no coincidir ningún id, mostrar en consola un error “Not found”
    if (!producto) {
      console.log(`“Not found” El producto con el id ${id} no existe`);
      return;
    }
    console.log(`El producto con el id ${id} fue encontrado`);
    return producto;
  }
}
const productos = new ProductManager();
console.log(productos.getProducts());
productos.addProduct('titulo1', 'descripcion1', 350, 'imagen1', 'abc123', 2);
productos.addProduct('titulo1', 'descripcion1', 350, 'imagen1', 'abc123', 2);
console.log(productos.getProducts());
productos.addProduct('titulo2', 'descripcion2', 450, 'imagen2', 'abc124', 5);
productos.addProduct('titulo3', 'descripcion3', 450, 'imagen3', 'abc125', 1);
console.log(productos.getProducts());
productos.getProductById(6);

