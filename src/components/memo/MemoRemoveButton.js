"use strict";

const MemoRemoveButton = {
    template: `
    <button @click="remove" class="btn btn-sm btn-outline-danger">
        <i class="fa fa-1x fa-minus-circle"></i> 選択したメモを削除         
    </button>
    `,
    methods: {
        remove(){
            const self = this;
            if(confirm('選択した項目を削除しますか？')){
                self.$store.dispatch('removeCheckedMemoDetail');
            }
        }
    }

}