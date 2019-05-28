# Dyplom API

### <b>NOTE:</b> To access secure endpoints, you need to pass `x-api-key` header to each request.

## Users

**Registration**

----
    Returns json data about a single user.
    
* **URL**

    /registration

* **Method:**

    `POST`

* **Data params**

    `email=[string]`

    `role=['USER' || 'ADMIN' || 'SUPER_ADMIN']`
    
    `password=[string]`
    
    `firstName=[string]`
    
    `surName=[string]`
    
        
* **Sample request json:**

    ```json
    {
        "email": "fred@fred.com",
        "role": "USER",
        "password": "qwerty",
        "firstName": "Fred",
        "surName": "Cox"
    }
    ```

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 
       
    ```json
    {
        "id": 22,
        "role": "SUPER_ADMIN",
        "email": "te3@test",
        "password": "dambldor",
        "firstName": "salat3",
        "surName": "salat",
        "image": "" OR "image base64",
        "userHash": "108b87b035746b643448e90ffee71389",
        "apiKey": null OR "string code"
    }
    ```
*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "User had been already created..."
    }
    ```

**Update user**
----
    Updates user data.
    
* **URL**

    /users/:id

* **Method:**

    `PUT`

* **Data params**

    `email=[string]`

    `role=['USER' || 'ADMIN' || 'SUPER_ADMIN']`
    
    `password=[string]`
    
    `firstName=[string]`
    
    `surName=[string]`

* **Sample request json:**

    ```json
    {
        "firstName":"salat1",
        "surName":"salat",
        "password":"dambldor",
        "email":"test3@test",
        "role":"SUPER_ADMIN"
    }
    ```

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 
       
    ```json
    {
        "id": 22,
        "role": "SUPER_ADMIN",
        "email": "te3@test",
        "password": "dambldor",
        "firstName": "salat3",
        "surName": "salat",
        "image": "" OR "image base64",
        "userHash": "108b87b035746b643448e90ffee71389",
        "apiKey": null OR "string code"
    }
    ```
    
**Login via email and password:**
----

* **URL**

    /login
    
* **Method:**

    `POST`

* **Sample request json:**

    ```json
    {
        "password":"dambldor",
        "email":"test3@test"
    }
    ```
* **Success response:**

    *   **Code** 200 <br/>
        **Content:**

    ```json
    {
        "id": 22,
        "role": "SUPER_ADMIN",
        "email": "te3@test",
        "password": "dambldor",
        "firstName": "salat3",
        "surName": "salat",
        "image": "" OR "image base64",
        "userHash": "108b87b035746b643448e90ffee71389",
        "apiKey": null OR "string code"
    }
    ```
*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Invalid email or password."
    }
    ```

**Get all users:**
----
    
*   **URL**

    /users
    
*   **Method:**
    
    `GET`

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    {
        "id": 22,
        "role": "SUPER_ADMIN",
        "email": "te3@test",
        "password": "dambldor",
        "firstName": "salat3",
        "surName": "salat",
        "image": "" OR "image base64",
        "userHash": "108b87b035746b643448e90ffee71389",
        "apiKey": null OR "string code"
    }
    ```

**Delete user:**

----

*   **URL**

    /users/:id
    
*   **Method:**
    
    `DELETE`
    
*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    {
        "message": "User is deleted successfully."
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "User not found."
    }
    ```

**Add user image:**
----

*   **URL**

    /users/:id/image
    
*   **Method:**
    
    `POST`

*   **Data params:**
    
    `image=[string]`
    
*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    {
        "message": "Image is set successfully."
    }
    ```

* **Sample request json:**

    ```json
    {
        "image": "image base64"
    }
    ```
