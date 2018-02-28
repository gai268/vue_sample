"use strict";

const MemoListPage = {
    template: `
    <div>
        <memo-title></memo-title>
        <div class="my-3 p-3 bg-white rounded box-shadow">
            <div class="row border-bottom border-gray pb-2 mb-0">
                <div class="col-6 align-baseline">
                    <small>{{memoList.length}}件のメモ</small>
                </div>
                <div class="col-6 text-right">
                    <memo-remove-button></memo-remove-button>
                    <memo-add-button></memo-add-button>
                </div>
            </div>
            <memo-list v-bind:memo-list="memoList"></memo-list>
        </div>
    </div>
    `,
    components: {
        "memo-title": MemoTitle,
        "memo-list": MemoList,
        "memo-add-button": MemoAddButton,
        "memo-remove-button": MemoRemoveButton        
    },
    computed: {
        memoList (){
            return this.$store.getters.memoList;
        }
    }
}