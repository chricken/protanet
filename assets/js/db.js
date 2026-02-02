"use strict";

/*
Modul für das Management der indexedDB
*/

let dbVersion = 7;

const dbNames = {
    persons: {
        name: 'protanet_persons',
    },
    groups: {
        name: 'protanet_groups',
    },
    places: {
        name: 'protanet_places',
    },
    events: {
        name: 'protanet_events',
    },
    objects: {
        name: 'protanet_objects',
    },
    images: {
        name: 'protanet_images',
    },
    works: {
        name: 'protanet_works',
    },
    volumes: {
        name: 'protanet_volumes',
    },
    chapters: {
        name: 'protanet_chapters',
    },
    segments: {
        name: 'protanet_segments',
    },
    notes: {
        name: 'protanet_notes',
    },
}

const db = {
    init() {
        // Erstellt/öffnet die indexedDB 'protanet' und legt die ObjectStores aus dbNames an.
        // Gibt ein Promise zurück, das nach Abschluss der Initialisierung aufgelöst wird.
        return new Promise((resolve, reject) => {

            const request = indexedDB.open('protanet', dbVersion);

            request.onupgradeneeded = (event) => {
                const database = event.target.result;
                // Fehlende Stores anlegen. keyPath 'id' mit autoIncrement
                Object.values(dbNames)
                    .map(dbName => dbName.name)
                    .forEach(name => {
                        if (!database.objectStoreNames.contains(name)) {
                            database.createObjectStore(name, {keyPath: 'id', autoIncrement: true});
                        }
                    });
            };

            request.onsuccess = (event) => {
                const database = event.target.result;
                // Optional: Listener, um Blockierungen zu minimieren
                database.onversionchange = () => {
                    // Schließt alte Verbindungen bei Versionswechsel
                    database.close();
                };
                resolve(database);
            };

            request.onerror = (event) => {
                reject(event.target.error || new Error('indexedDB open error'));
            };

            request.onblocked = () => {
                // Falls ein anderer Tab die alte Version offen hält
                // Wir lehnen hier nicht ab, weil onsuccess ggf. später noch kommt.
            };

        }).then(dbInstance => {
            // then()-Kette erlaubt weiteres Chaining im Aufrufer
            return dbInstance;
        });
    },
    storeData({
                  dbName = null,
                  payload = {}
              }) {
        if (!dbName) {
            return Promise.reject(new Error('dbName is required'));
        }
        if (payload === null || typeof payload !== 'object') {
            return Promise.reject(new Error('payload must be an object'));
        }

        dbName = dbNames[dbName].name;

        return this.init().then((database) => {
            return new Promise((resolve, reject) => {
                if (!database.objectStoreNames.contains(dbName)) {
                    reject(new Error(`ObjectStore '${dbName}' does not exist`));
                    return;
                }

                const tx = database.transaction(dbName, 'readwrite');
                const store = tx.objectStore(dbName);

                const hasId = Object.prototype.hasOwnProperty.call(payload, 'id') && payload.id !== undefined && payload.id !== null;
                const data = {...payload};

                const request = hasId ? store.put(data) : store.add(data);

                request.onsuccess = (event) => {
                    const id = event.target.result;
                    if (!hasId) {
                        data.id = id;
                    }
                    resolve(data);
                };

                request.onerror = (event) => {
                    reject(event.target.error || new Error('Failed to store data'));
                };
            });
        }).then(
            record => record
        );
    },
    loadData({
                 dbName = null,
                 id = null
             }) {
        if (!dbName) {
            return Promise.reject(new Error('dbName is required'));
        }
        if (id === null || id === undefined) {
            return Promise.reject(new Error('id is required'));
        }
        if (typeof id === 'object') {
            return Promise.reject(new Error('id must be a string'));
        }

        dbName = dbNames[dbName].name;

        return this.init().then((database) => {
            return new Promise((resolve, reject) => {
                if (!database.objectStoreNames.contains(dbName)) {
                    reject(new Error(`ObjectStore '${dbName}' does not exist`));
                    return;
                }

                const tx = database.transaction(dbName, 'readonly');
                const store = tx.objectStore(dbName);
                // console.log(dbName);
                // console.log(id);

                const request = store.get(id);

                request.onsuccess = (event) => {
                    resolve(event.target.result || null);
                };
                request.onerror = (event) => {
                    reject(event.target.error || new Error('Failed to load data'));
                };
            });
        }).then(record => record);
    },
    deleteData({
                   dbName = null,
                   id = null
               }) {
        // console.log('delete from DB', dbName, id);

        if (!dbName) {
            return Promise.reject(new Error('dbName is required'));
        }
        if (id === null || id === undefined) {
            return Promise.reject(new Error('id is required'));
        }

        dbName = dbNames[dbName].name;
        // console.log('dbName', dbName);

        return this.init().then((database) => {
            // console.log('db connection established');

            return new Promise((resolve, reject) => {
                if (!database.objectStoreNames.contains(dbName)) {
                    reject(new Error(`ObjectStore '${dbName}' does not exist`));
                    return;
                }
                // console.log('db contains ObjectStore - Success');

                const tx = database.transaction(dbName, 'readwrite');
                const store = tx.objectStore(dbName);

                const request = store.delete(id);

                request.onsuccess = () => {
                    // console.log('Success removing ', id);

                    resolve(true);
                };
                request.onerror = (event) => {
                    console.log('error removing ', id, event.target.error);

                    reject(event.target.error || new Error('Failed to delete data'));
                };
            });
        }).then(result => result);
    },
    listAllData({
                    dbName = null,
                    fields = null,  // fields kann ein Array sein, das angibt, dass aus den Datensätzen nur die Felder zurückgegeben werden sollen 
                }) {
        if (!dbName) {
            return Promise.reject(new Error('dbName is required'));
        }
        const project = (record) => {
            if (!Array.isArray(fields) || fields.length === 0) {
                return record;
            }
            const out = {
                id: record.id
            };
            fields.forEach((key) => {
                if (Object.prototype.hasOwnProperty.call(record, key)) {
                    out[key] = record[key];
                }
            });
            return out;
        };

        dbName = dbNames[dbName].name;

        return this.init().then((database) => {
            return new Promise((resolve, reject) => {
                if (!database.objectStoreNames.contains(dbName)) {
                    reject(new Error(`ObjectStore '${dbName}' does not exist`));
                    return;
                }
                const tx = database.transaction(dbName, 'readonly');
                const store = tx.objectStore(dbName);

                const request = store.getAll();

                request.onsuccess = (event) => {
                    const all = event.target.result || [];
                    const projected = all.map(project);
                    resolve(projected);
                };
                request.onerror = (event) => {
                    reject(event.target.error || new Error('Failed to list data'));
                };
            });
        }).then((list) => list);
    }


}

export default db;