import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { AppConfig } from '../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  aktversion: string;
  message: string = '…inget…'; 
  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {
    console.log('Qq VERSION Xx');
    console.log(AppConfig.version);
    if (this.electronService) {
      if (!this.electronService.isElectronApp) {
        console.log('Ej elektronapp!');
      } else {
        console.log('Qq Service finnes Xx');
        this.aktversion = '0.0.0';
        this.electronService.ipcRenderer.send('app_version');

        this.electronService.ipcRenderer.on('app_version', (event, arg) => {
          // this.electronService.ipcRenderer.removeAllListeners('app_version');
          this.aktversion = arg.version;
        });
        let svar = this.electronService.ipcRenderer.sendSync('ge-app-version');
        this.aktversion = svar;
        console.log(svar); // Värde från package.json
        // this.electronService.process
        // let appvers1 = this.electronService.ipcRenderer.sendSync('ge-app-version');
        // console.log();
        // console.log(this.electronService.);
        /*
        this.electronService.ipcRenderer.on('update-available', function (event, arg) {
          // event.returnValue = 'I heard you 2!';
          console.log(event);
          console.log(arg);
          // event.returnValue = app.getVersion();
        });
        */


        this.electronService.ipcRenderer.on('update_available', () => { 
          this.electronService.ipcRenderer.removeAllListeners('update_available'); 
          this.message = 'A new update is available. Downloading now...'; 
        });
        this.electronService.ipcRenderer.on('update_downloaded', () => { 
          this.electronService.ipcRenderer.removeAllListeners('update_downloaded'); 
          this.message = 'Update Downloaded. It will be installed on restart. Restart now?'; 
        });        
      }
      // let pong: string = this.electronService.ipcRenderer.sendSync('ping');
      // console.log(pong);  
    } else {
      console.log('ingen service');
    }
}

}
