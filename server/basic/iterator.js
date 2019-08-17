// function makeIterator(arr){ // 生成迭代器
//   let nextIndex = 0;
//   // 返回一个迭代器对象
//   return {
//     next: () => {
//       if(nextIndex < arr.length){
//         return {value: arr[nextIndex++], done: false}
//       } else {
//         return {done: true}
//       }
//     }
//   }
// }

// const it = makeIterator(['吃饭', '睡觉', '打豆豆'])
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().done);

function *makeIterator(arr) {
  console.log('aaa');
  for(var i = 0; i < arr.length; ++i){
    yield arr[i];
  }
}

const gen = makeIterator(['吃饭','睡觉','打豆豆']);
// console.log(gen)
function* helloWorldGenerator(){
  yield "hello";
  yield "word";
  return "helloWorldGenerator";
}
 const hw = helloWorldGenerator();
//  console.log(hw.next());
//  console.log(hw.next());
//  console.log(hw.next());
//  console.log(hw.next());

function* gen1() {
  yield  123 + 456;
}
var testGen = gen1();
console.log(testGen.next())
console.log(testGen.next())

function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);
