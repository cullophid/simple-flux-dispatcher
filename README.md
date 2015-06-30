#simple-flux-dispatcher

simple dispatcher for flux.
Works like described in the flux documentation, but simpler, and with easy to understand error messages

##install

  ```
  npm install --save-dev simple-flux-dispatcher
  ```

## usage

```js

  var simpleDispatcher = require('simple-flux-dispatcher');
  var dispatcher = simpleDispatcher();


  var token = dispatcher.register(function);
  dispatcher.unregister(function);
  dispatcher.dispatch(action);
  dispatcher.waitfor(token);
```
