"use strict";

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        memoList: [{
            id: 0 ,
            text: "",
            updatedAt: ""
        }]
    },
    getters: {
        memoList: state => state.memoList
    },
    mutations: {
        /**
         * メモ一覧を全削除
         */
        deleteMemoListAll (state){
            state.memoList.splice(0); // 全削除
        },
        /**
         * メモ一覧に追加
         */
        pushMemoList (state, memoDetail){
            state.memoList.push(memoDetail);
        },
        /**
         * メモの更新日を最新にする
         */
        updateMemoDetailUpdatedAt (state, id) {
            const memoDetail = state.memoList.find( memo =>  {
                return parseInt(memo.id) === parseInt(id);
            });
            memoDetail.updatedAt = new Date();
        }
    },
    actions: {
        /**
         *  全メモデータの初期化処理
         */
        async initMemoList({commit, state}){
            commit('deleteMemoListAll');

            // indexedDBから取得
            const conn = await indexedDBUtil.connect();
            const memoList = await new MemoDao(conn).getAll();
            memoList.forEach(memo => {
                commit('pushMemoList',{
                    id: memo.id,
                    text: memo.text,
                    updatedAt: memo.updatedAt
                });        
            });
        },
        /**
         * メモの詳細を更新する
         */
        async updatedMemoDetail ({commit, state}, {id}) {
            const target = state.memoList.find( memo =>  {
                return parseInt(memo.id) === parseInt(id);
            } );

            if(target){
                // 更新日時を最新にする
                commit('updateMemoDetailUpdatedAt', id);

                // indexedDBに保存
                const conn = await indexedDBUtil.connect();
                await new MemoDao(conn).put({
                    id: target.id, 
                    text: target.text,
                    updatedAt: target.updatedAt
                });
            }
        },
        /**
         * メモの詳細を新規追加する
         */
        async addMemoDetail ({commit, state}){
            // indexedDBに新規追加
            const conn = await indexedDBUtil.connect();
            const memoDao = new MemoDao(conn);
            const id = await memoDao.add();
            console.log("id:" + id);

            // 追加データをstoreに反映
            const memo = await memoDao.get(id);
            commit('pushMemoList',{
                id: memo.id,
                text: memo.text,
                updatedAt: memo.updatedAt
            });
            // 更新日時を最新にする
            commit('updateMemoDetailUpdatedAt', id);

            return id;
        }
    }
})