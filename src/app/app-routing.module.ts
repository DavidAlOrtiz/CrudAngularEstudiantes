import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormModelsComponent } from './form-models/form-models.component';
import { TableModelsComponent } from './table-models/table-models.component';

const routes: Routes = [
 {path: '', component: TableModelsComponent},
 {path: 'models', component: TableModelsComponent},
 {path: 'models/form', component: FormModelsComponent},
 {path: 'models/form/:id', component: FormModelsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
