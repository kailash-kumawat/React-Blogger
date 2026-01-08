import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl) // Your API Endpoint
      .setProject(conf.appWriteProjectId); // Your project ID
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, status, img, authorId }) {
    try {
      // next start from here creating post
      return await this.databases.createDocument(
        conf.appWriteDbId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          img,
          authorId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, status, img }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDbId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          img,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDbId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Error while deleting post", error?.message);
      return false;
    }
  }

  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appWriteDbId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Error while fetching post", error?.message);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDbId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Error while fetching posts", error?.message);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error while uploading file", error?.message);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Error while deleting file", error?.message);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appWriteBucketId, fileId);
  }

  // next redux toolkit
}

const service = new Service();

export default service;
