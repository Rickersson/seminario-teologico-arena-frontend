import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { routes } from './app/app-routing.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: JwtHelperService, useValue: new JwtHelperService() },
  ]
};