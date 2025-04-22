export interface WeatherRecord {
    id?: number;
    date: string;
    temperature: number;
    humidity: number;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

class IndexedDBService {
    private dbName = 'weatherAppDB';
    private storeName = 'weatherRecords';
    private version = 1;
    private db: IDBDatabase | null = null;

    constructor() {
        this.initDB();
    }

    private initDB(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                console.error('Error opening database');
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('date', 'date', { unique: false });
                    store.createIndex('temperature', 'temperature', { unique: false });
                    store.createIndex('humidity', 'humidity', { unique: false });
                }
            };
        });
    }

    private getStore(mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        const transaction = this.db.transaction(this.storeName, mode);
        return transaction.objectStore(this.storeName);
    }

    async getWeatherRecords(): Promise<WeatherRecord[]> {
        await this.initDB();
        return new Promise((resolve, reject) => {
            const store = this.getStore();
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async addWeatherRecord(record: Omit<WeatherRecord, 'id'>): Promise<number> {
        await this.initDB();
        return new Promise((resolve, reject) => {
            const store = this.getStore('readwrite');
            const timestamp = new Date().toISOString();
            const newRecord = {
                ...record,
                createdAt: timestamp,
                updatedAt: timestamp
            };
            const request = store.add(newRecord);

            request.onsuccess = () => {
                resolve(request.result as number);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async updateWeatherRecord(id: number, record: WeatherRecord): Promise<void> {
        await this.initDB();
        return new Promise((resolve, reject) => {
            const store = this.getStore('readwrite');
            const updatedRecord = {
                ...record,
                updatedAt: new Date().toISOString()
            };
            const request = store.put(updatedRecord);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async deleteWeatherRecord(id: number): Promise<void> {
        await this.initDB();
        return new Promise((resolve, reject) => {
            const store = this.getStore('readwrite');
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async exportToJson(): Promise<string> {
        const records = await this.getWeatherRecords();
        return JSON.stringify(records, null, 2);
    }

    async exportToCsv(): Promise<string> {
        const records = await this.getWeatherRecords();
        const headers = ['id', 'date', 'temperature', 'humidity', 'description', 'createdAt', 'updatedAt'];
        const rows = records.map(record => headers.map(header => record[header as keyof WeatherRecord]));
        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
}

export const dbService = new IndexedDBService(); 