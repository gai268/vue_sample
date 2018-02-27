"use strict";

const MemoAddButton = {
    template: `
    <button @click="addMemoDetail" class="btn btn-sm btn-outline-secondary">
        <i class="fa fa-1x fa-plus-circle"></i> 追加                    
    </button>
    `,
    methods: {
        addMemoDetail(){
            const self = this;
            self.$store.dispatch('addMemoDetail')
                .then( memoId => {
                    console.log("addMemoDetail id: " + memoId);
                    self.$router.push({
                        name: 'memoDetailPageLink', 
                        params: { id: memoId }
                    });        
                });
        }
    }

}