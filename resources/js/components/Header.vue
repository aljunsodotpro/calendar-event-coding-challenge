<template>
    <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Calendar Event (Coding Challenge)</router-link>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li>
                        <router-link to="/calendar-view" class="nav-link">Calendar View</router-link>
                    </li>
                    <li>
                        <router-link to="/list-view" class="nav-link">List View</router-link>
                    </li>
                </ul>
            </div>

        </div>

    </nav>
</template>