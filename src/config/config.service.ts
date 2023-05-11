import { EnumEnv } from '../common/helpers';
import { config } from 'dotenv';

config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  public getFileDestination() {
    return this.getValue('UPLOADED_FILES_DESTINATION');
  }

  public getPort() {
    return this.getValue('PORT') || '3000';
  }

  public getServer(){
    return {
      url: this.getValue('SERVER_URL'),
      desc: this.getValue('SERVER_DESCRIPTION'),
    }
  }

  public getJWT() {
    return {
      secretKey: this.getValue('PORT', false) || 'xxxxxx',
      expiresIn: this.getValue('APP_PORT', false) || '1d',
    };
  }

  public getMailConfig() {
    return {
      host: this.getValue('EMAIL_HOST'),
      user: this.getValue('EMAIL_USER'),
      password: this.getValue('EMAIL_PASSWORD'),
      from: this.getValue('EMAIL_FROM'),
    };
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode != EnumEnv.DEV;
  }

  public getWebPortal() {
    return this.getValue('WEB_PORTAL');
  }

  public getApiBaseUrl() {
    return this.getValue('API_BASE_URL');
  }

  public getDB() {
    return {
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD', false),
      database: this.getValue('DB_DATABASE'),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  // 'DB_PASSWORD',
  'DB_DATABASE',
]);

export { configService };
