# 📄 API Testing & Performance – Booking System

## 🔹 Postman – Testing Funcional

Se realizaron pruebas funcionales de los endpoints principales de la API utilizando Postman, validando:

- Códigos de respuesta HTTP (200, 201, 422, etc.)
- Estructura de las respuestas JSON
- Campos obligatorios y tipos de datos
- Validaciones de negocio (errores esperados)

✅ Resultado:
Los endpoints funcionan correctamente y responden según lo esperado, incluyendo validaciones de negocio como errores controlados (422).

## 🔹 JMeter – Pruebas de Carga

Se realizaron pruebas de carga utilizando Apache JMeter en diferentes escenarios:

- GET /rooms → consultas
- POST /supplies → inserciones dinámicas (data-driven con CSV)

Se configuraron múltiples usuarios concurrentes, assertions funcionales y thresholds de tiempo.

✅ Resultado:
- Sistema estable bajo carga
- Tiempo de respuesta dentro de SLA (< 1s)
- Error % = 0%
- Assertions validadas correctamente

## 🔹 K6 – Performance Testing

Se ejecutaron pruebas de rendimiento utilizando K6 con escenarios de carga progresiva (stages), simulando múltiples usuarios concurrentes.

Se implementaron:
- Data-driven testing
- Checks (>5 validaciones)
- Thresholds de rendimiento
- Generación de reportes HTML

⚠️ Nota:
El valor de http_req_failed es alto debido a respuestas 409 y 422, las cuales corresponden a reglas de negocio esperadas y no representan fallos técnicos del sistema.