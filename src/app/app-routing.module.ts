import { NgModule } from '@angular/core';
import { NavigationError, Router, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationError){
        this.router.navigate(['/404']);
      }
    })
  }
}
