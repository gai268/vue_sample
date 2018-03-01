"use strict";

const App = {
    template: `
    <div>
        <div class="container">
            <div class="header clearfix">
                <nav>
                    <ul class="nav nav-pills float-right">
                    <li class="nav-item">
                        <router-link class="nav-link" exact-active-class="active" to="/">
                            メモ帳
                        </router-link>
                    </li>
                    </ul>
                </nav>
                <h3 class="text-muted">APP</h3>
            </div>
        </div>
        <main role="main" class="container">
            <transition name="page">    
                <router-view></router-view>
            </transition>
        </main>
    </div>
    `
}