//编写自己的框架   wits
(function () {
  const moduleMap = {};
  const fileMap = {};
  const noop = function () {};
  window.wits_jsfrm = {
    define: function (name, dependencies, factory) {
      if (!moduleMap[name]) {
        moduleMap[name] = {
          name: name,
          dependencies: dependencies,
          factory: factory
        };
      }
      return moduleMap[name];
    },
    use: function (name) {
      let module = moduleMap[name];
      if (!module.entity) {
        let args = [];
        for (let i = 0; i < module.dependencies.length; i++) {
          if (moduleMap[module.dependencies[i]].entity) {
            args.push(moduleMap[module.dependencies[i]].entity);
          }
          else {
            args.push(this.use(module.dependencies[i]));
          }
        }

        module.entity = module.factory.apply(noop, args);
      }
      return module.entity;
    },
    require: function (pathArr, callback) {
      for (let i = 0; i < pathArr.length; i++) {
        let path = pathArr[i];
        if (!fileMap[path]) {
          let head = document.getElementsByTagName('head')[0];
          let node = document.createElement('script');
          node.type = 'text/javascript';
          node.async = 'true';
          node.src = path + '.js';
          node.onload = function () {
            fileMap[path] = true;
            head.removeChild(node);
            checkAllFiles();
          };
          head.appendChild(node);
        }
      }
      function checkAllFiles() {
        let allLoaded = true;
        for (let i = 0; i < pathArr.length; i++) {
          if (!fileMap[pathArr[i]]) {
            allLoaded = false;
            break;
          }
        }

        if (allLoaded) {
          callback();
        }
      }
    }
  };
})();

