"use strict";

const MemoDetail = {
    props: {
        id: [Number, String]
    },
    template: `
    <div>
        <h6 class="border-bottom border-gray pb-2 mb-6">
        {{memoDetail.updatedAt | formatDate}}
        </h6>
        <div class="form-group">
            <textarea rows="10" class="form-control" v-model="memoDetail.text"></textarea>
        </div>
    </div>
    `,
    watch: {
        "memoDetail.text": {
            handler: function(val){
                this.$store.dispatch('updatedMemoDetail', {
                    id: this.memoDetail.id
                });
            }, deep: false
        }
    },
    filters: {
        formatDate: function(date){            
            return date ? moment(date).format("YYYY年MM月DD日(ddd) HH:mm:ss") : "";
        }
    },
    computed: {
        memoDetail: function(){
            const self = this;
            const memoDetail = self.$store.getters.memoList.find( (memo) => {
                return parseInt(memo.id) === parseInt(self.id)
            } );
            return memoDetail;
        }
    }
};
