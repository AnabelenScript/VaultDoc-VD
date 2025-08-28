import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MainLayoutModule } from './shared/layouts/main-layout-module/main-layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { ConvertModule } from './features/convert/convert.module';
import { GenerateModule } from './features/generate/generate.module';
import { UploadModule } from './features/upload/upload.module';
import { BinModule } from './features/bin/bin.module';
import { UsersModule } from './features/users/users.module';
import { FilesModule } from './features/files/files.module';
import { AuthInterceptor } from './core/services/auth/auth_interceptor';
import { HistorialModule } from './features/historial/historial.module';

@NgModule({
  declarations: [
   AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MainLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardModule,
    ConvertModule,
    GenerateModule,
    UploadModule,
    BinModule,
    UsersModule,
    FilesModule,
    HistorialModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
