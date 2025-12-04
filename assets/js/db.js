"use strict";

/*
Modul für das Management der indexedDB
*/

let dbVersion = 1;

const dbNames = [
    {
        name: 'protanet_persons',

    }, {
        name: 'protanet_groups',
    }, {
        name: 'protanet_places',
    }, {
        name: 'protanet_events',
    }, {
        name: 'protanet_objects',
    }, {
        name: 'protanet_images',
    }
]

const db = {
    init() {
        // Erstellt/öffnet die indexedDB 'protanet' und legt die ObjectStores aus dbNames an.
        // Gibt ein Promise zurück, das nach Abschluss der Initialisierung aufgelöst wird.
        return new Promise((resolve, reject) => {

            const request = indexedDB.open('protanet', dbVersion);

            request.onupgradeneeded = (event) => {
                const database = event.target.result;
                // Fehlende Stores anlegen. keyPath 'id' mit autoIncrement
                dbNames.forEach(({name}) => {
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

    },
    deleteData({
                   dbName = null,
                   id = null
               }) {

    },
    listAllData({
                    dbName = null,
                    fields = null,  // fields kann ein Array sein, das angibt, dass aus den Datensätzen nur die Felder zurückgegeben werden sollen 
                }) {

    }


}

export default db;