# WebPT

Desarrolladora: Deisy Jaque


Aplicación web de prueba técnica para Interfell

Elementos usados:

    Angular CLI: 9.0.5
    Node: 10.16.0
    OS: win32 x64

    Angular: 9.0.5
    ... animations, cli, common, compiler, compiler-cli, core, forms
    ... language-service, platform-browser, platform-browser-dynamic
    ... router
    Ivy Workspace: Yes

        Package                            Version
        ------------------------------------------------------------
        @angular-devkit/architect          0.900.7
        @angular-devkit/build-angular      0.900.7
        @angular-devkit/build-optimizer    0.900.7
        @angular-devkit/build-webpack      0.900.7
        @angular-devkit/core               9.0.5
        @angular-devkit/schematics         9.0.5
        @angular/cdk                       9.1.1
        @angular/flex-layout               9.0.0-beta.29
        @angular/http                      7.2.16
        @angular/material                  9.1.1
        @angular/material-moment-adapter   8.2.2
        @ngtools/webpack                   9.0.7
        @schematics/angular                9.0.5
        @schematics/update                 0.900.5
        rxjs                               6.5.4
        typescript                         3.7.5
        webpack                            4.41.2



Versión de node v10.16.0

Versión de NPM 6.9.0

Sistema Operativo: Windows 10 X64

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Al descargar el proyecto del repositorio, deberá ejecutar el comando que descargará los paquetes del proyecto: npm install

Para ejecutar localmente: ng serve
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Las url para api de tuten y de utf se encuentran en el environments


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

El front-end de UTC se puede acceder con la url base + /utc (http://djaque.prueba.mooo.com/utc)

El front-end del Problema 3 sólo ejecutando la url base  (http://djaque.prueba.mooo.com)


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Pruebas

Problema 2

http://djaque.prueba.mooo.com/utc desplegará el front con un simple formulario de dos inputs, time y timezone. 

Estos son enviados en un objeto con la siguiente estructura:

    {
        "time": "23:37:20",
        "timezone": "-4"
    }

El servicio es invocado de la siguiente manera

        convertirUTC(timezoneutc: any)
        {

            return this.http.post<HttpResponse<Blob>>(AMBIENTE.concat('/timezone-utc'), timezoneutc,
                {
                    headers: new HttpHeaders({ 'Accept': 'application/json; charset=utf-8' }),
                    observe: "response" as 'body',// to display the full response & as 'body' for type cast
                    'responseType': 'blob' as 'json'
                });
        }
        }
Se crea un post con HttpResponse<Blob> ya que la respuesta del API es un archivo. 

En las opciones, además del header, se envía un observe con respuesta como body para el casteo y se define el tipo de respuesta con 'responseType': 'blob' as 'json'

La invocación de este desde el componente:

              this.service.convertirUTC(this.utc )
            .finally(() => {this.loading  =false;
          
        
            })
            .subscribe ( 
      
              (resp: HttpResponse<Blob>) => {
                
                let dataType = resp.body.type;
                if (resp.body.size > 0) {
                  let filename = resp.headers.get('content-disposition').substring(20, resp.headers.get('content-disposition').length ); // Nombre del archivo obtenido en el header

                  let binaryData = [];

                  binaryData.push(resp.body); //Se inserta la respuesta en un arreglo para posteriormente descargar el archivo 

                    let downloadLink = document.createElement('a');
                    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType})); // se hace el casteo de tipo Blob para permitir la descarga como archivo
                    downloadLink.setAttribute('download', filename);
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    
                }

              

                  },     async (error) => {
                    if (typeof(error.error) == 'object') {
                      let err = JSON.parse(await error.error.text())
                      console.log(err)
                      this.alert =  err[0].mensaje;
                    }
                    else {
                      this.alert =error.error[0].mensaje;
                    }
                  });



Problema 3

http://djaque.prueba.mooo.com mostrará la interfaz de login con dos inputs: email (que corresponde al usuario) y contraseña

Tanto parámetro "app" como "email" lo asumí como fijo y ambos se encuentran en el environment.

Justificación: El parámetro "app" es el tipo de API al que se consulta por lo que interpreté, además de ser el único conocido para la prueba. 

El parámetro "email" lo asumo como fijo para fines de la llamada del siguiente servicio en consecuencia con el primero. No lo interpreté como uno de entrada en el login.


Al realizar el login de manera satisfactoria, se resuelve la ruta /booking con la tabla que contiene los campos y datos solicitados en el documento.

La carpintería de la tabla y filtros fue realizado en su mayoría de manera personalizada para adaptar la solución a lo solicitado.

El comportamiento del filtro es el siguiente: 
        * Se muestra una lista desplegable con los tipos de filtros
        * Se muestra input para ingresar el dato que desea que el filtro resuelva. 
        * Al comenzar a tipear en el primero input, se muestra el grupo de radio inputs y fragmento consecuente para realizar la operaicón lógica
        * El botón "Limpiar" permite resetear el segundo fragmento del filtro para que el primero tengo efecto por sí sólo.

Adicionalmente se crea un localStorage para tener a la mano las credenciales de autenticación (usuario y token) para que en caso de no desear volver a la pantalla del login, se mantenga la sesión y vuelva permeanezca en la pantalla de la tabla. Si da clic en botón "Salir", se resetea el localStorage y reenvia a pantalla de inicio. 

Si intenta acceder a la ruta de /booking, el mismo lo reenviará a la panta de login para que se autentique. Esto se hizo con la finalidad de plasmar la mayor cercanía al comportamiento correcto de un inicio de sesión, post inicio de sesión y un regreso a la pantalla anterior vía los elementos que yacen en la aplicación.

Dado que el cliente de prueba es Tuten quien está en relación con Interfell, se hace uso del logo para fines de la prueba y su contexto.



