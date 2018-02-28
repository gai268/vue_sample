"use strict";

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        memoList: [{
            id: 0 ,
            text: "",
            updatedAt: "",
            checked: false
        }]
    },
    getters: {
        memoList: state => state.memoList
    },
    mutations: {
        /**
         * ストアのメモ一覧を全削除
         */
        deleteMemoListAll (state){
            state.memoList.splice(0); // 全削除
        },
        /**
         * ストアにメモ追加
         */
        pushMemo (state, memoDetail){
            state.memoList.push(memoDetail);
        },
        /**
         * ストアのメモの更新日を最新にする
         */
        updateMemoUpdatedAt (state, id) {
            const memoDetail = state.memoList.find( memo =>  {
                return parseInt(memo.id) === parseInt(id);
            });
            memoDetail.updatedAt = new Date();
        },
        /**
         * ストアのメモ削除
         */
        removeMemo (state, id){
            const memoDetail = state.memoList.find( memo =>  {
                return parseInt(memo.id) === parseInt(id);
            });
            const index = state.memoList.indexOf(memoDetail);
            state.memoList.splice(index,1);
        },
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
                commit('pushMemo',{
                    id: memo.id,
                    text: memo.text,
                    updatedAt: memo.updatedAt,
                    checked: false
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
                commit('updateMemoUpdatedAt', id);

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
        async addMemoDetail ({commit, state, dispatch}){
            // indexedDBに新規追加
            const conn = await indexedDBUtil.connect();
            const memoDao = new MemoDao(conn);
            const id = await memoDao.add();

            // 追加データをstoreに反映
            const memo = await memoDao.get(id);
            commit('pushMemo',{
                id: memo.id,
                text: memo.text,
                updatedAt: memo.updatedAt
            });

            //　更新日付などを再度更新
            dispatch('updatedMemoDetail',{id});
            return id;
        },
        /**
         * チェックされたメモを削除する
         */
        async removeCheckedMemoDetail ({commit, state}){
            const conn = await indexedDBUtil.connect();
            const memoDao = new MemoDao(conn);
            
            for (var i = 0; i < state.memoList.length; i++) {
                const memoDetail = state.memoList[i];
                if(memoDetail.checked){
                    // indexedDBから削除
                    await memoDao.delete(memoDetail.id);
                    // 削除をstoreに反映
                    commit('removeMemo', memoDetail.id);
                    // 配列構成変更の為、デクリメントして再度チェックさせる
                    i--;
                }
            }
        }


    }
})