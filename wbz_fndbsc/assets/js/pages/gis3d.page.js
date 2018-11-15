var wits_3dgis = wits_jsfrm.use('wits_3dgis');

parasails.registerPage('gis3d', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
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
      if(body.bakDatas) {
        wits_3dgis.mapview({equipmts: body.bakDatas});
      }
    });

  },




  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

  }
});
