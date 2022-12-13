# Good Night Couch Side Rest Api Docs

[link](#onetest)

## Version: 1.0.0

### /event

#### GET

##### Summary

Get All Events

##### Description

Get All Events

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /genre

#### GET

##### Summary

Get All Genres

##### Description

Get All Genres

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /ping

#### GET

##### Description

Responds pong if the app is up and running

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | Retrun pong |

### Models

#### Artist

| Name  | Type       | Description | Required |
| ----- | ---------- | ----------- | -------- |
| id    | string     |             | No       |
| name  | string     |             | No       |
| genre | [ string ] |             | No       |

**Example**

<pre>{
  "id": "uuid",
  "name": "Artist Name"
}</pre>

#### Event

| Name | Type   | Description | Required |
| ---- | ------ | ----------- | -------- |
| id   | string |             | No       |
| name | string |             | No       |

**Example**

<pre>{
  "id": "uuid",
  "name": "Event Name"
}</pre>

#### Genre

| Name | Type   | Description | Required |
| ---- | ------ | ----------- | -------- |
| id   | string |             | No       |
| name | string |             | No       |

**Example**

<pre>{
  "id": "uuid",
  "name": "Genre Name"
}</pre>

# ONETEST
