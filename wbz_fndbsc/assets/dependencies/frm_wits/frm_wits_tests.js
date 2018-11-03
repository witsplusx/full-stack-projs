//验证测试
wits_jsfrm.define("constant.PI", [], function(){
  return 3.14159;
});
wits_jsfrm.define("shape.Circle", ["constant.PI"], function(pi){
  let Circle = function(r){
    this.r=r;
  };
  Circle.prototype = {
    area: function() {
      return pi*this.r*this.r;
    }
  };
  return Circle;
});
wits_jsfrm.define("shape.Rectangle", [], function(){
  let Rectangle = function(l, w) {
    this.l = l;
    this.w = w;
  };
  Rectangle.prototype = {
    area:function(){
      return this.l*this.w;
    }
  };
  return Rectangle;
});
wits_jsfrm.define("ShapeTypes", ["shape.Circle","shape.Rectangle"],
  function(Circle, Rectangle) {
    return {
      CIRCLE:Circle,
      RECTANGLE:Rectangle
    };
  });
wits_jsfrm.define("ShapeFactory", ["ShapeTypes"], function(ShapeTypes){
  return {
    getShape: function(type) {
      let shape;
      switch(type) {
        case "CIRCLE": {
          shape = new ShapeTypes[type](arguments[1]);
          break;
        }
        case "RECTANGLE": {
          shape = new ShapeTypes[type](arguments[1],arguments[2]);
          break;
        }
      }
      return shape;
    }
  };
});

let ShapeFactory = wits_jsfrm.use("ShapeFactory");
alert('ShapeFactory.getShape("CIRCLE", 5).area()===' + ShapeFactory.getShape("CIRCLE", 5).area());
alert('ShapeFactory.getShape("RECTANGLE", 3, 4).area()===' + ShapeFactory.getShape("RECTANGLE", 3, 4).area());
