"use strict";

class Dao{
    constructor(conn, objStoreName){
        this._db = conn.result;
        this._tran = conn.transaction ? conn.transaction : this._db.transaction([objStoreName],"readwrite");
        this._objStore= this._tran.objectStore(objStoreName);
    }
    async add(data){
        const self = this;
        data = data ? data : {};
        return new Promise((resolve, reject) => {
            const request = self._objStore.add(data);    

            request.onsuccess = event => {
                const id = event.target.result;
                resolve(id)
            };
        });
    }
    async put(data){
        const self = this;
        return new Promise((resolve, reject) => {
            const request = self._objStore.put(data);

            request.onsuccess = () => resolve();
        });
    }
    async get(id){
        const self = this;
        return new Promise((resolve, reject) => {
            const request = self._objStore.get(id);
    
            request.onerror =   (e) => reject(e);
            request.onsuccess = (e) => resolve(event.target.result);       
        });
    }
    async getAll(){
        const self = this;
        return new Promise((resolve, reject) => {
            const result = [];

            // カーソル行ごとにonsuccessのコールバックが実行される
            self._objStore.openCursor().onsuccess = (e) =>{
                const cursor = e.target.result;
                if(cursor){
                    result.push(cursor.value);
                    cursor.continue();
                }else{
                    // カーソルが終端に達したので取得結果を返す
                    resolve(result);
                }
            };
        });

    }
    async delete(id){
        const self = this;
        return new Promise((resolve, reject) => {
            const request = self._objStore.delete(id);

            request.onsuccess = () => resolve();
        });
    }

}
