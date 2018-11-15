
function createModel(viewer, url, height) {
  viewer.entities.removeAll();

  var position = Cesium.Cartesian3.fromDegrees(117.265, 31.765, height);
  var heading = Cesium.Math.toRadians(135);
  var pitch = 0;
  var roll = 0;
  var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

  var entity = viewer.entities.add({
    name : url,
    position : position,
    orientation : orientation,
    model : {
      uri : url,
      minimumPixelSize : 128,
      maximumScale : 20000
    }
  });
  // viewer.trackedEntity = entity;
}


let eqpdatas = null;



parasails.registerPage('gis3d', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    // _.extend(this, SAILS_LOCALS);

  },
  mounted: async function() {

    /*const globemap =  Cesium.createTileMapServiceImageryProvider({
      url: '/gisdatas/imagery/globe/tiles'
    });

    var terrainProvider = new Cesium.CesiumTerrainProvider({
      url: 'https://assets.agi.com/stk-terrain/world',
      requestVertexNormals: true,
    });
    var image_googleSource = new Cesium.UrlTemplateImageryProvider({
      url: 'http://mt0.google.cn/vt/lyrs=s@702&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Ga',
      credit: ''
    });

    //tdt yx
    const tdt_sl = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtVecBasicLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    });

    const tdt_sl_bz = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible"
    });

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

    const tdt_yx_bz = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    });


    const tdt_yx2 = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtBasicLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    });

    const tdt_yx2_bz = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    });*/


    await io.socket.post('/sysdatas/wshello', function gotResponse(body, response) {
      const equips = body.bakDatas;

      const viewer = new Cesium.Viewer('cesiumContainer', {
        imageryProvider: image_googleSource,
        /*imageryProvider: image_googleSource,
        terrainProvider: terrainProvider,*/

        baseLayerPicker: true,    //是否显示图层选择控件
        animation: false,         //是否显示动画控件
        timeline: false,          //是否显示时间线控件
        sceneModePicker: true,    //是否显示投影方式控件
        geocoder: true,           //是否显示地名查找控件
        fullscreenButton: false,  //是否展示全屏
        // creditContainer: "creditContainer",
        TerrainProvider: null,
        selectionIndicator: true,
        infoBox: true,  //是否显示点击要素之后显示的信息
        navigationHelpButton: false, //是否显示帮助信息控件
        shouldAnimate : true,
        shadows : true,


        contextOptions: {
          webgl: {
            alpha: true
          }
        },
      });
      viewer.scene.globe.enableLighting = false; //太阳光
      //去除版权信息
      viewer._cesiumWidget._creditContainer.style.display = "none";
      viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      viewer.imageryLayers.addImageryProvider(tdt_yx2_bz);

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(117.261, 31.764, 2839),
        duration: 8
      });

      if(null != equips) {
        let index = 0;
        for(let i=0; i<=equips.length; i++) {
          let item = equips[i];
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
        // alert('渲染点位总计为：' + index + '个！');
        // viewer.scene.primitives.add(points);

        /*viewer.scene.primitives.add(new Cesium.Primitive({
          geometryInstances: points,
          appearance: new Cesium.PerInstanceColorAppearance()
        }));*/
      }

      /*//地形开挖
      let position = Cesium.Cartesian3.fromDegrees(117.261, 31.764, 30.0);
      let entity = viewer.entities.add({
        position: position,
        box: {
          dimensions: new Cesium.Cartesian3(400.0, 400.0, 200.0),
          material: Cesium.Color.WHITE.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.WHITE
        }
      });

      /!*!//添加父子级关系
      let subEtt = viewer.entities.add({
        parent: entity,
        position: Cesium.Cartesian3.fromDegrees(117.261, 31.764, 80.0),
        point : {
          show : true, // default
          color : Cesium.Color.SKYBLUE, // default: WHITE
          pixelSize : 100, // default: 1
          outlineColor : Cesium.Color.YELLOW, // default: BLACK
          outlineWidth : 3 // default: 0
        }
      });*!/

      const globe = viewer.scene.globe;
      globe.depthTestAgainstTerrain = true;
      globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
        modelMatrix: entity.computeModelMatrix(Cesium.JulianDate.now()),
        planes: [
          new Cesium.Plane(new Cesium.Cartesian3(1.0, 0.0, 0.0), -200.0),
          new Cesium.Plane(new Cesium.Cartesian3(-1.0, 0.0, 0.0), -200.0),
          new Cesium.Plane(new Cesium.Cartesian3(0.0, 1.0, 0.0), -200.0),
          new Cesium.Plane(new Cesium.Cartesian3(0.0, -1.0, 0.0), -200.0)
        ],
        edgeWidth: 1.0,
        edgeColor: Cesium.Color.WHITE
      });*/


    });






    /*Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YjY5MGRmOC1iNjg3LTRmMWYtOTU3OS1kZGU4NWY1ODI2NGUiLCJpZCI6MzYxMCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTUzODI2ODIyNH0.I4MNBprvHjxy8Acmkod1UIzA3-N8nkgBG05aJmuOi0A';

    viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtImgBasicLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: new Cesium.GeographicTilingScheme(),
      show: false
    }));//卫星影像

    viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
      layer: "tdtImgAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: new Cesium.GeographicTilingScheme(),
      show: false
    }));//注记图层*/




    // createModel(viewer, '/gisdatas/gaspipeline/gaspipeline.gltf', 500);
    // createModel(viewer, '/gisdatas/models/CesiumAir/Cesium_Air.gltf', 600);
    // createModel(viewer, '/gisdatas/kml/facilities/LaunchPad.png', 10);

    /*viewer.entities.add({
      position : Cesium.Cartesian3.fromDegrees(117.265, 31.765),
      billboard :{
        image : '/gisdatas/kml/facilities/LaunchPad.png'
      }
    });

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(117.261, 31.764, 2839),
      duration: 8
    });*/

    /*var dataSource = Cesium.GeoJsonDataSource.load('/gisdatas/gaspipeline/simplestyles.geojson',{
      fill: Cesium.Color.PINK.withAlpha(0.5),
      clampToGround: true,
    }).then(
      function(dataSource) {
        var p = dataSource.entities.values;
        for (var i = 0; i < p.length; i++) {
          p[0].polygon.extrudedHeight = 15; // or height property
        }
        viewer.dataSources.add(dataSource);
        viewer.zoomTo(dataSource);
      }
    );*/

    /*var points = Cesium.GeoJsonDataSource.load('/gisdatas/gaspipeline/ldpoint.geojson');
    points.then(function(dataSource) {
      viewer.dataSources.add(dataSource);
      var entities = dataSource.entities.values;
      var colorHash = {};
      for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var name = entity.name;
        entity.billboard.image = '/gisdatas/images/FlameGrate.png';
        entity.billboard.width = 12;
        entity.billboard.height = 12;
        // entity.point.color = Cesium.Color.GREEN;
        // entity.point.pixelSize = 12;
      }
    });
    var promise=Cesium.GeoJsonDataSource.load('/gisdatas/gaspipeline/ldline.geojson');
    promise.then(function(dataSource) {
      viewer.dataSources.add(dataSource);
      var entities = dataSource.entities.values;
      var colorHash = {};
      for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var name = entity.name;
        var color = colorHash[name];
        if (!color) {
          color = Cesium.Color.fromRandom({
            alpha : 1.0
          });
          colorHash[name] = color;
        }
        entity.polygon.material = color;
        entity.polygon.outline = false;
        entity.polygon.extrudedHeight =5000.0;
      }
    });
    viewer.zoomTo(promise);*/

  },




  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

  }
});
