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
