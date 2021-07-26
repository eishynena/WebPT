import { Component, OnInit } from '@angular/core';
import { UTCService } from './utc.service';
import { HttpResponse } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../shared/dialogs/confirmation-dialog.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-utc',
  templateUrl: './utc.component.html',
  styleUrls: ['./utc.component.scss'],
  providers: [
  	UTCService
  ]
})
export class UTCComponent implements OnInit {
  public alert : string = null;
  public loading: boolean = false;
  public utc={
    time:"",
    timezone:""
  }
  public json= {};
  constructor(

		private dialog: MatDialog,
    private service: UTCService
  ) { }

  ngOnInit() {

    this.json = null;


  }

  convertirUTC(){

    this.alert = null;
    this.loading = true;
    if(this.utc.time == null || this.utc.time == undefined || this.utc.time == "")
    {
      this.loading = false;
      this.alert = "The 'time' value is empty. Please, enter a valid time value";
    }else if (this.utc.timezone == null || this.utc.timezone == undefined || this.utc.timezone == ""){
      this.loading = false;
      this.alert = "The 'timezone' value is empty. Please, enter a valid timezone value";
    }else{ 
    
        this.dialog.open(ConfirmationDialogComponent,
          {
            data:
            {
            title: 'Response',
            message: "Click en el botón de 'Download' para descargar la respuesta en el archivo json"
            },
            width: '400px'
          })
          .afterClosed().subscribe((option: string) => {
            if (option === 'Yes') {
              this.service.convertirUTC(this.utc )
            .finally(() => {this.loading  =false;
          
        
            })
            .subscribe ( 
      
              (resp: HttpResponse<Blob>) => {
                
                let dataType = resp.body.type;
                if (resp.body.size > 0) {
                  let filename = resp.headers.get('content-disposition').substring(20, resp.headers.get('content-disposition').length );
                  let binaryData = [];
                  binaryData.push(resp.body);
                  let downloadLink = document.createElement('a');
                  downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
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
                }
         
          

          });
      
    }
    }
    

     downloadJson(blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) 
          window.navigator.msSaveOrOpenBlob(blob, filename);
      else { // Others
          var a = document.createElement("a"),
                  url = URL.createObjectURL(blob);
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          setTimeout(function() {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);  
          }, 0); 
      }
  }

    exportJson(): void {
      console.log(this.json)
      const c = JSON.stringify(this.json);
      const file = new Blob([c], {type: 'text/json'});
      this.downloadJson(file,"response.json");
    }

}
