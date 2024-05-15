# Proyecto Final

<h3>Manual de instalación 📖</h3>

<p>En el servidor</p>
<p><b> apt update && apt upgrade </b></p>
<p>Instalar docker:</p>
<p><b>https://docs.docker.com/engine/install/debian/</b></p>
<p>Comprobar que docker esta instalado con: </p>
<p><b>docker version</b></p>
<p>Clonar el repositorio</p>
<p><b>git clone https://github.com/daw223-14/ProyectoFinalOficial</b></p>
<p>Situarse en la carpeta</p>
<p><b>cd ProyectoFinalOficial</b></p>
<p>Ejecutar docker_compose.yml</p>
<p><b>docker compose up -d</b></p>

## Cambios
<p>Si se necesita cambiar la configuración para desplegarlo en local o cambiar la IP, cambiar los siguientes archivos:</p>
<ul>
   <li>/frontend/src/components/axios.jsx
      <p>Cambiar la baseuURL por localhost o por la IP deseada</p>
   </li>
   <li>/backend/database.php
      <p>Cambiar la varible de $host por localhost o el nombre del contenedor deseado</p>
   </li>
</ul>
