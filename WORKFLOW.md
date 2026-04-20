Workflow del proyecto

Ramas:
- main: versión estable
- dev: desarrollo diario
- feature/*: cambios grandes o experimentales

Pasos normales:

1. Ir a dev
   git checkout dev
   git pull

2. Si el cambio es grande, crear una feature
   git checkout -b feature/nombre-del-cambio

3. Trabajar y hacer commits chicos
   git add .
   git commit -m "Agregar validación de asistencia"

4. Cuando la feature esté lista, volver a dev
   git checkout dev
   git merge feature/nombre-del-cambio
   git branch -d feature/nombre-del-cambio

5. Probar que todo funcione en dev

6. Pasar a main cuando esté estable
   git checkout main
   git merge dev

7. Crear tag de versión
   git tag v1.0
   git push origin main
   git push origin v1.0

8. Volver a dev para seguir trabajando
   git checkout dev