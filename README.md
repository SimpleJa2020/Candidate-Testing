- Register
Request:
  POST /auth/register
  BODY email, password, confirmPassword
Response:
  201 message: register success.  please log in to continue
  400 message: invalid email or password
  500 message: server error
  

- Login
Request:
  POST /auth/login
  BODY email, password
Response:
  200 accessToken: ""
  400 message: invalid email or password
  500 message: server error


- Create category
Request:
  POST /category
  BODY name, type
Response:
  201 category: {}
  400 message: ""
  500 message: ""


- Update category
Request:
  PUT /category/:categoryId
  BODY name, type
Response:
  200 category: {}
  400 message: ""
  500 message: ""


- Delete category
Request:
  DELETE /category/:categoryId
  
Response:
  204 No Content
  400 message: ""
  500 message: ""
  

- Get all category
Request:
  GET /category
 
Response:
  201 category: []
  500 message: ""
  

- Get category by id
Request:
  GET /category/:categoryId
 
Response:
  200 category: {}
  500 message: ""
  

- Create transaction
Request:
  POST /transaction/:categoryId
  BODY payee, amount, date, image, note, categoryId
Response:
  201 transactions: {}
  400 message: ""
  500 message: ""

  

- Update transaction
Request:
  PUT /transaction/:transactionId
  BODY payee, amount, date, image, note
Response:
  200 transaction: {}
  400 message: ""
  500 message: ""
*** ยังไม่สามารถเข้าไปแก้ไข category ได้ ***
  

- Delete transaction
Request:
  DELETE /transaction/:transactionId

Response:
  204 No Content
  400 message: ""
  500 message: ""
  

- Get all transaction
Request:
  GET /transaction
 
Response:
  201 transactions: []
  500 message: ""
*** ยังไม่สามารถ filter ข้อมูลได้ ***
  

- Get transaction by id
Request:
  GET /transaction/:transactionId
 
Response:
  200 transaction: {}
  500 message: ""
  
