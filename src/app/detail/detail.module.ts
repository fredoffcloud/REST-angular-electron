import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';

import { DetailComponent } from './detail.component';
import { SharedModule } from '../shared/shared.module';

import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    NgxElectronModule, 
    SharedModule
  ]
})
export class DetailModule {}
