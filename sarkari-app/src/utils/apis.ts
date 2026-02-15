const APIs = {
    AUTH: {
        LOGIN: "auth/login/",
        LOGOUT: "auth/logout/",
        REGISTER: "auth/register/"
    },
    FEED: {
        CREATE: "feed/create/",
        GET: "feed/get/",
        TODAY_FEED: "feed/today-feed/",
        USER_FEED__UPDATE: "feed/user-feed/update"
    },
    MASTER: {
        SUBJECT: "master/subject/",
        SUBJECT__DELETE__id: "master/subject/delete/{subjectId}",
        SUBJECT__GET: "master/subject/get/",
        SUBJECT__UPDATE__id: "master/subject/update/{id}",
        USER__SUBJECT: "master/user-subject/"
    }
}

export default APIs