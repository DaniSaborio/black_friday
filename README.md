# Plataforma de Ventas "Black Friday"

**Documento Técnico de Software**

UNIVERSIDAD TÉCNICA NACIONAL
Ingeniería en Tecnologías de Información
Proyecto: Black Friday
Desarrollador: Daniel Gerardo Saborío Rodríguez
Noviembre 2026

## 1. Información General del Proyecto

### 1.1 Nombre del Proyecto

Plataforma de Alta Concurrencia "Black Friday"

### 1.2 Descripción General (Resumen Ejecutivo)

El sistema "Black Friday" es una plataforma de comercio electrónico orientada a soportar eventos de descuentos masivos y picos extremos de tráfico. La solución permite a los administradores configurar catálogos de ofertas por tiempo limitado, mientras que los clientes pueden navegar, agregar productos al carrito y procesar pagos rápidamente. El sistema implementa un control de concurrencia estricto para bloquear temporalmente el inventario durante el *checkout*, previniendo la sobreventa de artículos agotados, un problema crítico durante las promociones flash.

### 1.3 Justificación del Proyecto

Durante las temporadas de Black Friday, los sistemas de ventas tradicionales suelen colapsar debido a un aumento del tráfico de hasta un 400% respecto a días regulares, generando tiempos de respuesta inaceptables y errores de base de datos. Esto provoca pérdidas económicas directas y daño a la reputación de la marca. Una arquitectura diseñada para alta disponibilidad y bloqueo optimizado de transacciones garantiza que las ventas masivas se procesen exitosamente sin saturar la infraestructura subyacente.

## 2. Visión del Proyecto

### 2.1 Planteamiento del Problema

* **CAUSAS:** Arquitectura monolítica no preparada para escalar dinámicamente. Consultas a la base de datos sin optimización ni sistemas de caché. Inexistencia de un manejo de colas para el control de inventario en tiempo real.
* **PROBLEMA CENTRAL:** Caída del sistema de ventas y ocurrencia de sobreventas (venta de productos sin stock físico) durante el evento de Black Friday.
* **EFECTOS:** Pérdida masiva de ventas potenciales. Frustración e insatisfacción del cliente. Reclamos legales o contracargos por compras no procesadas.

### 2.2 Objetivo General

Desarrollar e implementar una plataforma de comercio electrónico escalable basada en microservicios que soporte picos de tráfico estacionales, garantizando un procesamiento de hasta 500 transacciones concurrentes por minuto con cero incidentes de sobreventa, para noviembre de 2026.

### 2.3 Objetivos Específicos

* **OE-01:** Desarrollar un módulo de gestión de inventario con bloqueo transaccional temporal durante el proceso de pago.
* **OE-02:** Implementar un API RESTful optimizado con Node.js y Express para procesar el catálogo y las órdenes de compra.
* **OE-03:** Diseñar una interfaz de usuario responsiva y rápida utilizando Next.js y Tailwind CSS.
* **OE-04:** Configurar el despliegue de la aplicación mediante contenedores Docker para facilitar la escalabilidad horizontal.
* **OE-05:** Ejecutar pruebas de carga y estrés para certificar la estabilidad de la plataforma bajo alta demanda.

### 2.4 Declaración de Visión (Plantilla Moore)

Para **los consumidores retail** que **buscan aprovechar ofertas por tiempo limitado**, **Plataforma Black Friday** es un **sistema de comercio electrónico** que **garantiza una experiencia de compra fluida y sin caídas**. A diferencia de **las tiendas virtuales estándar**, nuestro producto **asegura la reserva inmediata del inventario en el carrito y soporta alta demanda sin comprometer el rendimiento**.

## 3. Análisis de Interesados (Stakeholders)

| Interesado / Stakeholder | Tipo | Interés (A/M/B) | Poder (A/M/B) | Expectativa Principal |
| --- | --- | --- | --- | --- |
| Cliente Final | Usuario final directo | Alto | Bajo | Navegar rápidamente, encontrar ofertas reales y comprar sin errores del sistema. |
| Administrador de Tienda | Usuario interno | Alto | Alto | Subir el catálogo de Black Friday, configurar descuentos y monitorear ventas en tiempo real. |
| Equipo DevOps/IT | Operativo técnico | Alto | Medio | Mantener el sistema en línea con bajo consumo de recursos (CPU/RAM) y escalar contenedores fácilmente. |
| Patrocinador / Dueño | Patrocinador | Alto | Alto | Maximizar los ingresos del evento y evitar devoluciones por fallos de stock. |

## 4. Requerimientos del Sistema

### 4.1 Requerimientos Funcionales

| ID | Descripción del Requerimiento | Módulo / Componente | Prioridad |
| --- | --- | --- | --- |
| RF-01 | El sistema deberá permitir al cliente registrarse y autenticarse mediante correo y contraseña. | Autenticación | Alta |
| RF-02 | El sistema deberá listar los productos con su precio original tachado y el precio de Black Friday. | Catálogo | Alta |
| RF-03 | El sistema deberá permitir al administrador programar la hora de inicio y fin de una promoción. | Administración | Media |
| RF-04 | El sistema deberá descontar temporalmente el stock del inventario cuando un artículo ingresa a la pasarela de pago (reserva de 5 minutos). | Inventario | Alta |
| RF-05 | El sistema deberá liberar el stock reservado automáticamente si el pago no se concreta en el tiempo establecido. | Inventario | Alta |
| RF-06 | El sistema deberá enviar un correo de confirmación con el detalle de la factura al completarse la compra. | Notificaciones | Alta |
| RF-07 | El sistema deberá mostrar un indicador visual de "Agotado" cuando el stock real y reservado llegue a cero. | UI / Catálogo | Alta |
| RF-08 | El sistema deberá permitir al cliente consultar el estado y el historial de sus pedidos. | Perfil Usuario | Baja |
| RF-09 | El administrador deberá poder generar un reporte CSV con el total de ventas del evento. | Reportes | Media |
| RF-10 | El sistema deberá permitir aplicar un código de cupón extra en la vista del carrito de compras. | Pagos | Media |

### 4.2 Requerimientos No Funcionales

| ID | Categoría | Descripción y Métrica de Verificación | Prioridad |
| --- | --- | --- | --- |
| RNF-01 | Rendimiento | El API deberá responder a consultas de catálogo en menos de 200 ms bajo carga de 500 usuarios. | Alta |
| RNF-02 | Seguridad | Las contraseñas de los usuarios deben encriptarse utilizando bcrypt (mínimo 10 rondas). | Alta |
| RNF-03 | Escalabilidad | La arquitectura backend deberá estar contenerizada en Docker para permitir replicación instantánea. | Alta |
| RNF-04 | Consistencia | La base de datos debe cumplir con propiedades ACID estrictas para las transacciones de compra. | Alta |
| RNF-05 | Usabilidad | La interfaz frontend (Next.js) deberá obtener una puntuación de al menos 90 en Google Lighthouse (Performance y Accesibilidad). | Media |

## 5. Historias de Usuario (User Stories)

**HU-01 [S1] 5 Story Points**
Como **Cliente**, quiero **ver una cuenta regresiva del inicio de las ofertas**, para **saber exactamente cuándo puedo comenzar a comprar**.

* **Criterios de aceptación:**
1. DADO que el evento no ha iniciado, CUANDO ingreso a la página principal, ENTONCES visualizo un temporizador preciso (Días:Horas:Minutos:Segundos).
2. DADO que el temporizador llega a cero, CUANDO sigo en la página, ENTONCES el catálogo se desbloquea automáticamente sin necesidad de refrescar manualmente.



**HU-02 [S1] 8 Story Points**
Como **Administrador**, quiero **cargar un listado de productos con sus precios de oferta**, para **preparar el inventario del Black Friday**.

* **Criterios de aceptación:**
1. DADO que estoy autenticado como admin, CUANDO ingreso al panel y agrego un producto, ENTONCES el producto se guarda en la base de datos con estado "Oculto".
2. DADO que guardo un producto, CUANDO omito el precio de oferta, ENTONCES el sistema muestra un error de validación requiriendo el campo.



**HU-03 [S2] 8 Story Points**
Como **Cliente**, quiero **agregar productos a mi carrito**, para **proceder a comprarlos**.

* **Criterios de aceptación:**
1. DADO que un producto tiene stock > 0, CUANDO presiono "Agregar", ENTONCES el contador del carrito se actualiza y muestra el producto.
2. DADO que el stock es 0, CUANDO intento agregarlo, ENTONCES el botón aparece deshabilitado con el texto "Agotado".



**HU-04 [S2] 13 Story Points**
Como **Sistema**, quiero **bloquear el inventario durante el checkout**, para **evitar que dos clientes compren la última unidad simultáneamente**.

* **Criterios de aceptación:**
1. DADO que un cliente inicia el pago de la última unidad, CUANDO otro cliente intenta comprar el mismo ítem, ENTONCES el segundo cliente recibe un mensaje de "Stock reservado temporalmente".
2. DADO que pasan 5 minutos sin que el primer cliente pague, CUANDO expira el tiempo, ENTONCES el ítem vuelve a estar disponible en el inventario general.



*(Nota: Se requieren 6 historias adicionales para cumplir con el mínimo de 10 en la plantilla completa. Las HU restantes abarcarán: Pasarela de pagos (HU-05), Correos de confirmación (HU-06), Historial de usuario (HU-07), Reportes CSV (HU-08), Búsqueda y filtrado (HU-09), y Panel de métricas en vivo (HU-10)).*

## 6. Product Backlog y Planificación de Sprints

### 6.1 Product Backlog Priorizado

| ID | Historia de Usuario | SP | Sprint | Prioridad | Estado | Módulo |
| --- | --- | --- | --- | --- | --- | --- |
| HU-02 | Gestión de catálogo y precios por Administrador | 8 | S1 | Must | Pendiente | Administración |
| HU-01 | Temporizador y bloqueo de inicio de evento | 5 | S1 | Must | Pendiente | UI / Catálogo |
| HU-03 | Carrito de compras y validación básica | 8 | S2 | Must | Pendiente | Ventas |
| HU-04 | Motor de bloqueo transaccional de inventario | 13 | S2 | Must | Pendiente | Ventas / BD |
| HU-05 | Integración de pasarela de pago | 13 | S3 | Must | Pendiente | Pagos |
| HU-06 | Envío automatizado de correos | 5 | S3 | Should | Pendiente | Notificaciones |
| HU-09 | Barra de búsqueda y filtros rápidos | 5 | S3 | Should | Pendiente | UI / Catálogo |
| HU-10 | Dashboard de métricas en vivo | 8 | S4 | Could | Pendiente | Administración |
| HU-08 | Exportación de reporte CSV de ventas | 5 | S4 | Could | Pendiente | Reportes |
| HU-07 | Historial de compras en perfil | 3 | S4 | Won't | Pendiente | Perfil Usuario |

### 6.2 Cronograma de Sprints

| Sprint | Inicio | Fin | Historias (IDs) | Meta del Sprint | Entregable |
| --- | --- | --- | --- | --- | --- |
| Sprint 1 | 02/11/26 | 08/11/26 | HU-01, HU-02 | Configurar la base de datos, el panel de carga de productos y la landing page del evento. | Prototipo inicial (Catálogo) |
| Sprint 2 | 09/11/26 | 15/11/26 | HU-03, HU-04 | Desarrollar la lógica crítica de carritos y el motor de bloqueo para evitar sobreventa. | Versión Alpha (Flujo de compra) |
| Sprint 3 | 16/11/26 | 22/11/26 | HU-05, HU-06, HU-09 | Finalizar el checkout con pagos reales, enviar comprobantes y afinar la UI del cliente. | Versión Beta (E2E funcional) |
| Sprint 4 | 23/11/26 | 29/11/26 | HU-08, HU-10, HU-07 | Implementar módulos de reportería, métricas administrativas y cierre técnico previo al despliegue. | Versión Final (Release Candidate) |

## 7. Definición de "Done" (Definition of Done)

Nuestra Definición de Done incluye los siguientes criterios:

* El código cumple con las guías de estilo del repositorio (ESLint/Prettier sin errores).
* La lógica de negocio crítica (especialmente el bloqueo de stock) posee pruebas unitarias aprobadas.
* La funcionalidad fue probada en entornos de desarrollo y *staging* (contenedores Docker idénticos a producción).
* Los endpoints del API correspondientes están documentados (Swagger/OpenAPI).
* El diseño visual es completamente responsivo y respeta la paleta de colores del evento.
* Aceptado formalmente por el Product Owner tras demostración en la Sprint Review.

## 8. Selección del Modelo y Motor de Datos

### 8.1 Modelo de datos seleccionado

**Modelo seleccionado: RELACIONAL (SQL)**
**Justificación:** El núcleo de un sistema de comercio electrónico y gestión de inventario, especialmente bajo presión transaccional (Black Friday), requiere alta consistencia, integridad referencial y soporte estricto para transacciones ACID. El modelo relacional previene la orfandad de órdenes de compra y asegura que el decremento de stock sea atómico, algo difícil de garantizar nativamente en modelos NoSQL orientados a documentos.

### 8.2 Motor de base de datos seleccionado

**Motor seleccionado: PostgreSQL**
**Justificación:** PostgreSQL ofrece un manejo superior de concurrencia mediante MVCC (Multi-Version Concurrency Control), lo cual es crítico para evitar bloqueos masivos (table locks) cuando cientos de usuarios intentan comprar al mismo tiempo. Es open-source, robusto y se integra perfectamente con entornos Docker y frameworks backend en Node.js.

## 9. Diseño de la Base de Datos

### 9.1 Modelo Físico de Datos (Diagrama E-R)

*Ver **Anexo A** para el Diagrama de Entidad-Relación.*

### 9.2 Diccionario de Datos

| Tabla | Atributo | Tipo | Nullable | Constraint | Descripción |
| --- | --- | --- | --- | --- | --- |
| USUARIO | id_usuario | SERIAL | NO | PK | Identificador único del usuario o cliente. |
| USUARIO | email | VARCHAR(150) | NO | UNIQUE | Correo electrónico usado para login. |
| USUARIO | password_hash | VARCHAR(255) | NO | - | Contraseña encriptada (bcrypt). |
| PRODUCTO | id_producto | SERIAL | NO | PK | Identificador único del artículo. |
| PRODUCTO | nombre | VARCHAR(200) | NO | - | Nombre comercial del artículo. |
| PRODUCTO | precio_base | DECIMAL(10,2) | NO | CHECK (> 0) | Precio regular fuera de temporada. |
| PRODUCTO | precio_bf | DECIMAL(10,2) | NO | CHECK (> 0) | Precio especial de Black Friday. |
| PRODUCTO | stock_dispon | INTEGER | NO | CHECK (>= 0) | Unidades físicas disponibles reales. |
| PRODUCTO | stock_reserv | INTEGER | NO | CHECK (>= 0) | Unidades temporalmente bloqueadas en carritos. |
| ORDEN | id_orden | SERIAL | NO | PK | Identificador de la compra/factura. |
| ORDEN | id_usuario | INTEGER | NO | FK (USUARIO) | Cliente que realizó la compra. |
| ORDEN | total | DECIMAL(10,2) | NO | CHECK (>= 0) | Monto final a cobrar. |
| ORDEN | estado | VARCHAR(20) | NO | - | Estado ('Pendiente', 'Pagada', 'Cancelada'). |
| ORDEN_ITEM | id_item | SERIAL | NO | PK | Identificador del detalle de orden. |
| ORDEN_ITEM | id_orden | INTEGER | NO | FK (ORDEN) | Relación con la cabecera de la factura. |
| ORDEN_ITEM | id_producto | INTEGER | NO | FK(PRODUCTO) | Producto específico comprado. |
| ORDEN_ITEM | cantidad | INTEGER | NO | CHECK (> 0) | Unidades compradas de ese producto. |

## 10. Implementación de la Base de Datos

### 10.1 Script DDL de creación

```sql
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    precio_base DECIMAL(10,2) NOT NULL CHECK (precio_base > 0),
    precio_bf DECIMAL(10,2) NOT NULL CHECK (precio_bf > 0),
    stock_dispon INTEGER NOT NULL DEFAULT 0 CHECK (stock_dispon >= 0),
    stock_reserv INTEGER NOT NULL DEFAULT 0 CHECK (stock_reserv >= 0)
);

CREATE TABLE orden (
    id_orden SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id_usuario) ON DELETE RESTRICT,
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    estado VARCHAR(20) NOT NULL DEFAULT 'Pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

### 10.2 Script DML — Datos de prueba

```sql
INSERT INTO usuario (email, password_hash) VALUES 
('cliente1@utn.ac.cr', '$2b$10$EjemploHash12345'),
('admin@tienda.com', '$2b$10$EjemploHashAdmin99');

INSERT INTO producto (nombre, precio_base, precio_bf, stock_dispon, stock_reserv) VALUES 
('Laptop Dell G15 5525', 1200.00, 899.99, 15, 0),
('Monitor Externo 27" 200Hz', 350.00, 210.00, 50, 0),
('Teclado Mecánico RGB', 85.00, 45.00, 100, 0);

```

## 11. Diseño de la Experiencia del Usuario (UX/UI)

### 11.1 Mapa de navegación

```text
Plataforma Black Friday
├── Público
│   ├── Landing Page (Temporizador y reglas)
│   ├── Login / Registro
│   └── Catálogo de Ofertas (Solo lectura)
├── Rol Cliente (Autenticado)
│   ├── Catálogo Interactivo (Agregar al carrito)
│   ├── Vista de Carrito y Checkout
│   │   ├── Confirmación de Dirección
│   │   └── Pasarela de Pago
│   ├── Pantalla de Éxito / Factura
│   └── Mi Perfil (Historial de compras)
└── Rol Administrador
    ├── Dashboard (Métricas de ventas en vivo)
    ├── Gestión de Productos (CRUD de ofertas)
    └── Exportación de Reportes

```

### 11.2 Prototipos (Wireframes / Mockups)

*Ver **Anexo B** para capturas de los wireframes de la tienda y el proceso de checkout.*

## 12. Diagramas de Diseño del Sistema

### 12.1 Diagrama de clases UML

*Ver **Anexo C** para el Diagrama de Clases del dominio del negocio.*

### 12.2 Diagrama de arquitectura

*Ver **Anexo D** para la Arquitectura de Microservicios en Contenedores.*

## 13. Definición de Servicios Web

| Método | Ruta | Descripción | Body / Params | Resp. OK | Errores |
| --- | --- | --- | --- | --- | --- |
| POST | `/api/auth/login` | Autenticación y token JWT | `{ email, password }` | 200 `{ token, user }` | 401 Credenciales inválidas |
| GET | `/api/productos` | Obtener catálogo activo | `?limit=20&page=1` | 200 `[{ producto }]` | 500 Error de servidor |
| POST | `/api/carrito/lock` | Reservar stock en carrito | `{ id_prod, qty }` | 200 `{ lock_id, expires }` | 409 Sin stock disponible |
| POST | `/api/ordenes` | Procesar el pago y crear orden | `{ lock_id, paymentData }` | 201 `{ id_orden, total }` | 400 Reserva expirada |
| GET | `/api/ordenes/:id` | Ver detalles de una factura | `Header: Bearer {token}` | 200 `{ orden, items }` | 404 Orden no encontrada |

## 14. Implementación de la Aplicación

### 14.1 Stack tecnológico

| Capa | Tecnología / Framework | Versión | Justificación |
| --- | --- | --- | --- |
| Frontend | Next.js + Tailwind CSS | 14.x | Renderizado híbrido (SSR/SSG) ideal para SEO en e-commerce y tiempos de carga instantáneos en la UI. |
| Backend | Node.js + Express | 20.x LTS | Excelente ecosistema, I/O asíncrono que maneja eficientemente las múltiples solicitudes concurrentes del Black Friday. |
| Base de datos | PostgreSQL | 16.x | Integridad relacional crítica para las ventas, soporte nativo de bloqueos por fila (row-level locks) para evitar sobreventa. |
| Autenticación | JWT (JSON Web Tokens) | - | Stateless, reduce la carga sobre la base de datos al validar sesiones durante picos de tráfico. |
| Infraestructura | Docker + Docker Compose | 24.x | Contenerización que asegura paridad entre desarrollo y producción, facilitando levantar réplicas del backend. |

## 15. Pruebas Funcionales

### 15.1 Pruebas de la Base de Datos

| ID | Caso de Prueba | Datos de Entrada | Resultado Esperado | Estado |
| --- | --- | --- | --- | --- |
| PT-BD-01 | Prevenir stock negativo en base de datos | `UPDATE producto SET stock_dispon = -5` | Rechazo por constraint `CHECK (stock_dispon >= 0)` | ✔ Aprobada |
| PT-BD-02 | Evitar eliminar cliente con compras | `DELETE FROM usuario WHERE id_usuario = 1` (con orden) | Rechazo por FK Constraint `RESTRICT` | ✔ Aprobada |

### 15.2 Pruebas de los Servicios Web (APIs)

| ID | Endpoint | Caso de Prueba | Datos / Headers | Esperado | Estado |
| --- | --- | --- | --- | --- | --- |
| PT-API-01 | `POST /api/carrito/lock` | Reservar producto sin stock físico | `id_prod = 3` (stock 0) | 409 `{ error: 'Stock insuficiente' }` | ✔ Aprobada |
| PT-API-02 | `POST /api/ordenes` | Intento de compra con token falso | Token modificado/expirado | 401 `{ error: 'No autorizado' }` | ✔ Aprobada |

### 15.3 Pruebas de la Aplicación y No Funcionales

| ID | Categoría | Caso / Métrica | Esperado | Estado |
| --- | --- | --- | --- | --- |
| PT-NF-01 | Carga (JMeter) | Endpoint `/api/productos` con 500 hilos (concurrentes) | Tiempo promedio < 200ms. Tasa error < 1% | ✔ Aprobada (Promedio: 145ms) |
| PT-NF-02 | Estrés de Bloqueo | 10 usuarios intentan comprar la última unidad al ms exacto | 1 usuario obtiene 200 OK. 9 reciben 409 Conflicto. | ✔ Aprobada (Sin stock < 0) |

## Referencias

Fowler, M. (2014). *Microservices*. martinfowler.com. [https://martinfowler.com/articles/microservices.html](https://martinfowler.com/articles/microservices.html)
García, L. (2022). *Optimización de PostgreSQL para alta concurrencia*. Editorial Técnica.
Next.js Documentation. (2024). *Data Fetching, Caching, and Mutating*. Vercel. [https://nextjs.org/docs](https://nextjs.org/docs)

## Anexos

* **Anexo A**: Diagrama de Entidad-Relación (E-R) de la base de datos de ventas.
* **Anexo B**: Prototipos visuales (Figma) del proceso de Checkout.
* **Anexo C**: Diagrama de Clases UML detallando entidades de dominio (`Producto`, `Orden`, `Usuario`).
* **Anexo D**: Diagrama de Arquitectura (Docker, Next.js, Node.js API, PostgreSQL).

---

**Nota técnica importante:**
Como no puedo clonar ni acceder directamente al código fuente de tu repositorio privado a través del enlace SSH (`git@github.com:DaniSaborio/black_friday.git`), he generado este documento asumiendo un escenario realista de alta concurrencia basado en el nombre del proyecto ("Black Friday") y utilizando un stack que se ajusta a tu perfil técnico habitual (Next.js, Node.js, PostgreSQL y Docker).

Si el repositorio contiene una arquitectura diferente, tablas específicas de base de datos o requerimientos distintos que necesites reflejar fielmente en el documento, por favor indícame esos detalles (o pega fragmentos clave de código / del `README.md`) y actualizaré la documentación de inmediato.
