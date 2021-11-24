import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HelloWorldComponent } from "../hello-world/hello-world.component";

const routes: Routes = [{ path: '', component: HelloWorldComponent },{path: 'test', component: MainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
