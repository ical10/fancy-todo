// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
var baseUrl = "http://localhost:3000"; //const baseUrl = "https://fancy-todo-todoco-client.web.app"

function checkAuth() {
  if (localStorage.access_token) {
    afterLogin();
  } else {
    loginMenu();
  }
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: "".concat(baseUrl, "/loginGoogle"),
    data: {
      id_token: id_token
    }
  }).done(function (response) {
    localStorage.setItem("access_token", response.access_token);
    afterLogin();
  }).fail(function (xhr, status) {}).always();
}

function googleSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function loginMenu() {
  $("#email").val('');
  $("#password").val('');
  $('#main-page').show();
  $('#content-page').hide();
  $('#login-page').show();
  $('#register-page').hide();
  $('#container-todo-list').hide();
}

function registerMenu() {
  $('#main-page').show();
  $('#content-page').hide();
  $('#register-page').show();
  $('#login-page').hide();
  $('#container-todo-list').hide();
}

function afterLogin() {
  $('#main-page').hide();
  $('#content-page').show();
  $('#addTodoForm').hide();
  $('#updateTodoForm').hide();
  $('#container-todo-list').show();
  $('#col-sidebar').show();
  getNews();
  $('#col-todolist').show();
  getTodoList();
  $('#logout-btn').show();
}

function loggedOut() {
  loginMenu();
  googleSignOut();
}

function formUpdateTodo(todoId) {
  $('#main-page').hide();
  $('#content-page').show();
  $('#col-sidebar').hide();
  $('#col-todolist').hide();
  $('#addTodoForm').hide();
  $('#updateTodoForm').show();
  $('#update-btn-confirm').click(function (event) {
    event.preventDefault();
    updateTodo(todoId);
  });
  $('#logout-btn').show();
}

function addTodoForm() {
  $('#main-page').hide();
  $('#content-page').show();
  $('#col-sidebar').hide();
  $('#col-todolist').hide();
  $('#addTodoForm').show();
  $('#updateTodoForm').hide();
  $('#logout-btn').show();
}

function getNews() {
  $.ajax({
    method: 'GET',
    url: "".concat(baseUrl, "/news"),
    headers: {
      access_token: localStorage.access_token
    }
  }).done(function (response) {
    $('#news-card').empty();
    var news = response;
    $('#news-card').append("\n                        <div class=\"card-body\">\n                            <h5 class=\"card-title\">".concat(news.name, "</h5>\n                            <p class=\"card-text\">").concat(news.description, "</p>\n                            <a href='").concat(news.url, "' target='_blank' class=\"card-text\">See more</a>\n                        </div>\n                        <div class='card-footer'>\n                            <p class=\"card-text\">fetched from <a href='https://newsapi.org/docs' target='_blank'>News API</a></p>\n                        </div>\n                "));
  }).fail(function (err) {
    console.log(err, '>>> this is error from ajax getNews');
  }).always(function (_) {
    console.log('always from getNews');
  });
}

function getTodoList() {
  $.ajax({
    method: 'GET',
    url: "".concat(baseUrl, "/todos"),
    headers: {
      access_token: localStorage.access_token
    }
  }).done(function (response) {
    $("#todo-list").empty();
    var todoList = response;
    todoList.forEach(function (element) {
      var statusText = element.status === true ? 'To do' : 'Done!';
      $('#todo-list').append("\n                                            <div class=\"card col-12 border-dark mt-3 mb-5\" style=\"width: 18rem;\">\n                                <div class=\"card-header\">".concat(element.title, "</div>\n                                    <div class=\"row\">\n                                        <div class=\"col-2 mt-5 mb-5\">\n                                          <button id=\"done-btn\" value='").concat(element.id, "' class=\"btn btn-primary\">\n                                          ").concat(statusText, "\n                                          </button>\n                                        </div>\n                                        <div class=\"col-10\">\n                                            <div class=\"card-body text-dark text-justify\">\n                                                <p class=\"card-text\">").concat(element.description, "</p>\n                                                <p class=\"card-text\">Due: ").concat(element.due_date, "</p>\n                                                <button class=\"btn btn-primary\" id='update-btn' value=\"").concat(element.id, "\">Update</button>\n                                                <button class=\"btn btn-danger\" id='delete-btn' value=\"").concat(element.id, "\">Delete</button>\n                                            </div>\n                                        </div>\n                                    </div>\n                            </div>\n\n"));
    });
  }).fail(function (err) {
    console.log(err, ">>>> this is error from ajax todolist");
  }).always(function () {
    console.log("ALWAYS from getTodoList!");
  });
}

function changeStatus(todoId, status) {
  $.ajax({
    method: 'PATCH',
    url: "".concat(baseUrl, "/todos/").concat(todoId),
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      status: !status
    }
  }).done(function (response) {
    console.log(">>>>> response dari changeStatus: ", response);
  }).fail(function (err) {
    console.log(err, ">>>> this is error from ajax changeStatus");
  }).always(function () {//console.log("ALWAYS!")
  });
}

function deleteTodo(todoId) {
  $("#todo-list").empty();
  $.ajax({
    method: 'DELETE',
    url: "".concat(baseUrl, "/todos/").concat(todoId),
    headers: {
      access_token: localStorage.access_token
    }
  }).done(function (response) {
    console.log(response, ">>>> this is response from ajax deletetodo");
    $('#delete-success').empty();

    if (response) {
      $('#delete-success').append("\n                                <div class=\"alert alert-success\" role=\"alert\" id=\"delete-success\">\n                                        ".concat(response.message, "\n                                </div>\n                                "));
    }

    setTimeout(function () {
      afterLogin();
    }, 500);
  }).fail(function (err) {
    console.log(err, ">>>> this is error from ajax deleteTodo");
  }).always(function () {//console.log("ALWAYS!")
  });
}

function updateTodo(todoId) {
  var title = $("#editTodoTitle").val();
  var description = $("#editTodoDescription").val();
  var due_date = $("#editTodoDueDate").val();
  $.ajax({
    method: 'PUT',
    url: "".concat(baseUrl, "/todos/").concat(todoId),
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title: title,
      description: description,
      due_date: due_date
    }
  }).done(function (response) {
    $('#update-success').empty();

    if (response) {
      $('#update-success').append("\n                                <div class=\"alert alert-success\" role=\"alert\" id=\"update-sucess\">\n                                        Update Success!\n                                </div>\n                                ");
    }

    setTimeout(function () {
      afterLogin();
    }, 500);
  }).fail(function (err) {
    console.log(err, ">>>> this is error from ajax updateTodo");
  }).always(function () {
    //console.log("ALWAYS!")
    $("#editTodoTitle").val('');
    $("#editTodoDescription").val('');
    $("#editTodoDueDate").val('');
  });
}

function showStatus(todoId) {
  var el = $("[value='".concat(todoId, "']#done-btn")); //console.log('the selected element:!', el[0].innerText)

  if (el[0].innerText === 'To do') {
    el[0].innerText = 'Done!';
    changeStatus(todoId, true);
  } else {
    el[0].innerText = 'To do';
    changeStatus(todoId, false);
  }
}

$(document).ready(function () {
  checkAuth();
  $('#register-btn').click(function (event) {
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    $.ajax({
      method: 'POST',
      url: "".concat(baseUrl, "/register"),
      data: {
        email: email,
        password: password
      }
    }).done(function (response) {
      checkAuth();
    }).fail(function (jqXHR, textStatus, error) {
      var errMessagesRegister = jqXHR.responseJSON.messages;
      $('#register-errors').empty();
      errMessagesRegister.forEach(function (element) {
        $('#register-errors').append("\n                                <div class=\"alert alert-danger\" role=\"alert\" id=\"register-errors\">\n                                        ".concat(element, "\n                                </div>\n                                "));
      });
    }).always(function () {
      $("#email").val('');
      $("#password").val('');
      $('#register-errors').val('');
    });
  });
  $('#login-btn').click(function (event) {
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    $.ajax({
      method: 'POST',
      url: "".concat(baseUrl, "/login"),
      data: {
        email: email,
        password: password
      }
    }).done(function (response) {
      localStorage.setItem("access_token", response.access_token);
      checkAuth();
    }).fail(function (jqXHR, textStatus, error) {
      var errMessagesLogin = jqXHR.responseJSON.messages;
      $('#login-errors').empty();
      errMessagesLogin.forEach(function (element) {
        $('#login-errors').append("\n                                <div class=\"alert alert-danger\" role=\"alert\">\n                                        ".concat(element, "\n                                </div>\n                                "));
      });
    }).always(function () {
      $("#email").val('');
      $("#password").val('');
      $("#login-errors").val('');
    });
  });
  $('#logout-btn').click(function (event) {
    event.preventDefault();
    localStorage.clear();
    loggedOut();
  });
  $('#register-link').click(function (event) {
    event.preventDefault();
    $("#email").val('');
    $("#password").val('');
    registerMenu();
  });
  $('#login-link').click(function (event) {
    event.preventDefault();
    $("#email").val('');
    $("#password").val('');
    loginMenu();
  });
  $('#delete-btn').click(function (event) {
    event.preventDefault();
    deleteTodo();
  });
  $('#add-btn').click(function (event) {
    event.preventDefault();
    addTodoForm();
  });
  $('#add-btn-confirm').click(function (event) {
    event.preventDefault();
    var title = $("#addTodoTitle").val();
    var description = $("#addTodoDescription").val();
    var due_date = $("#addTodoDueDate").val();
    var status = false;
    $.ajax({
      method: 'POST',
      url: "".concat(baseUrl, "/todos"),
      headers: {
        access_token: localStorage.access_token
      },
      data: {
        title: title,
        description: description,
        due_date: due_date,
        status: status
      }
    }).done(function (response) {
      $('#add-success').empty();

      if (response) {
        $('#add-success').append("\n                                <div class=\"alert alert-success\" role=\"alert\" id=\"add-success\">\n                                        Add success!\n                                </div>\n                                ");
      }

      setTimeout(function () {
        afterLogin();
      }, 500);
    }).fail(function (err) {
      console.log(err, ">>>> this is error from ajax addTodo");
    }).always(function () {
      //console.log("ALWAYS!")
      $("#addTodoTitle").val('');
      $("#addTodoDescription").val('');
      $("#addTodoDueDate").val('');
    });
  });
  $(document).on("click", "#update-btn", function (event) {
    event.preventDefault();
    var todoId = event.target.value;
    formUpdateTodo(todoId);
  });
  $(document).on("click", "#delete-btn", function (event) {
    event.preventDefault();
    var todoId = event.target.value;
    deleteTodo(todoId);
  });
  $(document).on("click", "#done-btn", function (event) {
    event.preventDefault();
    var todoId = event.target.value;
    showStatus(todoId);
  });
});
},{}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55934" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map