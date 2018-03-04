"use strict";

describe('オブジェクトストアMemoの操作', () => {
    it('全データが削除できること', () => {
        let dao = null;

        const inputData = { text: "add test" };    
        return indexedDBUtil.connect()
            .then( conn     => dao = new MemoDao(conn))
            .then( ()       => dao.add(inputData) )
            .then( ()       => dao.getAll() )
            .then( result   => {
                for(let key in result){
                    dao.delete(result[key].id)
                }
            })
            .then( ()       => dao.getAll() )
            .then( result   => expect(result.length).to.be(0))
            ;
    });
});
