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
    Updates user data. Returns json data about a single user.
    
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
    Returns json data about a single user.

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
    Returns json data about all users.

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
    Delete user data.

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
    Insert image (if hasn't been already created) to db. Add image data to user.
    
*   **URL**

    /user/:id/image
    
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

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "User not found."
    }
    ```

## Company

**Create**

----
    Returns json data about a single company.
    
* **URL**

    /company

* **Method:**

    `POST`

* **Data params**

    `name=[string]`
    
    `discount=[[number]]`
        
* **Sample request json:**

    ```json
    {
        "name": "uwqhdiuiuqwheiu uwqhdiuwq",
    	"discount": [1,2,3]
    }
    ```

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 
       
    ```json
    {
        "id": 2,
        "name": "uwqhdiuiuqwheiu uwqhdiuwq",
        "image": "" OR "image base64",
        "discount": "[1,2,3]"
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Company not found."
    }
    ```

**Update company**
----
    Updates company data.
    
* **URL**

    /company/:id

* **Method:**

    `PUT`

* **Data params**

    `name=[string]`
    
    `discount=[[number]]`


* **Sample request json:**

    ```json
    {
        "name": "uwqhdiuiuqwheiu uwqhdiuwq",
    	"discount": [1,2,3]
    }
    ```

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 
       
    ```json
    {
        "id": 2,
        "name": "uwqhdiuiuqwheiu uwqhdiuwq",
        "image": "" OR "image base64",
        "discount": "[1,2,3]"
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Company not found."
    }
    ```
    
**Get one:**
----
    Returns json data about a single company.

* **URL**

    /company/:id
    
* **Method:**

    `GET`

* **Success response:**

    *   **Code** 200 <br/>
        **Content:**

    ```json
    {
        "id": 2,
        "name": "uwqhdiuiuqwheiu uwqhdiuwq",
        "image": "" OR "image base64",
        "discount": "[1,2,3]"
    }
    ```
*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Company not found."
    }
    ```

**Get all companies:**
----
    Returns json data about all companies.

*   **URL**

    /companies
    
*   **Method:**
    
    `GET`

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    [
        {
            "id": 2,
            "name": "uwqhdiuiuqwheiu uwqhdiuwq",
            "image": "" OR "image base64",
            "discount": "[1,2,3]"
        }
    ]
    ```

**Delete company:**

----
    Delete company data.

*   **URL**

    /company/:id
    
*   **Method:**
    
    `DELETE`
    
*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    {
        "message": "Company is deleted successfully."
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Company not found."
    }
    ```

**Add user image:**
----
    Insert image (if hasn't been already created) to db. Add image data to user.

*   **URL**

    /company/:id/image
    
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
*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Company not found."
    }
    ```

## Country

**Create country**

----
    Returns json data about a single country.
    
* **URL**

    /country

* **Method:**

    `POST`

* **Data params**

    `name=[string]`
        
* **Sample request json:**

    ```json
    {
        "name": "test"
    }
    ```

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 
       
    ```json
    {
        "id": 2,
        "name": "test"
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Country not found."
    }
    ```

**Update country**
----
    Updates country data.
    
* **URL**

    /country/:id

* **Method:**

    `PUT`

* **Data params**

    `name=[string]`


* **Sample request json:**

    ```json
    {
        "name": "test1"
    }
    ```

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 
       
    ```json
    {
        "id": 2,
        "name": "test1"
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Country not found."
    }
    ```
    
**Get one:**
----
    Returns json data about a single country.

* **URL**

    /country/:id
    
* **Method:**

    `GET`

* **Success response:**

    *   **Code** 200 <br/>
        **Content:**

    ```json
    {
        "id": 2,
        "name": "test"
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Company not found."
    }
    ```

**Get all countries:**
----
    Returns json data about all countries.
    
*   **URL**

    /countries
    
*   **Method:**
    
    `GET`

* **Query params**

    `search=[string]`

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    [
        {
            "id": 2,
            "name": "test"
        }
    ]
    ```

**Delete country:**

----
    Delete country data.

*   **URL**

    /country/:id
    
*   **Method:**
    
    `DELETE`
    
*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    {
        "message": "Country is deleted successfully."
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Country not found."
    }
    ```

## City

**Create city**

----
    Returns json data about a single city.
    
* **URL**

    /city

* **Method:**

    `POST`

* **Data params**

    `name=[string]`

    `countryId=[number]`

* **Sample request json:**

    ```json
    {
        "name": "test"
    }
    ```

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 
       
    ```json
    {
        "id": 3,
        "countryId": "test",
        "name": "test"
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "City not found."
    }
    ```

**Update city**
----
    Updates city data.
    
* **URL**

    /city/:id

* **Method:**

    `PUT`

* **Data params**

    `name=[string]`

* **Sample request json:**

    ```json
    {
        "name": "3"
    }
    ```

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 
       
    ```json
    {
        "id": 3,
        "countryId": "test",
        "name": "3"
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "City not found."
    }
    ```
    
**Get one:**
----
    Returns json data about a single city.

* **URL**

    /city/:id
    
* **Method:**

    `GET`

* **Success response:**

    *   **Code** 200 <br/>
        **Content:**

    ```json
    {
        "id": 3,
        "countryId": "test",
        "name": "3"
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "City not found."
    }
    ```

**Get all cities:**
----
    Returns json data about all cities.
    
*   **URL**

    /cities

* **Query params**

    `search=[string]`

*   **Method:**
    
    `GET`

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    [
        {
            "id": 3,
            "countryId": "test",
            "name": "3"
        }
    ]
    ```

**Delete city:**

----
    Delete city data.

*   **URL**

    /city/:id
    
*   **Method:**
    
    `DELETE`
    
*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    {
        "message": "City is deleted successfully."
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "City not found."
    }
    ```

## Discount

**Create Discount**

----
    Returns json data about a single discount.
    
* **URL**

    /discount

* **Method:**

    `POST`

* **Data params**

    `cityId=[number]`

    `name=[string]`

    `site=[string]`

    `description=[string]`
    
    `companyId=[number]`
        
* **Sample request json:**

    ```json
    {
        "cityId": 1,
        "name": "test",
        "site": "test.com",
        "description": "test",
        "companyId": 1
    }
    ```

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 
       
    ```json
    {
        "id": 1,
        "cityId": 1,
        "image": "" OR "image base64",
        "name": "test",
        "description": "test",
        "site": "test.com",
        "companyId": 1
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "..."
    }
    ```

**Update discount**
----
    Updates discount data.
    
* **URL**

    /discount/:id

* **Method:**

    `PUT`

* **Data params**

    `cityId=[number]`

    `name=[string]`

    `site=[string]`

    `description=[string]`
    
    `companyId=[number]`
        
* **Sample request json:**

    ```json
    {
        "cityId": 1,
        "name": "test1",
        "site": "test.com",
        "description": "test",
        "companyId": 1
    }
    ```

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 
       
    ```json
    {
        "id": 1,
        "cityId": 1,
        "image": "" OR "image base64",
        "name": "test1",
        "description": "test",
        "site": "test.com",
        "companyId": 1
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Discount not found."
    }
    ```
    
**Get one:**
----
    Returns json data about a single discount.

* **URL**

    /discount/:id
    
* **Method:**

    `GET`

* **Success response:**

    *   **Code** 200 <br/>
        **Content:**

    ```json
    {
        "id": 1,
        "cityId": 1,
        "image": "" OR "image base64",
        "name": "test1",
        "description": "test",
        "site": "test.com",
        "companyId": 1
    }
    ```
*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Discount not found."
    }
    ```

**Get all discountes:**
----
    Returns json data about all discountes.

*   **URL**

    /discountes
    
*   **Method:**
    
    `GET`

* **Query params**

    `search=[string]`

*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    [
        {
            "id": 1,
            "cityId": 1,
            "image": "" OR "image base64",
            "name": "test1",
            "description": "test",
            "site": "test.com",
            "companyId": 1
        }
    ]
    ```

**Delete discount:**

----
    Delete discount data.

*   **URL**

    /discount/:id
    
*   **Method:**
    
    `DELETE`
    
*   **Success Response:**
    *   **Code:** 200 <br/>
        **Content:** 

    ```json
    {
        "message": "Discount is deleted successfully."
    }
    ```

*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Discount not found."
    }
    ```

**Add user image:**
----
    Insert image (if hasn't been already created) to db. Add image data to discount.

*   **URL**

    /discount/:id/image
    
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
*   **Error Response:**
    *   **Code:** 400 <br/>
        **Content:** 
    
    ```json
    {
        "message": "Discount not found."
    }
    ```