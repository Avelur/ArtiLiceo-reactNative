class Articulo {
    nombre: string;
    description: string; 
    imagePath: string; 
    precio: number; 
    tags: [];

    constructor (nombre: string, description: string, imagePath: string, precio: number, tags: []) {
        this.nombre = nombre;
        this.description = description;
        this.imagePath = imagePath;
        this.precio = precio;
        this.tags = tags;
    }
}