"use strict";

describe('オブジェクトストアの操作', () => {
    const objStoreName = 'Memo';

    it('インスタンスが作成できること', async () => {
        const conn = await indexedDBUtil.connect();
        expect(new Dao(conn, objStoreName)).to.ok();
    });
    it('add()が実行できること', async () => {
        const data = { text: "add test" };    

        const conn = await indexedDBUtil.connect();
        const id = await new Dao(conn, objStoreName).add(data);
        console.log("add test id:" + id);
        expect(id).to.ok();
    });
    it('引数無しでadd()が実行できること', async () => {
        const conn = await indexedDBUtil.connect();
        const id = await new Dao(conn, objStoreName).add();
        expect(id).to.ok();
    });
    it('put()が実行できること', async () => {
        const data = { id: 2, text: "put test" };

        const conn = await indexedDBUtil.connect();
        await new Dao(conn, objStoreName).put(data);
        expect(true).to.ok();
    });
    it('get()が実行できること', async () => {
        const id = 1;    

        const conn = await indexedDBUtil.connect();
        const result =  await new Dao(conn, objStoreName).get(id);
        console.dir(result);
        expect(true).to.ok()
    });
    it('getAll()が実行できること', async () => {
        const conn = await indexedDBUtil.connect();
        const result = await new Dao(conn, objStoreName).getAll();
        console.dir(result);
        expect(true).to.ok();
    });
    it('delete()が実行できること', async () => {
        const id = 1;
        const conn = await indexedDBUtil.connect();
        await new Dao(conn, objStoreName).delete(id);
        expect(true).to.ok();
    });
});