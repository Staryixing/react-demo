export default class StaticMethodParent{
  static getCommon(){
    return '父类的静态方法'
  }
}

console.log('父类调用',StaticMethodParent.getCommon())
