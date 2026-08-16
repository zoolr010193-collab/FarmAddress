// Database Abstraction Layer
// Works with both localStorage (offline) and Firebase (online)
// Automatically switches based on DB_MODE config

class Database {
    constructor() {
        this.mode = window.DB_MODE || 'local';
        this.collections = {
            farms: 'farmAddressFarms',
            products: 'farmAddressProducts',
            orders: 'farmAddressOrders',
            farmerOrders: 'farmAddressFarmerOrders',
            farmerProfile: 'farmAddressFarmProfile',
            farmerSession: 'farmAddressfarmerSession',
            cart: 'farmAddressCart'
        };
    }

    // ===== LOCAL STORAGE METHODS =====
    localGet(collection) {
        const data = localStorage.getItem(collection);
        return data ? JSON.parse(data) : null;
    }

    localSet(collection, data) {
        localStorage.setItem(collection, JSON.stringify(data));
        return Promise.resolve(data);
    }

    localAdd(collection, document) {
        const data = this.localGet(collection) || {};
        const docId = Date.now().toString();
        data[docId] = { ...document, id: docId, createdAt: new Date().toISOString() };
        localStorage.setItem(collection, JSON.stringify(data));
        return Promise.resolve({ id: docId, ...data[docId] });
    }

    localUpdate(collection, docId, updates) {
        const data = this.localGet(collection) || {};
        if (data[docId]) {
            data[docId] = { ...data[docId], ...updates, updatedAt: new Date().toISOString() };
            localStorage.setItem(collection, JSON.stringify(data));
            return Promise.resolve(data[docId]);
        }
        return Promise.reject(new Error('Document not found'));
    }

    localDelete(collection, docId) {
        const data = this.localGet(collection) || {};
        delete data[docId];
        localStorage.setItem(collection, JSON.stringify(data));
        return Promise.resolve();
    }

    localGetAll(collection) {
        const data = this.localGet(collection) || {};
        return Promise.resolve(Object.values(data));
    }

    // ===== PUBLIC METHODS (Facade Pattern) =====

    // Get all documents from a collection
    async getAll(collection) {
        if (this.mode === 'local') {
            return this.localGetAll(this.collections[collection] || collection);
        }
        // Firebase implementation will go here
        throw new Error('Firebase not configured yet');
    }

    // Get single document
    async getDocument(collection, docId) {
        if (this.mode === 'local') {
            const data = this.localGet(this.collections[collection] || collection) || {};
            return Promise.resolve(data[docId] || null);
        }
        throw new Error('Firebase not configured yet');
    }

    // Create new document
    async addDocument(collection, data) {
        if (this.mode === 'local') {
            return this.localAdd(this.collections[collection] || collection, data);
        }
        throw new Error('Firebase not configured yet');
    }

    // Update document
    async updateDocument(collection, docId, updates) {
        if (this.mode === 'local') {
            return this.localUpdate(this.collections[collection] || collection, docId, updates);
        }
        throw new Error('Firebase not configured yet');
    }

    // Delete document
    async deleteDocument(collection, docId) {
        if (this.mode === 'local') {
            return this.localDelete(this.collections[collection] || collection, docId);
        }
        throw new Error('Firebase not configured yet');
    }

    // Set entire collection (for batch updates)
    async setCollection(collection, data) {
        if (this.mode === 'local') {
            return this.localSet(this.collections[collection] || collection, data);
        }
        throw new Error('Firebase not configured yet');
    }

    // Get entire collection
    async getCollection(collection) {
        if (this.mode === 'local') {
            return this.localGet(this.collections[collection] || collection);
        }
        throw new Error('Firebase not configured yet');
    }

    // Query documents by field value
    async queryByField(collection, field, value) {
        const allDocs = await this.getAll(collection);
        return allDocs.filter(doc => doc[field] === value);
    }

    // Clear entire collection
    async clearCollection(collection) {
        if (this.mode === 'local') {
            localStorage.removeItem(this.collections[collection] || collection);
            return Promise.resolve();
        }
        throw new Error('Firebase not configured yet');
    }

    // Wipe all data (careful!)
    async clearAllData() {
        if (this.mode === 'local') {
            Object.values(this.collections).forEach(col => localStorage.removeItem(col));
            return Promise.resolve();
        }
        throw new Error('Firebase not configured yet');
    }
}

// Create global database instance
window.db = new Database();
