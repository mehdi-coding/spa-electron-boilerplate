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
                    window      : "newWin",
                    width       : 1000,
                    height      : 500,
                    closeCurrent: false,
                    modal       : true
                }
    },
    {
        id      : "openModule",
        win     : {
                    module      : "main",
                }
    }
]

module.exports = routes;