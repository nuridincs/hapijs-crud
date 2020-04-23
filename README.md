# Hapijs CRUD#

### Setup ###

```bash
$ npm install
$ npm start
```

# Usage #

### Detail Product ###
* url - http://localhost:8000/detailProduct/{id}
* method - get

### Update ###
* url - http://localhost:8000/update/{id}
* method - patch or put
* Body
```js
{
    "product_name": "baju desawa",
    "description": "baju dewasa muslim lucu",
    "price": "500000"
}
```

### Delete ###
* url - http://localhost:8000/delete/{id}
* method - delete