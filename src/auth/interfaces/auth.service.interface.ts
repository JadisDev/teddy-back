export interface AuthServiceInterface {
    validateUser(name: string): Promise<any>;
    login(name: string): Promise<{ access_token: string }>;
}