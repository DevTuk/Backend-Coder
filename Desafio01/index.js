class ProductManager {
  constructor() {
    this.products = [];
    this.nuevoID = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const productoExiste = this.products.find(
      (producto) => producto.code === code
    );
    if (productoExiste) {
      console.log(
        `El producto ${title} tiene un error, el codigo ${code} es el mismo de otro producto existente ${productoExiste.title}"`
      );
      return;
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log(
        `Todos los campos son obligatorios en el producto ${title} que estas intentando ingresar`
      );
    } else {
      const producto = {
        id: this.nuevoID++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(producto);
      {
        console.log(`el producto ${producto.title} fue agregado correctamente`);
      }
    }
  }
  getProduct() {
    return this.products;
  }
  getProductById(id) {
    const productoId = this.products.find((producto) => producto.id === id);
    {
      if (!productoId) {
        console.log(`"Not Found" el Id n° "${id}" de producto no existe`);
      } else {
        console.log(`El producto con el id "${id}" fue encontrado`);
        return productoId;
      }
    }
  }
}

const producto = new ProductManager();
producto.addProduct('titulo1', 'descripcion1', 200, 'imagen1', 'code1', 2);
producto.addProduct('titulo2', 'descripcion1', 200, 'imagen1', 'code2', 2);
producto.addProduct('titulo3', 'descripcion1', 200, 'imagen1', 'code3', 2);
console.log(producto.getProduct());
producto.getProductById(5);
