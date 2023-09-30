## Configuration

- `LD_LIBRARY_PATH` should be set to vercel environment variables to avoid crash issues of library related to canvas

```javascript
LD_LIBRARY_PATH=/vercel/path0/node_modules/canvas/build/Release:/var/task/node_modules/canvas/build/Release
```
