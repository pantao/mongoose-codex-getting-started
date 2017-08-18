// 加载 Mongoose 模块
import Mongoose from 'mongoose'

// 创建数据库连接
Mongoose.connect('mongodb://localhsot/test')
const connection = Mongoose.connection

// 定义连接错误时的回调
connection.on('error', console.error.bind(console, 'connection error: '))

// 定义连接成功时的回调
connection.once('open', () => {
  // 我们已经连接成功了

  // 定义一个 Cat 模式
  const CatSchema = Mongoose.Schema({
    name: String
  })

  // 在 Mongoose.model 方法调 Schema 之前，定义 speak 方法
  CatSchema.methods.speak = function () {
    const greeting = this.name ? `Meow name is ${this.name}` : 'I don\'t hav a name'
    console.log(greeting)
  }

  // 定义一个 Cat 模型
  const Cat = Mongoose.model('Cat', CatSchema)

  // 创建一个 Cat 实例
  const cat = new Cat({
    name: 'Silence'
  })
  console.log(cat.name)

  cat.save((error, cat) => {
    if (error) {
      return console.error(error)
    }
    cat.speak()
  })

  const fluffy = new Cat({
    name: 'fluffy'
  })
  fluffy.speak(); // Meow name is fluffy
  fluffy.save()

  Cat.find((error, cats) => {
    if (error) {
      return console.log(error)
    }
    console.log(cats)
  })
})