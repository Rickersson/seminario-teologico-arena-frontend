import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
       JwtModule.forRoot({}),
  ]
})
export class LoginModule { }
