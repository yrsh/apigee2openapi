# apigee2openapi
Apigee Edge Proxy to OpenAPI 2.0 (formerly known as Swagger) conversion tool. This project used to be called `apigee2swagger` prior to the specification becoming part of the [OpenAPI Initiative](https://openapis.org).

# Sample usage
```
node gen.js -n Swagger-Petstore -d /home/user/api_folder/ -e http://asdf.com
```
- -n api name
- -d directory with api, containing unzipped **apiproxy** folder
- -e endpoint url
