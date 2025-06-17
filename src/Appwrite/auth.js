import {Client,Account,ID} from 'appwrite';
import config from '../config/config.js';

export class AuthService {
   client = new Client();
    account ;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl) // Your Appwrite Endpoint
            .setProject(config.appwrite_project_id);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}) {
        try {
            const UserAccount = await this.account.create(ID.unique(), email, password, name);
            if (!UserAccount) {
                return UserAccount;
            }
            return this.login({email, password}); // Automatically log in after account creation
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    }
    async login({email, password}) {
        try {
            const response = await this.account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
    async getAccount() {
        try {
            const account = await this.account.get();
            return account;
        } catch (error) {
            console.error('Error fetching account:', error);
            throw error;
        }
    }
    
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }
}
const authservice = new AuthService();
export default authservice;