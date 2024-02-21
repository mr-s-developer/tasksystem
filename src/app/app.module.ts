import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import * as ru from '@angular/common/locales/ru';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AuthModule } from './auth/auth.module';
import * as authEffects from './auth/store/effects';
import * as tasksEffects from './tasks/store/effects';
import * as usersEffects from './shared/store/effects';
import { TasksModule } from './tasks/tasks.module';
import { HomeModule } from './home/home.module';
import { NotFoundModule } from './not-found/not-found.module';
import { HeaderModule } from './shared/modules/header/header.module';
import { LeftMenuModule } from './shared/modules/left-menu/left-menu.module';
import { IconModule } from './shared/modules/icon/icon.module';
import { LogoModule } from './shared/modules/logo/logo.module';
import { BackendErrorMessagesModule } from './shared/modules/backend-error-messages/backend-error-messages.module';
import { PriorityModule } from './shared/modules/priority/priority.module';
import { UserAvatarModule } from './shared/modules/user-avatar/user-avatar.module';
import { PaginatorService } from './shared/services/paginator.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([authEffects, tasksEffects, usersEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true 
    }),

    MatSidenavModule,

    AuthModule,
    TasksModule,
    HomeModule,
    HeaderModule,
    LeftMenuModule,
    IconModule,
    LogoModule,
    NotFoundModule,
    BackendErrorMessagesModule,
    PriorityModule,
    UserAvatarModule,
  ],
  providers: [
    provideAnimationsAsync(), 
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    PaginatorService,
    {
      provide: MatPaginatorIntl,
      useValue: PaginatorService.getDutchPaginatorIntl()
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(ru.default);
  }
}
