define({ "api": [
  {
    "type": "get",
    "url": "/user/users/:id",
    "title": "Get user by id",
    "name": "GetUser",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Authentication Token</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-xsrf",
            "description": "<p>xsrf token</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "firstName",
            "description": "<p>User's First Name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "lastName",
            "description": "<p>User's First Name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "state",
            "description": "<p>User's State</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>User's City</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "pa",
            "description": "<p>User's pa</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "proxy/UserProxy.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/user/users",
    "title": "Get users",
    "name": "GetUsers",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Authentication Token</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-xsrf",
            "description": "<p>xsrf token</p> "
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "q",
            "description": "<p>Optional query string</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "allowedValues": [
              "firstName",
              "lastName",
              "state",
              "city",
              "pa"
            ],
            "optional": true,
            "field": "sort",
            "defaultValue": "lastName,firstName",
            "description": "<p>comma separated list of sort order with signs</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "25",
            "description": "<p>Maximum number of elements to return</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "before",
            "description": "<p>Return elements before this cursor given the provided sort</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "after",
            "description": "<p>Return elements after this cursor given the given sort</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "since",
            "description": "<p>Return elements updated after the cursor</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "until",
            "description": "<p>Return elements updated before the cursor</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Object[]</p> ",
            "optional": false,
            "field": "users",
            "description": "<p>List of Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "users.firstName",
            "description": "<p>User's First Name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "users.lastName",
            "description": "<p>User's First Name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "users.state",
            "description": "<p>User's State</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "users.city",
            "description": "<p>User's City</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "users.pa",
            "description": "<p>User's pa</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "proxy/UserProxy.js",
    "groupTitle": "Users"
  }
] });