import { Client,ID,Databases,Storage, Query } from "appwrite";
import config from "../config/config.js";

export class DatabaseAndStorageService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl) // Your Appwrite Endpoint
            .setProject(config.appwrite_project_id);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, content,userId,status,featuredImage}) {
        try {
            return await this.databases.createDocument(
                config.appwrite_database,
                config.appwrite_collection,
                ID.unique(),
                {
                    Title: title,
                    Content: content,
                    userId: userId,
                    Status: status,
                    featured_image:featuredImage
                }
            );
            
        } catch (error) {
            console.error("Error creating document:", error);
            throw error;
        }
       
    }
    async deletePost(postId) {
        try {
            return await this.databases.deleteDocument(
                config.appwrite_database,
                config.appwrite_collection,
                postId
            );
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }
    async updatePost(postId, {title, content, userId, status,featuredImage}) {
        try {
            return await this.databases.updateDocument(
                config.appwrite_database,
                config.appwrite_collection,
                postId,
                {
                    Title: title,
                    Content: content,
                    userId: userId,
                    Status: status,
                    featured_image:featuredImage
                }
            );
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }
    async getPost(postId) {
        try {
            const response = await this.databases.getDocument(
                config.appwrite_database,
                config.appwrite_collection,
                postId
            );
            return response;
        } catch (error) {
            console.error("Error fetching document:", error);
            throw error;
        }
    }
    async getPosts() {
        try {
            const response = await this.databases.listDocuments(
                config.appwrite_database,
                config.appwrite_collection,
                
                [
                    Query.equal("Status", "Active")
                ]
            );
            return response;
        } catch (error) {
            console.error("Error fetching documents:", error);
            throw error;
        }
    }

    //file upload
    async uploadFile(file) {
        try {
            if(file)
            return await this.storage.createFile(
                config.appwrite_bucket_id,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }
    async getFile(fileId) {
        try {
            const response = await this.storage.getFile(
                config.appwrite_bucket_id,
                fileId
            );
            return response;
        } catch (error) {
            console.error("Error fetching file:", error);
            throw error;
        }
    }
    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appwrite_bucket_id,
                fileId
            );
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }
    getFileView(fileId) {
        try {
            return this.storage.getFileView(
                config.appwrite_bucket_id,
                fileId
            );
        } catch (error) {
            console.error("Error fetching file view:", error);
            throw error;
        }
    }

}
const appwritedbsAndstr = new DatabaseAndStorageService();
export default appwritedbsAndstr;