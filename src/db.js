const { remote } = window.require('electron')
/** 
 *  官网给出的引用electron的方式为 `require('electron')`
 *  在实际开发过程中会报错 `fs.existsSync is not a function`
 *  原因是因为webpack默认产出目标是web平台的js，其混淆了nodejs的标准模块系统，导致引入nodejs的模块时出现问题
 *  解决办法是通过使用window.require代替require来引入electron，前者不会被webpack编译，在渲染进程require关键字就是表示node模块的系统
 */


/**
 * 顺便说一下关于DB的处理
 * 因为DB需要本地可持久化存储且在renderer create前读取DB数据的这样一个需求
 * 所以DB必须在主线程进行创建
 * 从renderer线程读取main中的数据成了一个小难题
 * 试过挺多方法但还是不断报错
 * 最后决定使用Electron 内的 IPC 机制
 * 将数据存在main的某个全局变量中，然后在renderer中使用 remote 模块来访问
 * 所以DB create在electron也就是main里
 * 该文件的DB只做连接用而非实例化数据库
 */
const db = remote.getGlobal('db')
export default db