import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../Pages/Page-not-found/page.not.found.component';
import { HomeComponent } from '../Pages/Home/home.component';
import { PersonListComponent } from '../Pages/Persons/Person-List/person.list.component';
import { PersonEditComponent } from '../Pages/Persons/Person-Edit/person.edit.component';
import { PersonCreateComponent } from '../Pages/Persons/Person-Create/person.create.component';
import { AppRoutingProductModule } from './app-routing.product.module';
import { ProductEditComponent } from '../Pages/Products/Product-Edit/product.edit.component';
import { ProductCreateComponent } from '../Pages/Products/Product-Create/product.create.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'listperson', component: PersonListComponent },
  { path: 'personedit', component: PersonEditComponent },
  { path: 'personcreate', component: PersonCreateComponent },
  { path: 'productedit', component: ProductEditComponent },
  { path: 'productcreate', component: ProductCreateComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingPersonModule { }
