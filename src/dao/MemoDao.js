"use strict";

class MemoDao extends Dao{
    constructor(conn){
        const objStoreName = 'Memo';
        super(conn, objStoreName);
    }
}
