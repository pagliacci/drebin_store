import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FinalScreenComponent } from 'src/app/final-screen/final-screen.component';
import { DrebinPointsPipe } from 'src/app/store/pipes/drebin-points.pipe';
import { ProductCardComponent } from 'src/app/store/product-card/product-card.component';
import { ProductPreviewComponent } from 'src/app/store/product-preview/product-preview.component';
import { StoreComponent } from 'src/app/store/store.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UserService } from './services/user.service';
import { CodecModule } from './codec/codec.module';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    ProductCardComponent,
    ProductPreviewComponent,
    DrebinPointsPipe,
    FinalScreenComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CodecModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
