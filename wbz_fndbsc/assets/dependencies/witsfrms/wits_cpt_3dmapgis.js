/**
 * 3d map gis 基于cesium封装及扩展
 */
wits_jsfrm.define('wits_3dmapgis', [], () => {
  let bscinfo = {
    author: 'witshine',
    email: 'wits_maotech@163.com',
    description:　'基于Cesium 进行组件封装扩展~',
    version: '0.1.0'
  };

  let imgprovs = new Map();
  imgprovs.set('LOC_GLOBE_MAP', {
    uuid: 'LOC_GLOBE_MAP',
    name: '本地全球影响地图',
    desc: '',
    default_load: false,
    load_index: -1,
    provider: new Cesium.createTileMapServiceImageryProvider({
      url: '/dependencies/witsfrms/gisdatas/imagery/globe/tiles'
    })
  });
  imgprovs.set('WORLD_TERRAIN', {
    uuid: 'WORLD_TERRAIN',
    name: '全球地形图服务',
    desc: '',
    default_load: false,
    load_index: -1,
    provider: new Cesium.CesiumTerrainProvider({
      url: 'https://assets.agi.com/stk-terrain/world',
      requestVertexNormals: true,
    })
  });
  imgprovs.set('GLB_IMG_GOOGLE', {
    uuid: 'GLB_IMG_GOOGLE',
    name: '公网google全球影像服务',
    desc: '',
    default_load: false,
    load_index: -1,
    provider: new Cesium.UrlTemplateImageryProvider({
      url: 'http://mt0.google.cn/vt/lyrs=s@702&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Ga',
      credit: ''
    })
  });
  imgprovs.set('GLB_VECTOR_TDT01', {
    uuid: 'GLB_VECTOR_TDT01',
    name: '公网-天地图-全球矢量服务',
    desc: '',
    default_load: false,
    load_index: -1,
    provider: new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtVecBasicLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    })
  });
  imgprovs.set('GLB_VECTOR_TDT01_LABEL', {
    uuid: 'GLB_VECTOR_TDT01_LABEL',
    name: '公网-天地图-全球矢量-标注服务',
    desc: '',
    default_load: false,
    load_index: -1,
    provider: new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible"
    })
  });
  imgprovs.set('GLB_IMG_TDT01', {
    uuid: 'GLB_IMG_TDT01',
    name: '公网-天地图-全球影像服务',
    desc: '',
    default_load: false,
    load_index: -1,
    provider: new Cesium.WebMapTileServiceImageryProvider({
      url : 'http://t0.tianditu.com/img_c/wmts?service=WMTS&version=1.0.0&request=GetTile' +
        '&tilematrix={TileMatrix}&layer=img&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles',
      layer : 'img',
      style : 'default',
      format : 'tiles',
      tileMatrixSetID : 'c',
      credit : new Cesium.Credit('天地图全球影像服务'),
      subdomains : ['t0','t1','t2','t3','t4','t5','t6','t7'],
      maximumLevel : 19,
      tilingScheme : new Cesium.GeographicTilingScheme(),
      tileMatrixLabels:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19']
    })
  });
  imgprovs.set('GLB_IMG_TDT01_LABEL', {
    uuid: 'GLB_IMG_TDT01_LABEL',
    name: '公网-天地图-全球影像-标注服务',
    desc: '',
    default_load: false,
    load_index: -1,
    provider: new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    })
  });
  imgprovs.set('GLB_IMG_TDT02', {
    uuid: 'GLB_IMG_TDT02',
    name: '公网-天地图-全球影像服务02',
    desc: '',
    default_load: false,
    load_index: -1,
    provider: new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtBasicLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    })
  });
  imgprovs.set('GLB_IMG_TDT02_LABEL', {
    uuid: 'GLB_IMG_TDT02_LABEL',
    name: '公网-天地图-全球影像-标注服务02',
    desc: '',
    default_load: false,
    load_index: -1,
    provider: new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    })
  });
  imgprovs.set('GLB_IMG_NASA_BLACK', {
    uuid: 'GLB_IMG_NASA_BLACK',
    name: '公网-NASA-全球夜晚影像服务',
    desc: '',
    default_load: false,
    load_index: -1,
    provider: new Cesium.createTileMapServiceImageryProvider({
      url : 'https://cesiumjs.org/tilesets/imagery/blackmarble',
      maximumLevel : 8,
      maximumLevel : 8,
      flipXY : true,
      credit : 'Black Marble imagery courtesy NASA Earth Observatory'
    })
  });

  let opts = {
    map_defimg_providers: imgprovs,                 //系统默认地图服务
    map_buzimg_providers: null,                     //系统业务地图服务
    map_view_layers: [],                            //系统可用图层()
    cesiumViewer: null,
    buzDatas: null,
    showParams: null,
  };

  //系统初始化加载~~
  function initialize(outOpts) {
    if(outOpts.buzDatas) {
      opts.buzDatas = outOpts.buzDatas;
    }
    if(outOpts.showParams) {
      opts.showParams = outOpts.showParams;
    }

    if(outOpts.imgprovs) {
      initProvViewMdls(outOpts.imgprovs, outOpts.showParams);
    } else {
      console.error('缺失关键入参信息，请检查确认！');
      alert('缺失关键入参信息，请检查确认！');
    }

  }

  //初始化初始图层
  function initProvViewMdls(datas, showParams) {
    let bscMap = null;
    let bscImgPrv = null;

    opts.map_buzimg_providers = datas;
    for(let i=0; i<datas.length; i++) {
      let tmp = datas[i];
      if(tmp.load_index === 0) {
        bscMap = tmp;
      }
    }

    if(null != bscMap) {
      bscImgPrv = bscMap.provider;
    } else {
      //如果没有, 默认使用Google全球影像服务
      bscImgPrv = imgprovs.get('GLB_IMG_TDT01').provider;
    }

    //加载Cesium
    const viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: bscImgPrv,

      baseLayerPicker: false,                        //是否显示图层选择控件
      animation: false,                             //是否显示动画控件
      timeline: false,                              //是否显示时间线控件
      sceneModePicker: true,                        //是否显示投影方式控件
      geocoder: true,                               //是否显示地名查找控件
      fullscreenButton: true,                      //是否展示全屏
      creditContainer: 'cesiumCreditContainer',
      TerrainProvider: null,
      selectionIndicator: true,
      infoBox: true,                                //是否显示点击要素之后显示的信息
      navigationHelpButton: false,                  //是否显示帮助信息控件
      navigationInstructionsInitiallyVisible:false,

    });

    //常用初始化设置
    //去除版权信息
    viewer._cesiumWidget._creditContainer.style.display = "none";
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    //太阳光亮设置
    viewer.scene.globe.enableLighting = false;

    viewer.extend(Cesium.viewerCesiumNavigationMixin, {});

    //添加系统业务图层
    if(bscMap == null) {
      viewer.imageryLayers.addImageryProvider(imgprovs.get('GLB_IMG_TDT01_LABEL').provider);
    }
    for(let i=0; i<datas.length; i++) {
      let tmp = datas[i];
      viewer.imageryLayers.addImageryProvider(tmp.provider);
    }

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
        destination: Cesium.Cartesian3.fromDegrees(117.261, 31.764, 1800),
        duration: 8
      });
    }
    //赋值
    opts.cesiumViewer = viewer;

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


  function mapview(outOpts) {
    initialize(outOpts);
    regMouseFun(opts.cesiumViewer);
    loadBusFuns(opts.cesiumViewer, opts.buzDatas.equipmts);
  }

  return {
    mapview: mapview
  };
});
