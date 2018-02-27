"use strict";

const routes = [{
    path: '/', 
    component: MemoListPage 
},{ 
    name: "memoDetailPageLink", 
    path: '/memo/detail/:id', 
    component: MemoDetailPage,
    props: true
}];
const router = new VueRouter({routes});
