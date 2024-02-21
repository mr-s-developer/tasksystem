import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { authGuard } from '../shared/guards/auth.guard';
import { HeaderModule } from '../shared/modules/header/header.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Главная страница', canActivate: [authGuard] },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), HeaderModule],
})
export class HomeModule {}
