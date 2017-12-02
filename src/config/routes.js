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
        win     : "newWin",
        init    : typeof updateTable === "function" ? updateTable : null
    },
    {
        id      : ["addUserRoute", "mainToAddUser"],
        class   : "addUserRouteClass",
        module  : "addUser",
        init    : typeof addInit === "function" ? addInit : null
    },
    {
        id      : "openNewWinBtn",
        win     : {
                    source      : "newWin",
                    width       : 1000,
                    height      : 500,
                    closeCurrent: false,
                    modal       : true
                }
    }
]

module.exports = routes;