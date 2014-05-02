module.exports = function(dfn, par){  
  //var ctor = function(){};
  var child = dfn.initialize || function(){};
  for(var d in dfn){
    if(dfn.hasOwnProperty(d) && d != 'initialize'){      
      child.prototype[d] = dfn[d];
    }
  }
  return child;
};
