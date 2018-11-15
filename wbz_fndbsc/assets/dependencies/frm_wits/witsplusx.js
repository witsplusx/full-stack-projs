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
  let metaCfgs = {};
  let providerViewModels = [];

  function preinit() {
    const globemap =  Cesium.createTileMapServiceImageryProvider({
      url: '/gisdatas/imagery/globe/tiles'
    });
    metaCfgs.maplayer_locglobemap = globemap;

    var terrainProvider = new Cesium.CesiumTerrainProvider({
      url: 'https://assets.agi.com/stk-terrain/world',
      requestVertexNormals: true,
    });
    metaCfgs.maplayer_net_glbterr = terrainProvider;

    var image_googleSource = new Cesium.UrlTemplateImageryProvider({
      url: 'http://mt0.google.cn/vt/lyrs=s@702&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Ga',
      credit: ''
    });
    metaCfgs.maplayer_net_googleyx = image_googleSource;

    //tdt shiliang
    const tdt_sl = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtVecBasicLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    });
    metaCfgs.maplayer_net_tdtsl = tdt_sl;

    const tdt_sl_bz = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible"
    });
    metaCfgs.maplayer_net_tdtslbz = tdt_sl_bz;

    const tdt_yx = new Cesium.WebMapTileServiceImageryProvider({
      url : 'http://t0.tianditu.com/img_c/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=img&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles',
      layer : 'img',
      style : 'default',
      format : 'tiles',
      tileMatrixSetID : 'c',
      credit : new Cesium.Credit('天地图全球影像服务'),
      subdomains : ['t0','t1','t2','t3','t4','t5','t6','t7'],
      maximumLevel : 19,
      tilingScheme : new Cesium.GeographicTilingScheme(),
      tileMatrixLabels:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19']
    });
    metaCfgs.maplayer_net_tdtyx = tdt_yx;

    const tdt_yx_bz = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    });
    metaCfgs.maplayer_net_tdtyxbz = tdt_yx_bz;

    const tdt_yx2 = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtBasicLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    });
    metaCfgs.maplayer_net_tdtyx2 = tdt_yx2;

    const tdt_yx2_bz = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    });
    metaCfgs.maplayer_net_tdtyxbz2 = tdt_yx2_bz;

    const nasa_black_marble = Cesium.createTileMapServiceImageryProvider({
      url : 'https://cesiumjs.org/tilesets/imagery/blackmarble',
      maximumLevel : 8,
      maximumLevel : 8,
      flipXY : true,
      credit : 'Black Marble imagery courtesy NASA Earth Observatory'
    });
    metaCfgs.maplayer_nasa_blackmarble = nasa_black_marble;

  }

  //初始化初始图层
  function initProvViewMdls() {

    let google_yx_map = new Cesium.ProviderViewModel({
      name: 'Google 影像地图',
      iconUrl: '/images/gis/02_tianditu.jpg',
      tooltip: 'Google 影像地图',
      creationFunction: function () {
        return metaCfgs.maplayer_net_googleyx;
      }
    });
    providerViewModels.push(google_yx_map);

    let tdt_yx_map = new Cesium.ProviderViewModel({
      name: '天地图 影像地图',
      iconUrl: '/images/gis/02_tianditu.jpg',
      tooltip: '天地图 影像地图',
      creationFunction: function () {
        return metaCfgs.maplayer_net_tdtyx2;
      }
    });
    providerViewModels.push(tdt_yx_map);

    let tdt_sl_map = new Cesium.ProviderViewModel({
      name: '天地图 矢量地图',//tdt Maps
      iconUrl: '/images/gis/02_osm.jpg',//Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/tdt.jpg'),
      tooltip: '天地图 矢量地图',
      creationFunction: function () {
        return metaCfgs.maplayer_net_tdtsl;
      }
    });
    providerViewModels.push(tdt_sl_map);

    let map_world_terrain = new Cesium.ProviderViewModel({
      name: '高清晰 地形图',//tdt Maps
      iconUrl: '/images/gis/02_tianditu.jpg',//Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/tdt.jpg'),
      tooltip: '高清晰 地形图',
      creationFunction: function () {
        return new Cesium.createWorldTerrain();
      }
    });
    providerViewModels.push(map_world_terrain);

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
    let mouse_state = document.getElementById('cesiumMouseStatus');//显示状态信息
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

  //加载核心业务数据及功能
  function loadBusFuns(viewer, buzDatas) {
    //  加载业务点位信息
    if(null != buzDatas) {
      let index = 0;
      for(let i=0; i<=buzDatas.length; i++) {
        let item = buzDatas[i];
        if(null!=item && item.JINGDU!=undefined && item.WEIDU!=undefined) {
          if(item.JINGDU<190.0 && item.WEIDU<35.0) {
            viewer.entities.add({
              name: item.EQUIPMENTCODE,
              position : Cesium.Cartesian3.fromDegrees(item.JINGDU, item.WEIDU),
              billboard :{
                image : '/gisdatas/kml/facilities/GroundStation.png',
                width: 24,
                height: 24
              },
            });
            index++;
          }
        }
      }

    }
  }


  function mapview(opts) {
    preinit();
    initProvViewMdls();

    /*const globemap =  Cesium.createTileMapServiceImageryProvider({
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
    });*/

    const viewer = new Cesium.Viewer('cesiumContainer', {
      // imageryProvider: globemap,
      // terrainProvider : Cesium.createWorldTerrain(),

      imageryProviderViewModels: providerViewModels,//自定义扩展

      baseLayerPicker: true,    //是否显示图层选择控件
      animation: false,         //是否显示动画控件
      timeline: false,          //是否显示时间线控件
      sceneModePicker: true,    //是否显示投影方式控件
      geocoder: true,           //是否显示地名查找控件
      fullscreenButton: false,  //是否展示全屏
      creditContainer: 'cesiumCreditContainer',
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

    //常用初始化设置
    //去除版权信息
    viewer._cesiumWidget._creditContainer.style.display = "none";
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    //太阳光亮设置
    viewer.scene.globe.enableLighting = false;
    // viewer.camera.rotateLeft(Cesium.Math.toDegrees(0.005).toFixed(2));

    //添加其它图层
    viewer.imageryLayers.addImageryProvider(metaCfgs.maplayer_net_tdtyxbz2);

    //
    // viewer.imageryLayers.addImageryProvider(metaCfgs.maplayer_nasa_blackmarble);

    //设置homebutton的位置
    if(opts.map_home_rect) {
      Cesium.Camera.DEFAULT_VIEW_RECTANGLE =
        Cesium.Rectangle.fromDegrees(opts.map_home_rect.west, opts.map_home_rect.south,
          opts.map_home_rect.east, opts.map_home_rect.north); //Rectangle(west, south, east, north)
    } else {
      Cesium.Camera.DEFAULT_VIEW_RECTANGLE =
        Cesium.Rectangle.fromDegrees(117.08, 31.74, 117.49, 31.96); //Rectangle(west, south, east, north)
    }

    //设置初始 展示 位置
    if(opts.start_position) {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(opts.start_position.jd, opts.start_position.wd,
          opts.start_position.gd),
        duration: 8
      });
    } else {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(117.261, 31.764, 2839),
        duration: 8
      });
    }

    regMouseFun(viewer);
    loadBusFuns(viewer, opts.equipmts);

  }

  return {
    mapview: mapview
  };
});
