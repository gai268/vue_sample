"use strict";

const MemoDetailPage = {
    props: {
        id: [Number, String]
    },
    template: `
    <div>
        <memo-title></memo-title>
        <div class="my-3 p-3 bg-white rounded box-shadow">
            <memo-detail v-if="memoDetail" :id="id"/>
            <div v-else>既に削除されているか、存在しないメモです。</div>
        </div>
    </div>
    `,
    components: {
        "memo-title": MemoTitle,
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