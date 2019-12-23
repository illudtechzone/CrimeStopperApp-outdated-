import { UtilService } from './util.service';

import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakAdminConfig } from '../config/keycloak-admin-config';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
import { HttpHeaders } from '@angular/common/http';
import { createCredentials } from 'crypto';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  keycloakAdmin: KeycloakAdminClient;


  constructor(private oauthService: OAuthService,
              private keycloakConfig: KeycloakAdminConfig,
              private storage: Storage,
              private util: UtilService
              ) { }

    createAccount(user: any, password: string, success: any, err: any) {

      this.keycloakConfig.refreshClient().then(() => {
        this.keycloakAdmin = this.keycloakConfig.KcAdminClient;
        user.realm = 'crimestopper';
        user.credentials = [{type: 'password', value: password}];
        user.attributes = map;
        user.enabled = true;
        this.keycloakAdmin.users.create(user)
        .then(res => {
          success(res);
        })
        .catch(e => {
          err(e);
        });
      });

    }
    async isAuthenticated(): Promise<boolean> {

      return await this.oauthService.hasValidAccessToken();
    }

    authenticate(credentials: any, success: any, err: any) {
      console.log('Login in with details', credentials);
      this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(
          credentials.username,
          credentials.password,
          new HttpHeaders()
        ).then(data => {
          console.log('login sucess', data);
          success();
          this.storage.set('user', data);
        }).catch(e => {
          console.log('error', e);
          err();
        });
    }
    async getCurrentUserDetails() {
      return await this.oauthService.loadUserProfile();
    }
    async updateCurrentUserDetails(keycloakUser: any,
                                   success, err): Promise<void> {
      this.keycloakConfig.refreshClient().then(() => {
      this.keycloakAdmin = this.keycloakConfig.KcAdminClient;
      this.keycloakAdmin.users.update(
        {
          id: keycloakUser.sub,
          realm: 'crimestopper'
        },
        {
          firstName: keycloakUser.name,
          email: keycloakUser.email,

        }
      ).then(() => {
        success();
      }).catch(() => {
        err();
      });
      });
    }
    resetPassword(newPassword, success, err) {
      this.storage.get('user').then(user => {
        this.keycloakConfig.refreshClient()
      .then(() => {
        this.keycloakAdmin = this.keycloakConfig.KcAdminClient;
        this.keycloakAdmin.users.resetPassword(
          {
            realm: 'crimestopper',
            id: user.sub,
            credential: {
              temporary: false,
              type: 'password',
              value: newPassword,
            },
          }
        ).then(data => {
          success(data);
        })
        .catch(e => {
          err(e);
        });
      });
    });

  }
  logout() {
    this.oauthService.logOut();
    this.storage.clear();
    this.util.navigateToLogin();
  }


}

