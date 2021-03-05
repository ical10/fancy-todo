**fancy-todo**
----
This website helps you create interesting things to do, with fancy interface.

Below are the list of the API calls.

**Show Todos**
----

* **URL**
  /todos

* **Method:** 
  `GET`

*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**
  
    * **Code:** 200 <br />
    **Content:** `[
    { 
    id : 1,
    title: "learn Vue",
    description: "learning Vue for front-end development",
    due_date: "2021-01-29",
    status: false
    },
    { 
    id : 2,
    title: "learn using Postman GUI",
    description: "using Postman to efficiently test webapp",
    due_date: "2021-03-01",
    status: false
    }
    ]`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ message: "Internal server error." }`

* **Sample Call:**

    `localhost:3000/todos`

* **Notes:**

    None

**Create Todo**
----

* **URL**
  /todos

* **Method:** 
  `POST`

*  **URL Params**

    None

* **Data Params**
    
    **Content:** `{ 
    title: "learn AJAX",
    description: "front-end with AJAX",
    due_date: "2021-01-25",
    status: false
    }
    `

* **Success Response:**
  
    * **Code:** 200 OK <br />
    **Content:** `{ 
    id: 3,
    title: "learn AJAX",
    description: "front-end with AJAX",
    due_date: "2021-01-25",
    status: false
    }
    `

* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{ message: "Date must be greater than today!" }`

    OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ message: "Internal server error." }`

* **Sample Call:**

    `localhost:3000/todos`

* **Notes:**

    None

**Show Todo by id**
----

* **URL**
  /todos/:id

* **Method:** 
  `GET`

*  **URL Params**

    `id=[integer]`

* **Data Params**
    
    None

* **Success Response:**
  
    * **Code:** 200 OK <br />
    **Content:** `{ 
    id : 1,
    title: "learn Vue",
    description: "learning Vue for front-end development",
    due_date: "2021-01-29",
    status: false
    }`

* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{ message: "Error: todo not found."}`
    
    OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{message: "Internal server error."}`


* **Sample Call:**

    `localhost:3000/todos/1`

* **Notes:**

    None

**Update Todo by id**
----

* **URL**
  /todos/:id

* **Method:** 
  `PUT`

*  **URL Params**

    `id=[integer]`

* **Data Params**
    
    **Content:** `{ 
    title: "learn Vue-cli",
    description: "using Vue-cli for faster development",
    due_date: "2021-01-25",
    status: false
    }
    `

* **Success Response:**
  
    * **Code:** 200 OK <br />
    **Content:** `{
    id: 1,
    title: "learn Vue-cli",
    description: "using Vue-cli for faster development",
    due_date: "2021-01-25",
    status: false
    }
    `

* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{message: "Date must be greater than today!"}`

    OR

  * **Code:** 404 Not Found <br />
    **Content:** `{ message: "Error: todo not found."}`
    
    OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{message: "Internal server error."}`


* **Sample Call:**

    `localhost:3000/todos/1`

* **Notes:**

    None

**Update a field in Todo by id**
----

* **URL**
  /todos/:id

* **Method:** 
  `PATCH`

*  **URL Params**

    `id=[integer]`

* **Data Params**
    
    **Content:** `{ 
    status: true
    }
    `

* **Success Response:**
  
    * **Code:** 200 OK <br />
    **Content:** `{
    id: 1,
    title: "learn Vue-cli",
    description: "using Vue-cli for faster development",
    due_date: "2021-01-25",
    status: true
    }
    `

* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `[
    {
        message: "Status must be either true or false!"
    },
    {
        message: "Status must be filled!"
    }
    ]`

    OR

  * **Code:** 404 Not Found <br />
    **Content:** `{ message: "Error: todo not found."}`
    
    OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{message: "Internal server error."}`


* **Sample Call:**

    `localhost:3000/todos/1`

* **Notes:**

    None


**Delete Todo by id**
----

* **URL**
  /todos/:id

* **Method:** 
  `DELETE`

*  **URL Params**

    `id=[integer]`

* **Data Params**
    
    None

* **Success Response:**
  
    * **Code:** 200 OK <br />
    **Content:** `{
    message: "Todo successfully deleted."
    }
    `

* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{ message: "Error: todo not found."}`
    
    OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{message: "Internal server error."}`


* **Sample Call:**

    `localhost:3000/todos/1`

* **Notes:**

    None

