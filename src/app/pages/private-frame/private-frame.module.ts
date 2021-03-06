import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivateFramePageRoutingModule } from './private-frame-routing.module';

import { PrivateFramePage } from './private-frame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivateFramePageRoutingModule
  ],
  declarations: [PrivateFramePage]
})
export class PrivateFramePageModule {}
