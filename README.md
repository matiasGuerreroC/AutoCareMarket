# AutoCare Market

Marketplace de productos para el cuidado de automóviles, desarrollado como parte del proyecto final del curso **Ingeniería Web y Móvil (ICI-4247)**.

## Tabla de contenidos

1. [Descripción](#descripción)  
2. [Integrantes](#integrantes)  
3. [Tecnologías](#tecnologías)  
4. [Entrega Parcial 1](#entrega-parcial-1)  
   - [Requerimientos](#requerimientos)  
     - [Roles del Sistema](#roles-del-sistema)  
     - [Requisitos Funcionales](#requisitos-funcionales)  
     - [Requisitos No Funcionales](#requisitos-no-funcionales)  
   - [Prototipo UI/UX](#prototipo-uiux)  
   - [Definición de la Navegación y Experiencia de Usuario (UX)](#definición-de-la-navegación-y-experiencia-de-usuario-ux)  
     - [Navegación General](#navegación-general)  
     - [Flujo del Usuario](#flujo-del-usuario)  
     - [Principios de UX aplicados](#principios-de-ux-aplicados)  
   - [Componentes reutilizables implementados](#componentes-reutilizables-implementados)  

5. [Entrega Parcial 2](#entrega-parcial-2)  
   - [Backend y API REST (Node.js + Express + MongoDB)](#backend-y-api-rest-nodejs--express--mongodb)  
   - [Scripts y modelos](#scripts-y-modelos)  
   - [Autenticación y Sesiones](#autenticación-y-sesiones)  
   - [Integración frontend + backend](#integración-frontend--backend)  

6. [Estructura del proyecto](#estructura-del-proyecto)  
7. [Instrucciones para correr el proyecto](#instrucciones-para-correr-el-proyecto)  
8. [Estado actual del proyecto](#estado-actual-del-proyecto) 

## Descripción

**AutoCare Market** es una plataforma web y móvil desarrollada con Ionic y Angular, que permite a usuarios comprar productos relacionados con el cuidado y mantenimiento de automóviles. Además, ofrece un panel de administración para gestionar productos y pedidos.

## Integrantes

- Cesar Anabalon – 21.587.124-k
- Matias Guerrero – 19.743.134-2

## Tecnologías

* **Frontend:** Ionic + Angular
* **Backend:** Node.js + Express + MongoDB 
* **Lenguajes:** TypeScript (frontend) y JavaScript (backend)
* **Estilos:** SCSS (con Ionic Components)
* **Base de datos:** MongoDB Atlas con Mongoose  
* **Autenticación:** JWT (JSON Web Tokens)  
* **Control de versiones:** Git + GitHub
* **Herramientas adicionales:**

  * `HttpClient` para consumo de APIs desde el frontend
  * `dotenv` y `cors` para configuración y seguridad en el backend
  * `bcryptjs` para hashing de contraseñas
 
## Entrega Parcial 1:

### Requerimientos

#### Roles del Sistema
- **Usuario (ROL-USR):** El usuario es la persona que navega por el catálogo de productos, realiza búsquedas, gestiona su carrito de compras y completa pedidos. También puede dejar reseñas sobre los productos adquiridos. Su experiencia se centra en la exploración fluida de productos, una interfaz atractiva y una navegación optimizada tanto en dispositivos móviles como de escritorio.
- **Administrador (ROL-ADM):** El administrador tiene acceso a un panel especializado desde el cual puede realizar operaciones de gestión del catálogo (añadir, editar, eliminar productos), controlar el stock, y administrar pedidos realizados por los usuarios. Además, puede revisar reseñas de productos y monitorear el funcionamiento general de la plataforma.

#### Requisitos Funcionales
- RF-01-USR: Visualización del catálogo de productos categorizados (ej. limpieza, herramientas, accesorios).
- RF-02-USR: Búsqueda de productos por nombre, categoría o palabra clave, y filtrado por precio o disponibilidad.
- RF-03-USR: Gestión del carrito de compras: añadir, eliminar productos y visualizar resumen.
- RF-04-USR: Proceso de compra con formulario de datos personales, dirección y confirmación del pedido.
- RF-05-USR: Sistema de reseñas y valoraciones con calificación y comentarios por producto.
- RF-06-USR: Agregar productos a una lista de favoritos para acceder a ellos fácilmente en otra ocasión.
- RF-07-USR: Visualización de información institucional y formulario de contacto desde la pantalla “Sobre Nosotros”.
- RF-08-ADM: CRUD de productos: creación, edición, eliminación y listado de productos con sus detalles.
- RF-09-ADM: Gestión de pedidos realizados por usuarios, con opción de cambiar estado del pedido.

#### Requisitos No Funcionales
- RNF-01: La aplicación debe ser completamente responsiva para funcionar correctamente en dispositivos móviles y escritorio.
- RNF-02: El sistema debe estar estructurado de forma modular, permitiendo escalabilidad y mantenimiento eficiente del código.
- RNF-03: El proyecto debe estar correctamente documentado y versionado en GitHub, incluyendo uso de Issues, Pull Requests y ramas.
- RNF-04: La aplicación debe ofrecer un rendimiento óptimo, con carga rápida de contenido y navegación fluida.
- RNF-05: Implementación de seguridad para datos sensibles como contraseñas, utilizando JWT y validaciones.
- RNF-06: La arquitectura del sistema debe permitir escalabilidad e integración con futuras funcionalidades (ej. pasarela de pagos).
- RNF-07: La experiencia de usuario debe ser clara, intuitiva y accesible para todos los perfiles.

### Prototipo UI/UX
El prototipo de la aplicación, incluyendo los mockups de las pantallas principales y los formularios de inicio de sesión y registro, está disponible en Figma: [Enlace al prototipo](https://www.figma.com/design/SO7kOEef8SZwnbPXQBWL5j/AutoCare-Market---Prototipo-UI?node-id=27-351&t=zjivsVNCvianOUnj-1).

### Definición de la Navegación y Experiencia de Usuario (UX)

#### Navegación General
AutoCare Market implementa una navegación basada en un header superior visible tanto en versión móvil como escritorio, con acceso directo a las secciones principales de la aplicación. Este header es un componente reutilizable (`HeaderComponent`), ya implementado en las vistas **home** y **about**, y se integrará en el resto de las páginas.

**Pantallas creadas hasta ahora:**
- **home:** Página de inicio con productos destacados y oferta de la semana.
- **about:** Página institucional con información de la app.
- **login:** Formulario de inicio de sesión.
- **register:** Formulario de registro de usuarios.

**Secciones del menú principal (`HeaderComponent`):**
- Inicio
- Buscar (barra de búsqueda incluida)
- Productos / Categorías (actualmente simuladas)
- Sobre Nosotros
- Carrito
- Iniciar Sesión

#### Flujo del Usuario

**Usuario nuevo:**
1. Abre la app y visualiza la pantalla de inicio.
2. Explora productos y entra al detalle de uno.
3. Decide registrarse y completa el formulario.
4. Agrega productos al carrito y realiza una compra.
5. Recibe confirmación del pedido.

**Usuario recurrente:**
1. Inicia sesión desde la pantalla principal o cuando intenta comprar.
2. Consulta su historial de compras desde el perfil.
3. Agrega productos a favoritos para comprarlos después.
4. Accede a la sección "Sobre Nosotros" para información adicional.

#### Principios de UX aplicados
- **Accesibilidad:** Interfaz limpia y botones grandes para facilitar la navegación móvil.
- **Consistencia visual:** Uso de componentes de Ionic para mantener coherencia entre las vistas.
- **Feedback inmediato:** Confirmaciones visuales al interactuar con productos, compras o formularios.
- **Minimalismo:** Diseño claro que evita la sobrecarga de información en pantalla.
- **Reducción de fricción:** El usuario puede navegar libremente por el contenido sin necesidad de estar registrado, salvo al momento de realizar una compra.

### Componentes reutilizables implementados

- **HeaderComponent:** Barra de navegación con logo, búsqueda, menú y botones dinámicos según sesión.
- **FooterComponent:** Pie de página con enlaces útiles y redes sociales.
- **SectionTitleComponent:** Título de sección estilizado con fondo degradado.
- **ProductCarouselComponent:** Carrusel dinámico para mostrar productos destacados.
- **ReviewCarouselComponent:** Carrusel con reseñas de usuarios, avatar e iconos de estrella.
- **CustomInputComponent:** Campo de entrada reutilizable con estilos personalizados, validación visual y soporte para mostrar/ocultar contraseñas. Actualmente utilizado en la vista de Login.

## Entrega Parcial 2

### Backend y API REST (Node.js + Express + MongoDB)

* Se creó el servidor Express (`backend/src/index.js`).
* Se configuró la conexión a la Base de Datos con MongoDB Atlas usando Mongoose.
* Se implementaron modelos (`User`, `Producto`, `Reseña`) con validaciones.
* Se crearon rutas RESTful para:

  * `/api/productos-destacados`
  * `/api/resenas`
  * `/api/auth/register`
  * `/api/auth/login`
 
* Endpoints disponibles:

  * `POST /api/auth/register`
  * `POST /api/auth/login`
  * `GET /api/productos-destacados`
  * `GET /api/resenas`

#### Scripts y modelos

* Script para crear un administrador inicial: `src/scripts/createAdmin.js`
* Script de carga de datos mock: `src/scripts/seedData.js`
* Modelos definidos:

  * `User`
  * `Producto`
  * `Resena`

### Autenticación y Sesiones

- Registro de usuarios con validaciones completas.
- Inicio de sesión con generación de token JWT.
- Los tokens se almacenan en el navegador del usuario (localStorage).
- Se usó bcryptjs para proteger contraseñas.
- Visualización dinámica del estado de sesión en el `HeaderComponent`:
  - Si el usuario está autenticado: muestra nombre y botón de logout.
  - Si no está autenticado: muestra botón "Iniciar Sesión".

### Integración frontend + backend

* Se consumen productos y reseñas reales desde el backend.
* `AuthService` y `HttpClient` integrados.
* Datos dinámicos cargados desde la API.
* Variables de entorno (`environment.ts`) con `apiUrl`.
* Se implementó `AuthService` en Angular para login y registro.
* El estado de sesión se refleja en el `HeaderComponent` (nombre del usuario logueado).

## Estructura del proyecto

```bash
AutoCareMarket/
├── frontend/                         # Proyecto frontend con Ionic + Angular
│   ├── src/
│   │   ├── app/
│   │   │   └── pages/                # Páginas de la aplicación
│   │   │       ├── home/            # Página de inicio
│   │   │       ├── login/           # Página de inicio de sesión
│   │   │       ├── register/        # Página de registro
│   │   │       └── about/           # Página "Sobre Nosotros"
│   │   │
│   │   │   └── components/          # Componentes reutilizables
│   │   │       ├── header/          # Componente de encabezado
│   │   │       ├── footer/          # Componente de pie de página
│   │   │       ├── custom-input/    # Componente de entrada personalizada
│   │   │       ├── product-carousel/ # Carrusel de productos
│   │   │       ├── review-carousel/  # Carrusel de reseñas
│   │   │       └── section-title/    # Título de sección estilizado
│   │   │
│   │   └── shared/                  # Servicios y utilidades compartidas
│   ├── assets/                      # Imágenes y recursos estáticos
│   ├── environments/               # Configuración de entornos
│   └── theme/                      # Estilos globales
│   ├── package.json
│   └── ionic.config.json
│
├── backend/                         # Proyecto backend con Node.js + Express
│   ├── src/
│   │   ├── index.js                # Punto de entrada del servidor
│   │   ├── app.js                  # Configuración principal de Express
│   │   ├── config/                 # Configuración de conexión a la base de datos
│   │   ├── routes/                 # Rutas de la API (productos, reseñas, autenticación)
│   │   ├── models/                 # Modelos de datos Mongoose (Usuario, Producto, Reseña)
│   │   ├── scripts/                # Scripts para crear admin o insertar datos
│   ├── .env                        # Variables de entorno
│   ├── package.json
│   └── .gitignore

│
├── otros/                           # Recursos adicionales (mockups, diagramas, etc.)
└── README.md
```

## Instrucciones para correr el proyecto

### Requisitos previos

- Node.js y npm instalados
- Ionic CLI instalado globalmente (`npm install -g @ionic/cli`)

### Backend (Node.js + Express)

1. Ir a la carpeta del backend:

```bash
cd backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el servidor:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

---

### Frontend (Ionic + Angular)

1. Ir a la carpeta del frontend:

```bash
cd frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar la aplicación:

```bash
ionic serve
```

### Accesos de prueba (admin)

```bash
Email:    admin@example.com
Password: Password123
```

Puedes usar MongoDB Compass para ver los datos de la base:

```bash
mongodb+srv://autocaremarket:<password>@cluster0.lspkv7l.mongodb.net/
```

## Estado actual del proyecto

**Entrega Parcial 1 finalizada:**

* ✅ EP 1.1 a EP 1.8 implementados
* ✅ Vistas desarrolladas: Home, About, Login y Register
* ✅ Componentes reutilizables implementados y estilos adaptados

**Entrega Parcial 2 finalizada:**

* ✅ EP 2.1: Creación del servidor backend con Node.js y Express
* ✅ EP 2.2: Configuración y modelado con MongoDB Atlas + Mongoose
* ✅ EP 2.3: Desarrollo de API REST con endpoints básicos (productos y reseñas)
* ✅ EP 2.4: Consumo de API desde el frontend utilizando HttpClient
* ✅ EP 2.5: Autenticación con JWT (registro e inicio de sesión)
* ✅ EP 2.6: Validación de usuarios, sesiones y visualización dinámica en la UI
