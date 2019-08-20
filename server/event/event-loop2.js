// 增加readfile
const {readFile, readFileSync} = require("fs");
setImmediate(()=> console.log("[阶段3.immediate] immediate 回调1"))
setImmediate(()=> console.log("[阶段3.immediate] immediate 回调2"))
setImmediate(()=> console.log("[阶段3.immediate] immediate 回调3"))

Promise.resolve().then(()=>{
  console.log("[...待切入下一阶段] promise 回调1")
  setImmediate(()=> console.log("[阶段3.immediate] promise 回调1 immediate 回调4"))
});


readFile('../package.json', 'utf8', ()=>{
  console.log("[阶段2...IO操作] 读文件回调1")

  readFile('./video.mp4', 'utf-8', ()=>{
    console.log("[阶段2...IO操作] 读文件回调2")
    setImmediate(()=> console.log("[阶段3.immediate] 读文件回调2 immediate 回调6"))
  });
  setImmediate(()=> {
    console.log("[阶段3.immediate] 读文件回调1 immediate 回调5");
    Promise.resolve().then(()=>{
      console.log("[...待切入下一阶段] 读文件回调1 immediate 回调5 promise 回调2")
      process.nextTick(()=>{
        console.log("[...待切入下一阶段]读文件回调1 immediate 回调5 nextTick 回调6")
      })
    }).then(()=>{
      console.log("[...待切入下一阶段] 读文件回调1 immediate 回调5 promise 回调3")
    });
  })
  setImmediate(()=> {
    console.log("[阶段3.immediate] 读文件回调1 immediate 回调6");
    Promise.resolve().then(()=>{
      console.log("[...待切入下一阶段] 读文件回调1 immediate 回调6 promise 回调4")
      process.nextTick(()=>{
        console.log("[...待切入下一阶段]读文件回调1 immediate 回调6 nextTick 回调7")
      })
    }).then(()=>{
      console.log("[...待切入下一阶段] 读文件回调1 immediate 回调6 promise 回调5")
    });
  })
  setImmediate(()=> {
    console.log("[阶段3.immediate] 读文件回调1 immediate 回调7");
    Promise.resolve().then(()=>{
      console.log("[...待切入下一阶段] 读文件回调1 immediate 回调7 promise 回调4")
      process.nextTick(()=>{
        console.log("[...待切入下一阶段]读文件回调1 immediate 回调7 nextTick 回调7")
      })
    }).then(()=>{
      console.log("[...待切入下一阶段] 读文件回调1 immediate 回调7 promise 回调5")
    });
  })
})

setTimeout(()=> console.log("[阶段1...定时器] 定时器 回调1"), 0)
setTimeout(()=> {
  console.log("[阶段1...定时器] 定时器 回调2")
  process.nextTick(()=>{
    console.log("[...待切入下一阶段] 定时器 回调2 nextTick 回调5")
  })
}, 0)
setTimeout(()=> console.log("[阶段1...定时器] 定时器 回调3"), 0)
setTimeout(()=> console.log("[阶段1...定时器] 定时器 回调4"), 0)

process.nextTick(()=>{
  console.log("[...待切入下一阶段] nextTick 回调1")
})
process.nextTick(()=>{
  console.log("[...待切入下一阶段] nextTick 回调2")
  process.nextTick(()=>{
    console.log("[...待切入下一阶段] nextTick 回调4")
  })
})
process.nextTick(()=>{
  console.log("[...待切入下一阶段] nextTick 回调3")
})


