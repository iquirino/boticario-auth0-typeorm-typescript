import L from '../../common/logger';
import { ManagementClient, AuthenticationClient, TokenResponse } from 'auth0';

export class AuthService {
  management: ManagementClient;

  constructor() {
    this.management = new ManagementClient({
      domain: process.env.OAUTH2_ISSUER,
      clientId: process.env.ADMIN_OAUTH2_CLIENT_ID,
      clientSecret: process.env.ADMIN_OAUTH2_CLIENT_SECRET,
    });
  }

  async getToken(username: string, password: string): Promise<TokenResponse> {
    L.info('fetch user token');
    const client = new AuthenticationClient({
      domain: process.env.OAUTH2_ISSUER,
      clientId: process.env.OAUTH2_CLIENT_ID,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET,
    });
    const data = await client.passwordGrant({
      username,
      password,
    });
    return data;
  }

  async getPermissions(user_id: string): Promise<string[]> {
    L.info('fetch user permissions');
    return (await this.management.getUserPermissions({ id: user_id })).map(
      (q) => q.permission_name
    );
  }
}

export default AuthService;
