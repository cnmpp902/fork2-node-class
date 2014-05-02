module.exports = function(dfn, parent){  
  var key,
      ctor = function(){},
      child = dfn.initialize || function(){};
 
  parent = parent||Object;  
  /*
  for (key in parent) { 
    if (parent.hasOwnProperty(key)) child[key] = parent[key];
  }  
  */
  //因为在 new 时，js 内部会为对象创建一个属于自己的prototype，
  //所以引入 ctor 是为了不让 child.prototype 和 parent.prototype 指向同一个目标，
  //防止修改 child 的方法而导致 parent 方法变化的情况发生。
  ctor.prototype = parent.prototype; 
  child.prototype = new ctor();
  //ctor.constructor = child;
  // 为了让 instance 的 constructor 也是 child
  child.prototype.constructor = child;

  for(key in dfn){
    if(dfn.hasOwnProperty(key) && key != 'initialize'){      
      child.prototype[key] = dfn[key];
    }
  }

  child.__super__ = parent;

  var current_class = child;
  child.prototype.super = function(){
    var fun = arguments[0],
	args = Array.prototype.slice.call(arguments,1),
	res;            
    if(current_class.__super__.prototype[fun] !== undefined){
      current_class = current_class.__super__;
      res = current_class.prototype[fun].apply(this,args); 
      current_class = child;
      return res;
    }
    else{
      return undefined;
    }
  };

  return child;
};
