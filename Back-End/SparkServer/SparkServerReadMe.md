##Backend

Run Server to get started. In a browser, go to http://localhost:8080/api/database/version to test the connection. If you see "MySQL Version 8.0.20" then success!

To see an example user payload, query http://localhost:8080/api/example/user

---

####PT
To add a PT to the database, the api endpoint to use is `/api/pt/register` with the query parameters `email, f_name, l_name, company`. This should be a POST request.

To retrieve all users who are PT's, use the endpoint `/api/pt/all`. This should be a GET request.

#####Sample JSON data
```
[
    {
        "pt_id": 2,
        "user": 12,
        "user_id": 12,
        "email": "bruce.lee@gmail.com",
        "f_name": "bruce",
        "l_name": "lee",
        "company": "awesome fighters inc"
    }
]
```

---

####Patient
To add a Patient to the database, the api endpoint to use is `/api/patient/register` with the query parameters `email, f_name, l_name, company`. This should be a POST request.

Patients can be updated to add a PT link by using `api/patient/update-pt` with query parameters `patient_id, pt, prospective_pt`. This should be a PUT request.

Patients can be retrieved by calling a GET request on `api/patient/all` for all patients, or `api/patient/id` with the query parameter `patient_id` for a specific one.

#####Sample JSON data
```
[
   {
       "patient_id": 1,
       "user": 14,
       "pt": 2,
       "prospective_pt": 2,
       "user_id": 14,
       "email": "test@mail.com",
       "f_name": "jane",
       "l_name": "doe",
       "company": "the NY co"
   }
]
```
