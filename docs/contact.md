# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header :
- X-API-TOKEN : <TOKEN>

Request Body :

```json
{
  "first_name": "Razy",
  "last_name": "Fathan",
  "email": "razy@mail.com",
  "phone": "0882121313"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Razy",
    "last_name": "Fathan",
    "email": "razy@mail.com",
    "phone": "0882121313"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "First name must not blank"
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header :
- X-API-TOKEN : <TOKEN>

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Razy",
    "last_name": "Fathan",
    "email": "razy@mail.com",
    "phone": "0882121313"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "First name must not blank"
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header :
- X-API-TOKEN : <TOKEN>

Request Body :

```json
{
  "first_name": "Razy",
  "last_name": "Fathan",
  "email": "razy@mail.com",
  "phone": "0882121313"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Razy",
    "last_name": "Fathan",
    "email": "razy@mail.com",
    "phone": "0882121313"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "First name must not blank"
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header :
- X-API-TOKEN : <TOKEN>

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter :
- name  : string, contact first name or contact last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page  : number, default = 1
- size  : number, default = 10

Request Header :
- X-API-TOKEN : <TOKEN>

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Razy",
      "last_name": "Fathan",
      "email": "razy@mail.com",
      "phone": "0882121313"
    },
    {
      "id": 2,
      "first_name": "Razy",
      "last_name": "Fathan",
      "email": "razy@mail.com",
      "phone": "0882121313"
    }
  ],
  "paging": {
    "current_page": 1,
    "tatal_page": 10,
    "size": 10
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```