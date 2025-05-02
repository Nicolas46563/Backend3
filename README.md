# AdoptMe Backend 🐾

Proyecto final del curso Backend de Coderhouse

## 📌 Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- Autenticación con JWT y Passport
- Testing con Mocha + Supertest
- Documentación con Swagger
- Docker para despliegue

---

## 🚀 Cómo correr el proyecto

### 🔧 Local

1. Clonar el repositorio
2. Instalar dependencias

```bash
npm install
```

3. Crear un archivo `.env` en la raíz con el siguiente contenido:

```env
MONGO_URI=mongodb+srv://nes46563:AVhx1lFxcflyLjfB@clustercoderhouse.5fl6u.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCoderhouse
```

4. Iniciar el servidor

```bash
npm start
```

El servidor se ejecutará en:  
👉 `http://localhost:8580`

---

### 🐳 Docker

#### Opción 1: Usar `.env`

```bash
docker build -t adoptme-backend .
docker run -p 8580:8580 --env-file .env adoptme-backend
```

#### Opción 2: Pasar variable desde consola

```bash
docker run -p 8580:8580 -e MONGO_URI="mongodb+srv://nes46563:AVhx1lFxcflyLjfB@clustercoderhouse.5fl6u.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCoderhouse" adoptme-backend
```

---

## 📘 Documentación API

Disponible automáticamente al levantar el servidor en:  
👉 `http://localhost:8580/api-docs`

---

## 🧪 Testing

El proyecto incluye tests funcionales con Mocha + Supertest.

Ejecutá:

```bash
npm test
```

---

## 🐳 Imagen Docker

Subida y publicada en DockerHub:  
👉 https://hub.docker.com/r/nicolas46563/adoptme-backend

---

## 👨‍💻 Autor

Desarrollado por **Nicolás Sanchez**  
📘 Proyecto Final Backend - Coderhouse
