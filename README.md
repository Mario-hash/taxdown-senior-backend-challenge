# TaxDown Backend API

API para la gestión de clientes de una tienda online de motos.

---

## 📌 Requisitos

- **Node.js** (versión 14+ recomendada)
- **npm**

### 🔧 Para pruebas locales con MongoDB

- [MongoDB](https://www.mongodb.com/try/download/community) (versión recomendada: mongodb-windows-x86_64-8.0.6-signed.msi)
- [MongoDB Compass](https://www.mongodb.com/products/compass) _(Opcional para visualizar datos)_

---

## 🚀 Instalación y Ejecución Local

**1. Clona el repositorio:**

```bash
git clone https://github.com/Mario-hash/taxdown-senior-backend-challenge.git
cd taxdown-senior-backend-challenge
```

**2. Instala las dependencias:**

```bash
npm install
```

**3. Compila el proyecto TypeScript:**

```bash
npm run build
```

**4. Inicia la aplicación:**

```bash
npm start
```

La API estará disponible en: `http://localhost:3000`

### 📖 Documentación Swagger

Accede a la documentación abriendo en tu navegador:

- [http://localhost:3000/docs](http://localhost:3000/docs)

---

## ☁️ Despliegue en AWS (Opcional)

Para desplegar la API en AWS usando Serverless Framework, asegúrate de tener una cuenta AWS configurada con credenciales adecuadas.

**Configura credenciales AWS** (mediante AWS CLI o variables de entorno).

**Despliega la API con parcheo de Swagger:**

```bash
npm run deploy:patch-swagger
```

Este comando realizará:

- Primer despliegue: creación/actualización de la stack en AWS.
- Actualización automática de URL real del endpoint en Swagger.
- Segundo despliegue: actualiza documentación Swagger con URL correcta.

### 🌐 Acceso a Swagger en AWS

La documentación Swagger desplegada estará disponible en una URL similar a:

```bash
https://qyxnawdar1.execute-api.us-east-1.amazonaws.com/docs
```

**Actualmente, esta es la URL adecuada para pruebas disponible públicamente, puedes acceder a ella para probar la API.**

_(Consulta la salida de `serverless info` para la URL exacta.)_

---

## 🛠️ Comandos Útiles

- **Compilar proyecto:**

```bash
npm run build
```

- **Ejecutar localmente:**

```bash
npm start
```

- **Serverless Offline:** _(para entorno local Lambda)_

```bash
npx serverless offline
```

- **Desplegar en AWS con Swagger:**

```bash
npm run deploy:patch-swagger
```

---
