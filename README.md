# Parcial 1 Desarrollo Web

Se realizó una aplicación que permite visualizar graficas, al brindarle ya sea un archivo .csv o datos en formato JSON.
Para lo cúal se uso vega-lite. 

Una vez abierta la apliación, si se selecciona la opcion de generar a partir de un .csv, se le debe brindar en el campo JSON el spec de la visualización que se quiere realizar. Posteriormente elegir el archivo .csv y finalmente incluir su nombre y una pequeña descripción de la visualización para guardarla.

Por otro lado, si se elige la opción de generar a partir de texto. se le debe brindar igualmente un spec en formato JSON en el campo: Insert Json Spec.
Posteriormente incluir los datos en formato JSON que corresponden al spec brindado anteriormente. Al igual que en el caso anterior, para guardar la visualización se debe incluir el nombre y una descripción.

Por ultimo, se tiene una lista de las visualizaciónes guardadas, si se quiere ver alguna, basta con hacer click en su boton correspondiete, lo cual mostrara la grafica y sus califiaciones. Se puede incluir una calificación por persona unicamente, brindando su nombre y eligiendo la califación. Cabe resaltar que no se tiene calificación por defecto, por lo que es necesario escoger alguna.


## Para ejecutar el proyecto de manera local, descargar o clonar el repositorio 
recommend placing a blank line before and after code blocks to make the raw formatting easier to read.

Situarce en la carpeta raiz del proyecto, desde la cual se debe ver (bin, front routes ...) 
abrir la consola de comandos y realizar lo siguiente:

```
npm install 
```

```
cd front npm install 
```

Lo anterior con el fin de instalar las dependencias del proyecto.

Además hay que hacer un pequeño ajuste, hay que dirigirse al archivo index.js y cambiar la dirección de la url de mlab, para poder usar una base de datos.

```
const url = <URL DE LA DIRECCION DE MLAB> 
```

Finalmente se debe correr la aplicación, para lo cual hay que volverse a situar en la carpeta raiz del proyecto y pulsar el siguiente comando (para correr el back end de la aplicación)

```
npm start 
```


Posteriormente en otra terminal, hay que correr el front, para lo cual, si nos situamos en la carpeta raiz del proyecto hay que ejecutar los siguientes comandos

```
cd front 
```

```
npm start 
```






