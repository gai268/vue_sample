"use strict";

const MemoDetailPage = {
    props: {
        id: [Number, String]
    },
    template: `
        <memo-detail v-if="memoDetail" :id="id">
        </memo-detail>
    `,
    components: {
        "memo-detail": MemoDetail
    },
    computed: {
        memoDetail(){
            const self = this;
            return self.$store.getters.memoList.find( (memo) => {
                return parseInt(memo.id) === parseInt(self.id)
            } );
        }
    }
}