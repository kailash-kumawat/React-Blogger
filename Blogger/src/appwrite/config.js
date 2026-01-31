import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, img, status, userId }) {
    try {
      return await this.databases.createDocument({
        databaseId: conf.appwriteDbId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
        data: {
          title,
          content,
          img,
          status,
          authorId: userId,
        },
      });
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, img, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          img,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
  
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
