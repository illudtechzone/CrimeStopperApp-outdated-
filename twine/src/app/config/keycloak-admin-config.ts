import { KeycloakAdminClient } from 'keycloak-admin/lib/client';

export class KeycloakAdminConfig {
    KcAdminClient: KeycloakAdminClient;

    constructor() {
        this.KcAdminClient = new KeycloakAdminClient();
        this.KcAdminClient.setConfig({
            baseUrl:  'https://dev.servers.divisosofttech.com/auth'
        });
    }

    refreshClient() {
        return this.configureKeycloakAdmin();
    }
    configureKeycloakAdmin() {
        return this.KcAdminClient.auth({
            username: 'admin',
            password: 'admin999',
            grantType: 'password',
            clientId: 'admin-cli',
            clientSecret: '46c38386-f577-4747-bcd4-922100638f23'

        });
    }
}
