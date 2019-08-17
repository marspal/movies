const co = require("co");
const fetch = require("node-fetch");

// co(function* (){
//     const result = yield fetch("https://api.douban.com/v2/movie/4864908")
//     const movie  = yield result.json()
//     const summary = movie.summary;
//     console.log(summary)
// });

function run(generator){
    const iterator = generator();
    const it = iterator.next();
    const promise = it.value;

    promise.then((data) => {
        const it2 = iterator.next(data);
        const promise2 = it2.value;
        promise2.then(data2 => {
            iterator.next(data2)
        })
    })
}

run(function* (){
    const result = yield fetch("https://api.douban.com/v2/movie/4864908")
    const movie  = yield result.json()
    const summary = movie.summary;
    console.log(summary)
});