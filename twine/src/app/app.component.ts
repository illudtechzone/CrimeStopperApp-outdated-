import { OAuthService } from 'angular-oauth2-oidc';
import { AuthGuardConfig } from './config/auth.guard.config';
import { Component } from '@angular/core';

import { Platform, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oauthguard: AuthGuardConfig,
    private oathService: OAuthService,
    private toastController: ToastController,
    private navController: NavController,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
    });
  }
}
