# Address API Spec

## Create Address

Endpoint : POST api/contacts/:idContact/addresses

Request Header :
- X-API-TOKEN : <TOKEN>

Request Body :

```json
{
  "street": "Jalan",
  "city": "Sleman",
  "province": "YK",
  "country": "INA",
  "postal_code": "57563"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Sleman",
    "province": "YK",
    "country": "INA",
    "postal_code": "57563"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "string"
}
```

## Get Address

Endpoint : GET api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : <TOKEN>

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Sleman",
    "province": "YK",
    "country": "INA",
    "postal_code": "57563"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "string"
}
```

# Update Address

Endpoint : PUT api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : <TOKEN>

Request Body :

```json
{
  "street": "Jalan",
  "city": "Sleman",
  "province": "YK",
  "country": "INA",
  "postal_code": "57563"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Sleman",
    "province": "YK",
    "country": "INA",
    "postal_code": "57563"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "string"
}
```

# Remove Address

Endpoint : DELETE api/contacts/:idContact/addresses/:idAddress

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
  "errors": "string"
}
```

## List Address

Endpoint : GET api/contacts/:idContact/addresses

Request Header :
- X-API-TOKEN : <TOKEN>

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan",
      "city": "Sleman",
      "province": "YK",
      "country": "INA",
      "postal_code": "57563"
    },
    {
      "id": 1,
      "street": "Jalan",
      "city": "Sleman",
      "province": "YK",
      "country": "INA",
      "postal_code": "57563"
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "errors": "string"
}
```