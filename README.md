# NewsApp Server

Base URL: localhost:3000

NewsApp is an application to manage news. This app has: 
* RESTful endpoint for news' CRUD operation
* JSON formatted response

## RESTful endpoints
&nbsp;

### POST /register

> Create new user with its role as admin

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email>",
  "password": "<password>",
  "phoneNumber": "<phone_number>",
  "address": "<address>"
}
```
_Response (201 - Created)_
```
{
  "id": "<id>"
  "email": "<email>
}
```

_Response (400 - Validation Error)_
```
{
    "message": [
        "email is required",
        "email is in incorrect format",
        "password is required",
    ]
}
```

_Response (400 - Unique Constraint Error)_
```
{
    "message": "this email is already used by another user"
}
```
----

### POST /login

> Authenticate user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email>",
  "password": "<password>"
}
```

_Response (200 - Logged in)_
```
{
    "access_token": "<access_token>"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "invalid email or password"
}
```

----

### POST /news

> Create new news

_Request Header_
```
{
    "access_token": "<access_token>"
}
```

_Request Body_
```
{
  "title": "<title_name>",
  "content": "<content>",
  "imgUrl": "<image_url>",
  "AuthorId": "<author_id>",
  "Category": "<category_id>"
}
```

_Response (201 - Created)_
```
{
    "news": {
        "id": 6,
        "title": "this is title 3",
        "content": "this is content 3",
        "imgUrl": "https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2016/09/28/160928191155_pepe_the_frog_549x549_pepethefrog_nocredit.jpg",
        "AuthorId": 7,
        "CategoryId": 1,
        "updatedAt": "2021-06-07T16:01:12.031Z",
        "createdAt": "2021-06-07T16:01:12.031Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
    "message": [
        "title is required",
        "content is required"
    ]
}
```
----

### GET /news
> Fetch all news

_Request Header_
```
{
    "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 4,
        "title": "this is title 1",
        "content": "this is content 1",
        "imgUrl": "https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2016/09/28/160928191155_pepe_the_frog_549x549_pepethefrog_nocredit.jpg",
        "AuthorId": 7,
        "CategoryId": 1,
        "createdAt": "2021-06-07T16:00:58.909Z",
        "updatedAt": "2021-06-07T16:00:58.909Z"
    },
    {
        "id": 5,
        "title": "this is title 2",
        "content": "this is content 2",
        "imgUrl": "https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2016/09/28/160928191155_pepe_the_frog_549x549_pepethefrog_nocredit.jpg",
        "AuthorId": 7,
        "CategoryId": 1,
        "createdAt": "2021-06-07T16:01:07.542Z",
        "updatedAt": "2021-06-07T16:01:07.542Z"
    }
]
```
----

### GET /news/:id

> Fetch specified news 

_Request Header_
```
{
    "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
{
    "id" : "<id>"
}
```

_Response (200)_
```
{
    "news": {
        "id": 4,
        "title": "this is title 1",
        "content": "this is content 1",
        "imgUrl": "https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2016/09/28/160928191155_pepe_the_frog_549x549_pepethefrog_nocredit.jpg",
        "AuthorId": 7,
        "CategoryId": 1,
        "createdAt": "2021-06-07T16:00:58.909Z",
        "updatedAt": "2021-06-07T16:00:58.909Z"
    }
}
```

_Response (404 - not found)_
```
{
    "message": "news with with such id not found"
}
```
----

### PUT /news/:id

> Update specified news

_Request Header_
```
{
    "access_token": "<access_token>"
}
```

_Request Body_
```
{
  "title": "<title_name>",
  "content": "<content>",
  "imgUrl": "<image_url>",
  "AuthorId": "<author_id>",
  "Category": "<category_id>"
}
```

_Request Params_
```
{
    "id" : "<id>"
}
```

_Response (200)_
```
{
    "newData": {
        "title": "this is edited title",
        "content": "this is edited content",
        "imgUrl": "https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2016/09/28/160928191155_pepe_the_frog_549x549_pepethefrog_nocredit.jpg",
        "AuthorId": "7",
        "CategoryId": "1"
    }
}
```

_Response (404 - Not Found)_
```
{
    "message": "cannot update non-existing news"
}
```

_Response (400 - Bad Request)
```
{
    "message": [
        "title is required",
        "content is required"
    ]
}
```
----

### DELETE /news/:id

> Delete specified news

_Request Header_
```
{
    "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
{
    "id" : "<id>"
}
```

_Response (200)_
```
{
    "message": "selected news has been successfully deleted"
}
```

_Response (404 - Not Found)_
```
{
    "message": "cannot delete non-existing news"
}
```
----