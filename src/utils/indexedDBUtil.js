"use strict";

class indexedDBUtil{

    static async connect(){
        const version = 201802110711;
        const dbName = "vuePracticeDB";
        const schema = {
            "Memo": {keyPath: 'id' ,autoIncrement: true}
        };

        const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
        const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.mozIDBTransaction;

        return new Promise((resolve, reject) => {
            var db = null;
            var tran = null;
            var reqOpen = indexedDB.open(dbName,version);

            reqOpen.onupgradeneeded = function(e) {
                db = e.target.result;
                for(var key in schema){
                    db.createObjectStore(key, schema[key]);
                }
                resolve(e.target);
            }
            reqOpen.onsuccess = function(e) {
                resolve(e.target);
            }

            reqOpen.onerror = function(e) { 
                reject(e);
            }
            reqOpen.onblocked = function(e) { 
                reject(e);
            }
        });

    }
}