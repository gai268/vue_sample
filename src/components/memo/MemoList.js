"use strict";

const MemoList = {
    template: `
        <div>
            <memo-item v-for="memoDetail in memoList" 
                :key="memoDetail.id" :id="memoDetail.id"/>
            <div class="media pt-3" v-if="memoList.length === 0">No Data</div>
        </div>
    `,
    components: {
        "memo-item": MemoItem
    },
    computed: {
        memoList (){
            const memoList = this.$store.getters.memoList;
            return memoList.sort(function(a,b){
                if( moment(a.updatedAt).isAfter(b.updatedAt) ){
                    return -1;                
                }else if(moment(a.updatedAt).isBefore(b.updatedAt)){
                    return 1;
                }
                return 0;
            });
        }
    }
};
