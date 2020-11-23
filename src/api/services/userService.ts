import L from '../../common/logger';
import {
  ManagementClient,
  User,
  AppMetadata,
  UserMetadata,
  CreateUserData,
} from 'auth0';

export class UserService {
  management: ManagementClient;

  constructor() {
    this.management = new ManagementClient({
      domain: process.env.OAUTH2_ISSUER,
      //token: apiToken,
      clientId: process.env.ADMIN_OAUTH2_CLIENT_ID,
      clientSecret: process.env.ADMIN_OAUTH2_CLIENT_SECRET,
      scope: 'create:users read:users update:users',
    });
  }

  async all(): Promise<User<AppMetadata, UserMetadata>[]> {
    L.info('fetch all users');
    return await this.management.getUsers();
  }

  async byId(id: string): Promise<User<AppMetadata, UserMetadata>> {
    L.info(`fetch user with id ${id}`);
    return await this.management.getUser({ id });
  }

  async create(user: CreateUserData): Promise<User<AppMetadata, UserMetadata>> {
    L.info(`create user with name ${user.username}`);
    return await this.management.createUser({
      connection: process.env.OAUTH2_DEFAULT_CONNECTION,
      ...user,
    });
  }

  async update(
    id: string,
    user: CreateUserData
  ): Promise<User<AppMetadata, UserMetadata>> {
    L.info(`update user with name ${user.username}`);
    return await this.management.updateUser({ id }, user);
  }

  async delete(id: string): Promise<void> {
    L.info(`delete user with id ${id}`);
    return await this.management.deleteUser({ id });
  }
}

export default UserService;
