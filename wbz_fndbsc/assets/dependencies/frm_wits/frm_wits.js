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
//3dgis封装
wits_jsfrm.define('wits_3dgis', [], () => {
  let bscinfo = {
    author: 'witshine',
    description:　'',
    version: '0.1.0'
  };
  let opts = {};
  let providerViewModels = [];

  //初始化初始图层
  function initProvViewMdls() {
    //ArcGisMapServerImageryProvider
    let esriMap = new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
      enablePickFeatures: false
    });
    //createOpenStreetMapImageryProvider
    let osmMap = Cesium.createOpenStreetMapImageryProvider({
      url: 'https://a.tile.openstreetmap.org/'
    });
    //MapboxImageryProvider  提供了mapbox.satellite、mapbox.streets、mapbox.streets-basic 三种风格 basic不行
    let mboxMap = new Cesium.MapboxImageryProvider({
      mapId: 'mapbox.satellite'
    });

    //WebMapTileServiceImageryProvider--天地图
    let tdtMap = new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t0.tianditu.com/img_w/wmts?',
      layer: 'img',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'w',
      credit: new Cesium.Credit('天地图全球影像服务'),
      maximumLevel: 18
    });
    //天地图注记
    let tdtVectormap = new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t0.tianditu.com/cia_w/wmts?services=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg',
      layer: 'tiandituImgMarker',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'tiandituImgMarker',
      show: true,
      maximumLevel: 18 //不能超过18
    });

    //全球12级
    let globeLocalmap = Cesium.createTileMapServiceImageryProvider({
      url: '/gisdatas/imagery/globe/tiles'
    });

    //--------------------------------设置ProviderViewModel-----------------------
    let tdtMapModel = new Cesium.ProviderViewModel({
      name: '天地图影像',//tdt Maps
      iconUrl: '/gisdatas/images/tdt.jpg',//Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/tdt.jpg'),
      tooltip: '天地图 地图服务\nhttp://t0.tianditu.com/img_w/wmts',
      creationFunction: function () {
        return tdtMap;
      }
    });
    providerViewModels.push(tdtMapModel);


    let globeLocalMapModel = new Cesium.ProviderViewModel({
      name: '本地影像',//globelocal Maps
      iconUrl: '/gisdatas/images/tdt.jpg',// Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/tdt.jpg'),
      tooltip: '本地全球 地图服务',
      creationFunction: function () {
        return globeLocalmap;
      }
    });
    providerViewModels.push(globeLocalMapModel);


    let tdtvMapModel = new Cesium.ProviderViewModel({
      name: '天地图注记',//tdtv Maps
      iconUrl: '/gisdatas/images/tdt.jpg',//Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/tdt.jpg'),
      tooltip: '天地图注记 地图服务\nhttp://t0.tianditu.com/img_w/wmts',
      creationFunction: function () {
        return tdtVectormap;
      }
    });
    providerViewModels.push(tdtvMapModel);



    let esriMapModel = new Cesium.ProviderViewModel({
      name: 'esri Maps',
      iconUrl: Cesium.buildModuleUrl('/dependencies/cesium/Widgets/Images/ImageryProviders/esriWorldImagery.png'),
      tooltip: 'ArcGIS 地图服务 \nhttps://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
      creationFunction: function () {
        return esriMap;
      }
    });
    providerViewModels.push(esriMapModel);

    let osmMapModel = new Cesium.ProviderViewModel({
      name: 'osm Maps',
      iconUrl: Cesium.buildModuleUrl('/dependencies/cesium/Widgets/Images/ImageryProviders/openStreetMap.png'),
      tooltip: 'openstreetmap 地图服务 \nhttps://a.tile.openstreetmap.org/',
      creationFunction: function () {
        return osmMap;
      }
    });
    providerViewModels.push(osmMapModel);

    let mboxMapModel = new Cesium.ProviderViewModel({
      name: 'mapbox Maps',
      iconUrl: Cesium.buildModuleUrl('/dependencies/cesium/Widgets/Images/ImageryProviders/mapboxSatellite.png'),
      tooltip: 'mapbox 地图服务',
      creationFunction: function () {
        return mboxMap;
      }
    });
    providerViewModels.push(mboxMapModel);



    /*let tdtvMapModel = new Cesium.ProviderViewModel({
      name: '天地图注记',//tdtv Maps
      iconUrl: "/gisdatas/images/tdt.jpg",//Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/tdt.jpg'),
      tooltip: '天地图注记 地图服务\nhttp://t0.tianditu.com/img_w/wmts',
      creationFunction: function () {
        return tdtVectormap;
      }
    });
    providerViewModels.push(tdtvMapModel);*/


  }

  function regMouseFun(viewer) {

    //取消双击事件
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    let scene = viewer.scene;
    let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    let ellipsoid = scene.globe.ellipsoid; //得到当前三维场景的椭球体
    let longitudeString = null;
    let latitudeString = null;
    let height = null;
    let cartesian = null;
    let mouse_state = document.getElementById('mouse_state');//显示状态信息
    //一 鼠标MOUSE_MOVE
    handler.setInputAction((movement) => {
      //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
      cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
      if (cartesian) {
        //将笛卡尔坐标转换为地理坐标
        let cartographic = ellipsoid.cartesianToCartographic(cartesian);
        //将弧度转为度的十进制度表示
        longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
        latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
        //获取相机高度
        height = Math.ceil(viewer.camera.positionCartographic.height).toFixed(3);
        mouse_state.innerText = '移动：(' + longitudeString + ', ' + latitudeString + ',' + height + ')';
      }else {
        mouse_state.innerText = '';
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    //二 LEFT_CLICK
    handler.setInputAction((movement) => {
      cartesian =   viewer.camera.pickEllipsoid(movement.position, ellipsoid);//movement.endPosition
      if (cartesian) {
        //将笛卡尔坐标转换为地理坐标
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
        latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
        //获取相机高度
        height = Math.ceil(viewer.camera.positionCartographic.height);
        mouse_state.innerText = 'LEFT_CLICK：(' + longitudeString + ', ' + latitudeString + ',' + height + ')';
      }else {
        mouse_state.innerText = '';
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //三 LEFT_DOUBLE_CLICK
    handler.setInputAction((movement) => {
      cartesian =   viewer.camera.pickEllipsoid(movement.position, ellipsoid);//movement.endPosition
      if (cartesian) {
        //将笛卡尔坐标转换为地理坐标
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
        latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
        //获取相机高度
        height = Math.ceil(viewer.camera.positionCartographic.height);
        mouse_state.innerText = 'LEFT_DOUBLE_CLICK：(' + longitudeString + ', ' + latitudeString + ',' + height + ')';
      }else {
        mouse_state.innerText = '';
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    //四 LEFT_DOWN
    handler.setInputAction((movement) => {
      cartesian =   viewer.camera.pickEllipsoid(movement.position, ellipsoid);//movement.endPosition
      if (cartesian) {
        //将笛卡尔坐标转换为地理坐标
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
        latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
        //获取相机高度
        height = Math.ceil(viewer.camera.positionCartographic.height);
        mouse_state.innerText = 'LEFT_DOWN ：(' + longitudeString + ', ' + latitudeString + ',' + height + ')';
      }else {
        mouse_state.innerText = '';
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    //五 LEFT_UP
    handler.setInputAction((movement) => {
      cartesian =   viewer.camera.pickEllipsoid(movement.position, ellipsoid);//movement.endPosition
      if (cartesian) {
        //将笛卡尔坐标转换为地理坐标
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
        latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
        //获取相机高度
        height = Math.ceil(viewer.camera.positionCartographic.height);
        mouse_state.innerText = 'LEFT_UP ：(' + longitudeString + ', ' + latitudeString + ',' + height + ')';
      }else {
        mouse_state.innerText = '';
      }
    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    //六 鼠标WHEEL
    handler.setInputAction((wheelment) => {
      height = Math.ceil(viewer.camera.positionCartographic.height);
      mouse_state.innerText = '远近(' + ',' + height + ')';// longitudeString + ', ' + latitudeString +
    }, Cesium.ScreenSpaceEventType.WHEEL);

  }

  function sample(opts) {
    initProvViewMdls();
    const equips = opts.equipmts;

    const globemap =  Cesium.createTileMapServiceImageryProvider({
      url: '/gisdatas/imagery/globe/tiles'
    });
    const bscmap = new Cesium.WebMapServiceImageryProvider({
      url: 'http://10.5.4.145:8080/geoserver/wms',
      layers: 'cite:GOOGLE_YX_GLOBE',
      parameters: {
        service: 'WMS',
        format: 'image/png',
        transparent: true
      }
    });

    const viewer = new Cesium.Viewer('cesiumContainer', {
      // imageryProvider: globemap,
      imageryProviderViewModels: providerViewModels,//自定义扩展
      baseLayerPicker: true,    //是否显示图层选择控件
      animation: false,         //是否显示动画控件
      timeline: false,          //是否显示时间线控件
      sceneModePicker: true,    //是否显示投影方式控件
      geocoder: true,           //是否显示地名查找控件
      fullscreenButton: false,  //是否展示全屏
      creditContainer: 'creditContainer',
      TerrainProvider: null,
      selectionIndicator: true,
      infoBox: true,  //是否显示点击要素之后显示的信息
      navigationHelpButton: false, //是否显示帮助信息控件



      contextOptions: {
        webgl: {
          alpha: true
        }
      },
    });


    /*let hfbsc = new Cesium.ArcGisMapServerImageryProvider({
      // url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
      // url : '//10.5.4.145:8000/arcgis/rest/services/anhui_yx_1/MapServer',
      // url : '//10.5.4.140:6080/arcgis/rest/services/anhui_yx_1/MapServer',    //影像图
      url : '//10.5.4.140:6080/arcgis/rest/services/HF0110ok/MapServer',    //矢量图
      maximumLevel: 18,
      // url : '//10.5.4.140:6080/arcgis/rest/services/hefei_yx_1/MapServer',
      proxy : new Cesium.DefaultProxy('/proxy/')
    });
    viewer.imageryLayers.addImageryProvider(hfbsc);


    let hfyxProvider = new Cesium.ArcGisMapServerImageryProvider({
      // url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
      // url : '//10.5.4.145:8000/arcgis/rest/services/anhui_yx_1/MapServer',
      // url : '//10.5.4.140:6080/arcgis/rest/services/anhui_yx_1/MapServer',    //影像图
      url : '//10.5.4.140:6080/arcgis/rest/services/ranqiline_3/MapServer',    //矢量图
      maximumLevel: 18,
      // url : '//10.5.4.140:6080/arcgis/rest/services/hefei_yx_1/MapServer',
      proxy : new Cesium.DefaultProxy('/proxy/')
    });
    viewer.imageryLayers.addImageryProvider(hfyxProvider);*/

    //开启 CesiumInspector 控件
    viewer.extend(Cesium.viewerCesiumInspectorMixin);

    viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT;
    viewer.scene.globe.baseColor = Cesium.Color.TRANSPARENT;

    //设置homebutton的位置
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE =
      Cesium.Rectangle.fromDegrees(117.08, 31.74, 117.49, 31.96); //Rectangle(west, south, east, north)

    //设置初始位置
    /*viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(110.20, 34.55, 3000000)
    });*/
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(117.261, 31.764, 2839),
      duration: 8
    });

    viewer.scene.globe.enableLighting = true;
    viewer.camera.rotateLeft(Cesium.Math.toDegrees(0.005).toFixed(2));
    viewer._cesiumWidget._creditContainer.style.display = 'none';

    regMouseFun(viewer);


    /*viewer.entities.add({
      position : Cesium.Cartesian3.fromDegrees(117.267, 31.765),
      point : {
        show : true, // default
        color : Cesium.Color.SKYBLUE, // default: WHITE
        pixelSize : 10, // default: 1
        outlineColor : Cesium.Color.YELLOW, // default: BLACK
        outlineWidth : 3 // default: 0
      }
    });*/



    /*points.add({
      position : Cesium.Cartesian3.fromDegrees(117.267, 31.765),
      color : Cesium.Color.CYAN
    });
    points.add({
      position : Cesium.Cartesian3.fromDegrees(117.257, 31.765),
      color : Cesium.Color.CYAN,
      pixelSize : 12,
      outlineColor : Cesium.Color.YELLOW, // default: BLACK
      outlineWidth : 2 // default: 0
    });
    viewer.scene.primitives.add(points);
    */
    let points = new Cesium.PointPrimitiveCollection();
    if(null != equips) {
      let index = 0;
      var instances = [];

      for(let i=0; i<=equips.length; i++) {
        let item = equips[i];
        if(null!=item && item.JINGDU!=undefined && item.WEIDU!=undefined) {
          // alert(item.JINGDU + '====' + item.WEIDU);

          /*var ellipse = new Cesium.EllipseGeometry({
            center: Cesium.Cartesian3.fromDegrees(item.JINGDU, item.WEIDU),
            semiMajorAxis: 10000.0,
            semiMinorAxis: 10000.0,
            vertexFormat: Cesium.VertexFormat.POSITION_ONLY
          });
          var geometry = Cesium.EllipseGeometry.createGeometry(ellipse);
          var ellipseInstance = new Cesium.GeometryInstance({
            geometry: geometry,
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
            }
          });
          instances.push(ellipseInstance);*/
          if(item.JINGDU<190.0 && item.WEIDU<35.0) {
            viewer.entities.add({
              name: item.EQUIPMENTCODE,
              position : Cesium.Cartesian3.fromDegrees(item.JINGDU, item.WEIDU),
              point : {
                show : true, // default
                color : Cesium.Color.GREEN, // default: WHITE
                pixelSize : 12, // default: 1
                // outlineColor : Cesium.Color.BLUE, // default: BLACK
                // outlineWidth : 2 // default: 0
              },
              properties: {
                equipmentcode: item.EQUIPMENTCODE,
                typename: item.TYPENAME,
                equiptype: item.EQUIPTYPE,
                roadcrossing: item.ROADCROSSING,
                monindex: item.MONINDEX
              }
            });
            index++;
          }
        }
      }
      // alert('渲染点位总计为：' + index + '个！');
      // viewer.scene.primitives.add(points);

      /*viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: points,
        appearance: new Cesium.PerInstanceColorAppearance()
      }));*/
    }




    /*var pinBuilder = new Cesium.PinBuilder();

    var url = Cesium.buildModuleUrl('/images/icons/04.png');
    Cesium.when(pinBuilder.fromUrl(url, Cesium.Color.GREEN, 96), function(canvas) {
      return viewer.entities.add({
        name : 'Grocery store',
        position : Cesium.Cartesian3.fromDegrees(117.243, 31.755),
        billboard : {
          image : canvas.toDataURL(),
          verticalOrigin : Cesium.VerticalOrigin.BOTTOM
        }
      });
    });

//Create a red pin representing a hospital from the maki icon set.
    Cesium.when(pinBuilder.fromMakiIconId('hospital', Cesium.Color.RED, 48), function(canvas) {
      return viewer.entities.add({
        name : 'Hospital',
        position : Cesium.Cartesian3.fromDegrees(117.233, 31.785),
        billboard : {
          image : canvas.toDataURL(),
          verticalOrigin : Cesium.VerticalOrigin.BOTTOM
        }
      });
    });*/


  }

  return {
    sample: sample
  };
});
