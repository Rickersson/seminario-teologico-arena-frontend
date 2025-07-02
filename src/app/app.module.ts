import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ScrollDirective } from './directives/scroll.directive';
import { CommonModule } from '@angular/common';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faChevronDown,
  faChevronUp,
  faArrowDown,
  faArrowRight,
  faCheck,
  faBook,
  faCreditCard,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AuthInterceptor } from './interceptors/auth.interceptor';



 export function tokenGetter() {
  return localStorage.getItem('token');}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScrollDirective,
    LoginComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
        JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'], // ou sua API
        disallowedRoutes: ['http://localhost:3000/auth/login'], // ou rota pública
      }}), 
   NgxMaskDirective, HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true, // Necessário para múltiplos interceptors
    },   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi()),
    JwtHelperService,
    provideNgxMask()
  ],
})
export class AppModule {
  constructor() {
    // Adicione os ícones que você precisa
    library.add(
      faBars,
      faChevronDown,
      faChevronUp,
      faArrowDown,
      faArrowRight,
      faCheck,
      faBook,
      faCreditCard,
      faMapMarkerAlt,
      faPhoneAlt,
      faEnvelope
    );
  }


 
  
}

