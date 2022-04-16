# REST API example application for Unistory

## Get all users
`GET /users`
#### Response example
```json
[
    {
        "id": 1,
        "firstName": "Nikita",
        "secondName": "Razhev",
        "hasSubscriprion": false
    },
    {
        "id": 2,
        "firstName": "Roman",
        "secondName": "Razhev",
        "hasSubscriprion": true
    }
]
```
## Get exact user
`GET /users/:id`
#### Response example
```json
{
    "id": 1,
    "firstName": "Nikita",
    "secondName": "Razhev",
    "hasSubscriprion": true,
    "books": [
        {
            "id": 1,
            "name": "Crime and punishment",
            "author": "Fedor Dostoevsky"
        }
    ]
}
```

## Create a user
`POST /users`

#### Request example
```json
{
  "firstName": "Nikita",
  "secondName": "Razhev"
}
```
#### Response example
```json
{
  "id": 1,
  "firstName": "Nikita",
  "secondName": "Razhev"
}
```

## Update user's data
`PATCH /users/:id`

#### Request example
```json
{
  "secondName": "Nerazhev"
}
```
## Delete a user
`DELETE /users/:id`

## Check whether the user has a subscription
`GET /users/:id/subscription`
#### Response example
```
Nikita Razhev has a subscription
```

## Give a subscription to the user
`PATCH /users/:id/subscription`

## Give or remove the book 
`PATCH /users/:id/books/:bookId?manage=[give or remove]`
#### Example path
`/users/1/books/7?manage=give`
#### Response example
```
Nikita Razhev can't have more than 5 books
```

## Create a book
`POST /books`

#### Request example
```json
{
  "name": "Crime and punishment",
  "author": "Fyodor Dostaevski"
}
```
#### Response example
```json
{
  "name": "Crime and punishment",
  "author": "Fyodor Dostaevski",
  "id": 6
}
```