import { OAuthService, OAuthModule } from 'angular-oauth2-oidc';
import { AuthGuardConfig } from './config/auth.guard.config';
import { KeycloakService } from './services/KeycloakService';
import { UtilService } from './services/util.service';
import { KeycloakAdminConfig } from './config/keycloak-admin-config';
import { AuthInterceptor } from './services/security/auth-interceptor';
import { Camera } from '@ionic-native/camera/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    SharedModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(),
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    KeycloakAdminConfig,
    UtilService,
    KeycloakService,
    AuthGuardConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
