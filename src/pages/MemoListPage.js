"use strict";

const MemoListPage = {
    template: `
        <div>
            <div class="row border-bottom border-gray pb-2 mb-0">
                <div class="col-6 align-baseline">
                    <small>{{memoList.length}}件のメモ</small>
                </div>
                <div class="col-6 text-right">
                    <memo-add-button></memo-add-button>
                </div>
            </div>
            <memo-list v-bind:memo-list="memoList"></memo-list>
        </div>
    `,
    components: {
        "memo-list": MemoList,
        "memo-add-button": MemoAddButton,
        
    },
    computed: {
        memoList (){
            return this.$store.getters.memoList;
        }
    }
}