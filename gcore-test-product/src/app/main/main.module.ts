import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HelloWorldComponent } from '../hello-world/hello-world.component';


@NgModule({
  declarations: [
    MainComponent,
    HelloWorldComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
