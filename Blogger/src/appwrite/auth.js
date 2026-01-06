import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl) // Your API Endpoint
      .setProject(conf.appWriteProjectId); // Your project ID
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.loginAccount({ email, password });
      } else {
        return userAccount; // will handle on frontend
      }
    } catch (error) {
      throw error;
    }
  }

  async loginAccount({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async logoutAccount() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  async getUserAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
