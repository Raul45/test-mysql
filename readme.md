# Requisitos previos para correr la API

  - Node.js >= 12
  - Mysql 5.7
  - Crear la base de datos, enseguida los comandos utilizados para crearla

### Comandos sql
Ejecutar preferiblemente desde consola o en Workbench.
* `CREATE DATABASE IF NOT EXISTS testRaulHerrera;`
* `USE testRaulHerrera;`
* `CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(510) NOT NULL,
    PRIMARY KEY (id)
);`
* `CREATE TABLE articles (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY(id)
);`

* `
CREATE TABLE pay_order (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY(id)
);`

* `CREATE TABLE pay_article_relation (
        id INT(11) NOT NULL AUTO_INCREMENT,
        order_id INT NOT NULL,
        article_id INT NOT NULL,
        PRIMARY KEY (id)
);`

* `ALTER TABLE pay_article_relation
ADD CONSTRAINT FK_pay_order
FOREIGN KEY (order_id) REFERENCES pay_order(id);`

* `ALTER TABLE pay_article_relation
ADD CONSTRAINT FK_article
FOREIGN KEY (article_id) REFERENCES articles(id);`
 
# Solución de los problemas planteados


  - En base al problema, se planteo un esquema relacional N:N, donde la tabla pay_order funge como la tabla con mayor jerarquía en el esquema, tiene los campos: `id`, `name`, `description` y `date`
  - Después tenemos la tabla articles, en ella solo tenemos los atributos `id`, `name` & `description`.
  - Para finalizar contamos con una tabla pivote pay_article_relation, al ser un esquema N:N necesitamos esta tabla, la cual nos permite relacionar ambas tablas sin necesidad de un atributo extra y con consultas mas limpias en esta tabla unicamente necesitamos los `id` de las otras respectivas tablas, bajo los campos de `order_id` para el id de la orden y `article_id` para el id de articulo.

# Antes de comenzar
### Una vez creada la base de datos nos ubicamos en el directorio dela API.
  - Ejecutamos `npm install` para instalar todas las dependencias del proyecto.
  - Para correr la API ejecutamos `npm run dev`
  - Si todo se ejecutó correctamente veremos `Server on port 3000`
  - En caso de requerir algún otro puerto es necesario declararlo en el `.env` con la variable `PORT`


# API ENDPOINTS AUTHENTICATION
Todos los endpoints estan protegidos por la autenticación `JWT`, excepto los de signup y login, para evidentemente, generar el token a consumir en los demas endpoint, dicho token, solemente cuenta con 1 hr. de vida.

**/api/users/signup**
Metodo: `POST`
este endpoint es para registrarte como usuario del API, los campos necesarios son:
```
{
    "username":<username>,
    "password":<password>(No mayor a 8 digitos por la encriptación del valor)
}
```
**/api/users/login**
Metodo: `POST`
el endpoint login, es para autenticarnos como usuarios ya registrados, pide los datos iguales al registro, pero en este caso la respuesta es el `token` 
el cual debemos almacenar para autenticar las siguientes peticiones que vayamos a realizar.

# API ENDPOINTS CRUD AMBOS MODELOS
**/api/articles**
Metodo: `GET`
este endpoint nos listara todos los articulos que tengamos almacenados en base de datos.

**/api/articles/;id**
Metodo: `GET`
De respuesta obtendremos un articulo en específico, el parametro será el id del mismo.

**/api/articles**
Metodo: `POST`
con este endpoint guardaremos nuevos item's dentro nuestra base de datos, los datos requeridos son:
```
{
    "name":<name>,
    "description:<description>"
}
```

**/api/articles/:id**
Metodo: `POST`
actualizaremos los valores del articulo que se desee mediante el parametro id,
es necesario enviar ambos valores por igual, debido a que se requieren los 2 para ejecutar con exito la consulta
```
{
    "name":<name>,
    "description:<description>"
}
```

**/api/articles/:id**
Metodo: `DELETE`
Eliminaremos el articulo por id.



**/api/pay-orders**
Metodo: `GET`
este endpoint nos listara todas las pay_orders que tengamos almacenados en base de datos.

**/api/pay-orders/;id**
Metodo: `GET`
De respuesta obtendremos un pay-order en específico, el parametro será el id del mismo.

**/api/pay-orders**
Metodo: `POST`
con este endpoint guardaremos nuevos item's dentro nuestra base de datos, los datos requeridos son:
```
{
    "name":<name>,
    "description:<description>",
    "date":<date> IMPORTANTE QUE EL FORMATO SEGUIDO SEA `YYYY-MM-DD`
}
```

**/api/pay-orders/:id**
Metodo: `POST`
actualizaremos los valores del articulo que se desee mediante el parametro id,
es necesario enviar los 3 valores por igual, debido a que se requieren los 3 para ejecutar con exito la consulta
```
{
    "name":<name>,
    "description:<description>",
    "date":<date>
}
```

**/api/pay-orders/:id**
Metodo: `DELETE`
Eliminaremos el pay_order por id.


# API ENDPOINTS TEST
Metodo: `POST`
El primer endpoint para prueba es:
**/api/test/add-new-article-to-pay-order**
este endpoint funciona para añadir mas articulos a determinada compra, se quieren ambos id's(por las foreign key's), tanto como de la orden, como del articulo.
Los campos requeridos son:
```
{
    "order_id":<numero Int> es importante que exista el id de la compra, si no, retornará error.
    "article_id":<numero int> también es importante que exista por la anterior razón.
}
```
**/api/test/repeat**
Metodo:`GET`
Este endpoint nos regresara los id's de los 2 articulos mas frecuentes en ventas.
No require ningún parámetro.

**/api/test/between-dates**
Metodo: `POST`
Este endpoint nos regresará como respuesta, las compras ejercidas entre dos fechas predeterminadas, para lograr este cometido es necesario solamente un par de campos, los cuales son:
```
{
    "date1":<la fecha menor para consultar>,
    "date2":<la fecha limite para consultar>
}
```


