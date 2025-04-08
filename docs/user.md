# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "arrazyfathan",
  "password": "Secret",
  "name": "Ar Razy Fathan Rabbani"
}
```

Response Body (Success)

```json
{
  "data": {
    "username": "arrazyfathan",
    "name": "Ar Razy Fathan Rabbani"
  }
}
```

Response Body (Failed) 

```json
{
  "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "arrazyfathan",
  "password": "Secret"
}
```

Response Body (Success)

```json
{
  "data": {
    "username": "arrazyfathan",
    "name": "Ar Razy Fathan Rabbani",
    "token": "<TOKEN>"
  }
}
```

Response Body (Failed)

```json
{
  "errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
- X-API-TOKEN : <TOKEN>

Response Body (Success)

```json
{
  "data": {
    "username": "arrazyfathan",
    "name": "Ar Razy Fathan Rabbani"
  }
}
```

Response Body (Failed)

```json
{
  "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current (optional / partial )

Request Header :
- X-API-TOKEN : <TOKEN>


Request Body :

```json
{
  "password": "Secret",
  "name": "Ar Razy Fathan Rabbani"
}
```

Response Body (Success)

```json
{
  "data": {
    "username": "arrazyfathan",
    "name": "Ar Razy Fathan Rabbani"
  }
}
```

Response Body (Failed)

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout

Endpoint : DELETE /api/users/current

Request Header :
- X-API-TOKEN : <TOKEN>


Request Body :

```json
{
  "data": "Success"
}
```

Response Body (Success)

```json
{
  "data": {
    "username": "arrazyfathan",
    "name": "Ar Razy Fathan Rabbani"
  }
}
```

Response Body (Failed)

```json
{
  "errors": "Unauthorized, ..."
}
```