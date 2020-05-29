# Instalacion

requisitos:

1. Typescript
1. node.js >=14.1
1. tsc-watch

### Backend

dentro de la carpeta backend corre

```
npm install

```

Crea una carpeta llamada `image/jpg` .
dentro de `image` anexa tu imagen cr2

Dentro del folder `assets/storage` crea un archivo llamado `keys.json`
con el siguiente contenido:

```
{
  "hostname": "[tu url para bunnyCDN]",
  "path": [tu ruta de archivos para bunnycdn],
  "username": "[tu username]",
  "password": "[tu password]",
  "readOnly": "[tu readonlypassword]"
}

```

No se te olvide configurar los accesos de tu base de datos en el archivo `.env`

y finalmente en consola corre el comando: `tsc-watch --onSuccess "node build/main.js"`

Asegurate que la carpeta `build` no tenga otra carpeta `build` dentro.

Recuerda hacer `npm update` cada que bajes una actualizacion.

## Clase Model

Utilidad para el uso y manejo de contenido de la base de datos.

Para crear un modelo solo crea un archivo con la siguiente estructura:

```
export class Demo extends Model {
  tableName: string = "example";
  columns: Array<string> = ["id", "content", "content2"];
  constructor() {
    super();
  }
}


```

Para llamar la clase

```
new Demo();
```

Cada instancia de la clase modelo tendra las siguientes metodos:

`select(columns:array)` sobre escribe las columnas a mostrar en la ejecucion de la query. `return Model`

`where(args:any)` añade nuevos filtros a la consulta (la separacion entre estos es un `and`) `return Model`

`orWhere(args:any)` añade nuevos filtros a la consulta (la separacion entre estos es un `or`) `return Model`

`get()` La cual ejecuta una query tipo select basada en las columnas asignadas en el modelo y los filtros por el metodo `where` y retorna una `Promise` con el contenido de la consulta. `return Promise`

`delete()` Basado en el `where` de la consulta elimina de la tabla el contenido seleccionado. `return Promise`

`setValues(values:object)` define los valores a guardar en la base de datos. `return Model`

`save()` Guarda o actualiza la informacion definida en values en la base de datos. `return Model`

Ejemplos de uso:

```
//Elimina el elemento con el id 105
new Demo().where({ id: 105 }).delete();
// obtiene todos los elementos en la base de datos basados en las columnas asignadas al crear el modelo
new Demo().get().then((data) => {
        res.send(data);
      });
// Asigna y actualiza los valores donde `content` sea igual a 10
new Demo()
  .where({ content: 10 })
  .setValues({
    content: 15,
    content2: "juanito",
  })
  .save();
```
