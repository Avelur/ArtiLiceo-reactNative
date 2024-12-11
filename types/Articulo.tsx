class Articulo {
    id: string;
    nombre: string;
    description: string; 
    imagePath: string; 
    precio: number; 
    tags: [];
    index: number;

    constructor (id: string, nombre: string, description: string, imagePath: string, precio: number, tags: [], index: number) {
        this.id = id;
        this.nombre = nombre;
        this.description = description;
        this.imagePath = imagePath;
        this.precio = precio;
        this.tags = tags;
        this.index = index;
    }
}