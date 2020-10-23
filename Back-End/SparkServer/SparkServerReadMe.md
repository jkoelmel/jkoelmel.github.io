##Backend

Run Server to get started. In a browser, go to http://localhost:8080/api/database/version to test the connection. If you see "MySQL Version 8.0.20" then success!

To see an example user payload, query http://localhost:8080/api/example/user

---
####PT
To add a PT to the database, the api endpoint to use is `/api/pt/register` with the query parameters `email, f_name, l_name, company`.
To retrieve all users who are PT's, use the endpoint `/api/pt/all`.

---
####Patient
To add a Patient to the database, the api endpoint to use is `/api/patient/register` with the query parameters `email, f_name, l_name, company`. Patients can be updated to add a PT link by using `api/patient/update-pt` with query parameters `patient_id, pt, prospective_pt`.