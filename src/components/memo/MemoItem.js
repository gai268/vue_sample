"use strict";

const MemoItem = {
    props: {
        id: [Number, String]

    },
    template: `
    <transition name="fade"> 
    <div class="media text-muted pt-3">
        <div class="flex-middle">
            <input type="checkbox" v-model="memoDetail.checked">
        </div>
        <div class="media-body pl-3 pb-3 mb-0 small lh-125 border-bottom border-gray">
            <div class="d-flex justify-content-between align-items-center w-100">
                <strong class="text-gray-dark">
                    {{ memoDetail.text | excerpt }}
                </strong> 
                <router-link v-bind:to="{ 
                    name:'memoDetailPageLink',params:{ id: memoDetail.id }
                }">編集</router-link>
            </div>
            <span class="d-block">
                {{memoDetail.updatedAt | formatDate}}
            </span>
        </div>
    </div>
    </transition>
    `,
    filters: {
        excerpt: function(value){
            const size = 20;
            return value ? value.substr(0, size) + "..." : "";
        },
        formatDate: function(date){            
            return date ? moment(date).format("YYYY年MM月DD日(ddd) HH:mm:ss") : "";
        }
    },
    computed: {
        memoDetail: function(){
            const self = this;
            return self.$store.getters.memoList.find( (memo) => {
                return parseInt(memo.id) === parseInt(self.id)
            } );
        }
    }
};
