let baseUrl = "http://localhost:3000"
//const baseUrl = "https://fancy-todo-todoco-client.web.app"


function checkAuth () {
    if (localStorage.access_token) {
        afterLogin()
    }
    else {
        loginMenu()
    }
}

function onSignIn (googleUser) {
    const id_token = googleUser.getAuthResponse().id_token

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/loginGoogle`,
        data: {
            id_token
        }
    })
        .done(response => {
            localStorage.setItem("access_token", response.access_token)
            afterLogin()
        })
        .fail((xhr, status) => {

        })
        .always()
}

function googleSignOut () {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


function loginMenu () {
    $("#email").val('')
    $("#password").val('')
    $('#main-page').show()
    $('#content-page').hide()
    $('#login-page').show()
    $('#register-page').hide()
    $('#container-todo-list').hide()
}

function registerMenu () {
    $('#main-page').show()
    $('#content-page').hide()
    $('#register-page').show()
    $('#login-page').hide()
    $('#container-todo-list').hide()
}

function afterLogin () {
    $('#main-page').hide()
    $('#content-page').show()
    $('#addTodoForm').hide()
    $('#updateTodoForm').hide()
    $('#container-todo-list').show()
    $('#col-sidebar').show()
    getNews()
    $('#col-todolist').show()
    getTodoList()
    $('#logout-btn').show()
}

function loggedOut () {
    loginMenu()
    googleSignOut()

}

function formUpdateTodo (todoId) {
    $('#main-page').hide()
    $('#content-page').show()
    $('#col-sidebar').hide()
    $('#col-todolist').hide()
    $('#addTodoForm').hide()
    $('#updateTodoForm').show()
    $('#update-btn-confirm').click((event) => {
        event.preventDefault()
        updateTodo(todoId)
    })
    $('#logout-btn').show()
}

function addTodoForm () {
    $('#main-page').hide()
    $('#content-page').show()
    $('#col-sidebar').hide()
    $('#col-todolist').hide()
    $('#addTodoForm').show()
    $('#updateTodoForm').hide()
    $('#logout-btn').show()
}

function getNews () {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/news`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            $('#news-card').empty()
            let news = response
                $('#news-card').append(`
                        <div class="card-body">
                            <h5 class="card-title">${news.name}</h5>
                            <p class="card-text">${news.description}</p>
                            <a href='${news.url}' target='_blank' class="card-text">See more</a>
                        </div>
                        <div class='card-footer'>
                            <p class="card-text">fetched from <a href='https://newsapi.org/docs' target='_blank'>News API</a></p>
                        </div>
                `)
        })
        .fail(err => {
            console.log(err, '>>> this is error from ajax getNews')
        })
        .always(_ => {
            console.log('always from getNews')
        })
}

function getTodoList () {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            $("#todo-list").empty()
            let todoList = response
            todoList.forEach(element => {
                const statusText = element.status === true ? 'To do' : 'Done!'
                $('#todo-list').append(`
                                            <div class="card col-12 border-dark mt-3 mb-5" style="width: 18rem;">
                                <div class="card-header">${element.title}</div>
                                    <div class="row">
                                        <div class="col-2 mt-5 mb-5">
                                          <button id="done-btn" value='${element.id}' class="btn btn-primary">
                                          ${statusText}
                                          </button>
                                        </div>
                                        <div class="col-10">
                                            <div class="card-body text-dark text-justify">
                                                <p class="card-text">${element.description}</p>
                                                <p class="card-text">Due: ${element.due_date}</p>
                                                <button class="btn btn-primary" id='update-btn' value="${element.id}">Update</button>
                                                <button class="btn btn-danger" id='delete-btn' value="${element.id}">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                            </div>

`)
            })
        })
        .fail(err => {
            console.log(err, ">>>> this is error from ajax todolist")
        })
        .always(() => {
            console.log("ALWAYS from getTodoList!")
        })
}

function changeStatus (todoId, status) {
    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${todoId}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            status: !status
        }
    })
        .done(response => {
            console.log(">>>>> response dari changeStatus: ", response)
        })
        .fail(err => {
            console.log(err, ">>>> this is error from ajax changeStatus")
        })
        .always(() => {
            //console.log("ALWAYS!")
        })
}

function deleteTodo (todoId) {
    $("#todo-list").empty()
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${todoId}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            console.log(response, ">>>> this is response from ajax deletetodo")
            $('#delete-success').empty()
            if (response) {
                $('#delete-success').append(`
                                <div class="alert alert-success" role="alert" id="delete-success">
                                        ${response.message}
                                </div>
                                `)
            }
            setTimeout(() => {
                afterLogin()
            }, 500)
        })
        .fail(err => {
            console.log(err, ">>>> this is error from ajax deleteTodo")
        })
        .always(() => {
            //console.log("ALWAYS!")
        })
}

function updateTodo (todoId) {
    let title = $("#editTodoTitle").val()
    let description = $("#editTodoDescription").val()
    let due_date = $("#editTodoDueDate").val()
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${todoId}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            due_date
        }
    })
        .done(response => {
            $('#update-success').empty()
            if (response) {
                $('#update-success').append(`
                                <div class="alert alert-success" role="alert" id="update-sucess">
                                        Update Success!
                                </div>
                                `)
            }
            setTimeout(() => {
                afterLogin()
            }, 500)
        })
        .fail(err => {
            console.log(err, ">>>> this is error from ajax updateTodo")
        })
        .always(() => {
            //console.log("ALWAYS!")
            $("#editTodoTitle").val('')
            $("#editTodoDescription").val('')
            $("#editTodoDueDate").val('')
        })
}

function showStatus (todoId) {
    const el = $(`[value='${todoId}']#done-btn`)
    //console.log('the selected element:!', el[0].innerText)
    if (el[0].innerText === 'To do') {
        el[0].innerText = 'Done!'
        changeStatus(todoId, true)
    } else {
        el[0].innerText = 'To do'
        changeStatus(todoId, false)
    }
}

$(document).ready(function () {
    checkAuth()

    $('#register-btn').click((event) => {
        event.preventDefault()
        let email = $("#email").val()
        let password = $("#password").val()

        $.ajax({
            method: 'POST',
            url: `${baseUrl}/register`,
            data: {
                email,
                password
            }
        })
            .done(response => {
                checkAuth()
            })
            .fail((jqXHR, textStatus, error) => {
                let errMessagesRegister = jqXHR.responseJSON.messages
                $('#register-errors').empty()

                errMessagesRegister.forEach(element => {
                    $('#register-errors').append(`
                                <div class="alert alert-danger" role="alert" id="register-errors">
                                        ${element}
                                </div>
                                `)
                })
            })
            .always(() => {
                $("#email").val('')
                $("#password").val('')
                $('#register-errors').val('')
            })
    })

    $('#login-btn').click((event) => {
        event.preventDefault()
        let email = $("#email").val()
        let password = $("#password").val()

        $.ajax({
            method: 'POST',
            url: `${baseUrl}/login`,
            data: {
                email,
                password
            }
        })
            .done(response => {
                localStorage.setItem("access_token", response.access_token)
                checkAuth()
            })
            .fail((jqXHR, textStatus, error) => {
                let errMessagesLogin = jqXHR.responseJSON.messages
                $('#login-errors').empty()

                errMessagesLogin.forEach(element => {
                    $('#login-errors').append(`
                                <div class="alert alert-danger" role="alert">
                                        ${element}
                                </div>
                                `)
                })
            })
            .always(() => {
                $("#email").val('')
                $("#password").val('')
                $("#login-errors").val('')
            })
    })

    $('#logout-btn').click((event) => {
        event.preventDefault()
        localStorage.clear()
        loggedOut()
    })

    $('#register-link').click((event) => {
        event.preventDefault()
        $("#email").val('')
        $("#password").val('')
        registerMenu()
    })

    $('#login-link').click((event) => {
        event.preventDefault()
        $("#email").val('')
        $("#password").val('')
        loginMenu()
    })

    $('#delete-btn').click((event) => {
        event.preventDefault()
        deleteTodo()
    })

    $('#add-btn').click((event) => {
        event.preventDefault()
        addTodoForm()
    })

    $('#add-btn-confirm').click((event) => {
        event.preventDefault()
        let title = $("#addTodoTitle").val()
        let description = $("#addTodoDescription").val()
        let due_date = $("#addTodoDueDate").val()
        let status = false
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/todos`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                title,
                description,
                due_date,
                status
            }
        })
            .done(response => {
                $('#add-success').empty()
                if (response) {
                    $('#add-success').append(`
                                <div class="alert alert-success" role="alert" id="add-success">
                                        Add success!
                                </div>
                                `)
                }
                setTimeout(() => {
                    afterLogin()
                }, 500)
            })
            .fail(err => {
                console.log(err, ">>>> this is error from ajax addTodo")
            })
            .always(() => {
                //console.log("ALWAYS!")
                $("#addTodoTitle").val('')
                $("#addTodoDescription").val('')
                $("#addTodoDueDate").val('')
            })
    })

    $(document).on("click", "#update-btn", (event) => {
        event.preventDefault()
        const todoId = event.target.value
        formUpdateTodo(todoId)
    })

    $(document).on("click", "#delete-btn", (event) => {
        event.preventDefault()
        const todoId = event.target.value
        deleteTodo(todoId)
    })

    $(document).on("click", "#done-btn", (event) => {
        event.preventDefault()
        const todoId = event.target.value
        showStatus(todoId)
    })
})


