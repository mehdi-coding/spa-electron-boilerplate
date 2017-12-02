let routes = 
[
    {
        id      : ["mainRoute", "footerMainRouteBtn"],
        class   : "mainRouteClass",
        module  : "main"
    },
    {
        id      : "allUsersRoute",
        class   : "allUsersRouteClass",
        module  : "allUsers",
        init    : typeof updateTable === "function" ? updateTable : null
    },
    {
        id      : "addUserRoute",
        class   : "addUserRouteClass",
        module  : "addUser",
        init    : typeof addInit === "function" ? addInit : null
    },
    {
        id      : "openNewWinBtn",
        win     : "newWin"
    }
]

module.exports = routes;