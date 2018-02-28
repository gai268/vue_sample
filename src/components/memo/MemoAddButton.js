"use strict";

const MemoAddButton = {
    template: `
    <button @click="add" class="btn btn-sm btn-outline-secondary">
        <i class="fa fa-1x fa-plus-circle"></i> 追加                    
    </button>
    `,
    methods: {
        add(){
            const self = this;
            self.$store.dispatch('addMemoDetail')
                .then( memoId => {
                    self.$router.push({
                        name: 'memoDetailPageLink', 
                        params: { id: memoId }
                    });        
                });
        }
    }

}