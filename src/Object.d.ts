

declare global {
  type Replace<SourType,MatchType,NewType> = SourType extends MatchType ? NewType : SourType;
  type ReplaceUndefined<SourType,NewType> = Replace<SourType,undefined,NewType> ;
  type ReplaceNull<SourType,NewType> = Replace<SourType,null,NewType> ;
  type ReplaceVoid<SourType,NewType> = Replace<SourType,void|undefined|null,NewType> ;


    interface Object {

          /**
   * 找出对象中符合测试函数的属性名
   * @param testFun:(propValue,propkey,index)=> boolean  ; 测试条件函数
   */
        findKey(testFun:(propValue:any,propkey:string,index:number)=> boolean):string;


          /**
   * 找出对象中符合测试函数的属性信息
   * @param testFun:(propValue,propkey,index)=> boolean  ; 测试条件函数
   * @return PropertyInfo : {key:string,value:any}
   */
  findProperty(testFun:(propValue:any,propkey:string,index:number)=> boolean):{key:string,value:any};

    /**
   * 检验该对象自身是否是扁平的，即：该对象的所有的直接属性的属性值都是非对象类型；
   */

  readonly isFlat:boolean;

    /**
   * 返回对象是否是空的对象，即没有自己的可枚举的属性
   */
  readonly noKeys:boolean;


    /**
   * 获取对象中拥有的 相应key的值；
   * @param keys:[string]  指定的key的数组
   * @return [any]    对象中拥有的相应key的值
   */
  getValuesOfKeys(keys:string[]):any[];



  /**
   * 获取对象中拥有的 相应key的 有效值；
   * 注意：不包含值为 undefined 或 null 的值
   * @param keys:[string]  指定的key的数组
   * @return [any]    对象中拥有的相应key的有效值
   *
   */
  getVirtualValuesOfKeys(keys:string[]):NonNullable<any>[];




  /**
   * 查找对象中所有指定的属性中的第一个有效值
   * @param keys : [string]   被查找的属性列表
   * @returns any  对象中所有指定的属性中的第一个有效值
   */
  findValueOfKeys(keys:string[]):NonNullable<any>;



    /**
   * 获取对象中所有指定格式的属性的值列表
   * @param key : string   基本的属性字符串
   * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
   * FormatObject := {separator : string, caseType : L | U | N}
   * @property separator  : string     分隔符
   * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
   * @returns [any]  对象中所有指定格式的属性的值列表
   */
  getValuesForKeyFormats(key:string,formats:FormatOptions[] | FormatOptions):any[];




  /**
   * 获取对象中所有指定格式的属性的有效值列表
   * @param key : string   基本的属性字符串
   * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
   * FormatObject := {separator : string, caseType : L | U | N}
   * @property separator  : string     分隔符
   * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
   * @returns [any]  对象中所有指定格式的属性的值列表
   */
  getVirtualValuesForKeyFormats(key:string,formats:FormatOptions[] | FormatOptions):any[];



  /**
   * 查找对象中所有指定格式的属性的第一个有效值
   * @param key : string   基本的属性字符串
   * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
   * FormatObject := {separator : string, caseType : L | U | N}
   * @property separator  : string     分隔符
   * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
   * @returns any  对象中所有指定格式的属性的第一个有效值
   */
  findValueForKeyFormats(key:string,formats:FormatOptions[] | FormatOptions):any;



  //集合：开始

  /**
   * 判断当前对象是否是指定对象的子集；即当前对象自己的所有可枚举属性 及 值 是否都包含于 指定的对象上；
   * @param universalObj ? : Object   全集对象
   * @param equalTest ? : (a,b)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素a 和 元素b  相同；
   * @returns boolean   当前对象是否是指定对象的子集
   */
  isSubsetOf(universalObj:object,equalTest?:TestFun<any> ):boolean;



  //集合：结束




  /**
   * depthLoopOwnProperty(callback,depth,all,thisValue,initDepth)=> stopInfo
   * 递归遍历自身属性链中的所有属性
   * @param callback : (key,value,obj,currDepth))=> stopInfo : any    必选； 循环遍历的回调函数； key : 当前被遍历的属性名；value : 当前被遍历的属性值；obj : 当前被遍历的属性所属的对象；currDepth : 当前遍历的深度值，从 initDepth 所表示的值开始计数；返回值 stopInfo : 表示是否中止循环，并且该值会被 depthLoopOwnProperty 函数返回，如果返回的值是真值，则终止循环；
   * @param depth ? : number    可选；默认值：-1 ,即无限深度； 要循环遍历的深度；
   * @param all ? : boolean    可选；默认值: false ;  是否遍历自身所有的属性，包括不可枚举的；
   * @param thisValue ? : any    可选；   callback 回调函数的this值 ；默认值：当前被遍历的属性所属的对象；
   * @param initDepth ? : number   可选；默认值：1；深度的初始值； 注意：设计该属性的主要目的是为了递归调用时记录当前传递当前的深度值的；
   * @returns stopInfo ： any   终止循环时返回的信息；
   */
  depthLoopOwnProperty<ThisValue>(callback:(this:ReplaceUndefined<ThisValue,any>,key:string,value:any,obj:object,currDepth:number)=> any,depth?:number,all?:boolean,thisValue?:ThisValue,initDepth?:number):any;





  /**
   * depthLoopPropertyWithPrototype(callback,depth,thisValue,initDepth)=> stopInfo
   * 递归遍历自身包括原型的属性链中的所有可枚举的属性
   * @param callback : (key,value,obj,currDepth))=>stopInfo : any    必选； 循环遍历的回调函数； key : 当前被遍历的属性名；value : 当前被遍历的属性值；obj : 当前被遍历的属性所属的对象；currDepth : 当前遍历的深度值，从 initDepth 所表示的值开始计数；返回值 stopInfo : 表示是否中止循环，并且该值会被 depthLoopOwnProperty 函数返回，如果返回的值是真值，则终止循环；
   * @param depth ? : number    可选；默认值：-1 ,即无限深度； 要循环遍历的深度；
   * @param thisValue ? : any    可选；   callback 回调函数的this值 ；默认值：当前被遍历的属性所属的对象；
   * @param initDepth ? : number   可选；默认值：1；深度的初始值； 注意：设计该属性的主要目的是为了递归调用时记录当前传递当前的深度值的；
   * @returns stopInfo ： any   终止循环时返回的信息；
   */
  depthLoopPropertyWithPrototype<ThisValue>(callback:(this:ReplaceUndefined<ThisValue,any>,key:string,value:any,obj:object,currDepth:number)=> any,depth?:number,thisValue?:ThisValue,initDepth?:number):any;



    }

}




export {}