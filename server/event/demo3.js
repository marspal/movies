// However, if you move the two calls within an I/O cycle, the immediate callback is always executed first:
const fs = require('fs');

fs.readFile("../package.json", () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});

let bar;

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback) { callback(); }

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {
  // since someAsyncApiCall has completed, bar hasn't been assigned any value
  setTimeout(()=>{
    console.log('bar', bar); // undefined
  },0)
});

bar = 1;

let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
  // callback()
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;