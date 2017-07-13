# micro-json-errors

Micro middleware that converts errors to JSON.

```
const jsonErrors = require("micro-json-errors")(process.env.NODE_ENV === "dev");

module.exports = jsonErrors((req,res) => throw new Error("Oh No!"));
```
