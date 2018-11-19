const wits_jsfrm_ui = wits_jsfrm.use('wits_bscfrm_ui');
const wits_3dgis = wits_jsfrm.use('wits_3dmapgis');


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

    await io.socket.post('/sysdatas/wshello', function gotResponse(body, response) {
      if(body.bakDatas) {
        wits_3dgis.mapview({
          buzDatas: {
            equipmts: body.bakDatas,
          },
          imgprovs: [         //系统地图服务  （如果有地图服务，第一个load_index=0,下面依次递增）
            /*{
              uuid: 'sys_img_hefei',
              name: '系统-天地图标注服务',
              desc: '',
              default_load: true,
              load_index: 1,
              provider: new Cesium.ArcGisMapServerImageryProvider({
                url : '//10.5.4.140:6080/arcgis/rest/services/anhui_yx_1/MapServer',    //影像图
                // url : '//10.5.4.140:6080/arcgis/rest/services/HF0110ok/MapServer',    //矢量图
                maximumLevel: 19,
                proxy : new Cesium.DefaultProxy('/proxy/')
              })
            }*/
          ]
        });
      }
    });

    $('.btn-triger').click(function () {
      $(this).closest('.float-btn-group').toggleClass('open');
    });

    /*const menu = new wits_jsfrm_ui.CoolDragMenu("#myMenu");
    const item1 = new wits_jsfrm_ui.CoolDragItem("list", '#FFFFFF');
    const item2 = new wits_jsfrm_ui.CoolDragItem("torso", "#FF5C5C", 'ITEM2');
    const item3 = new wits_jsfrm_ui.CoolDragItem("social-facebook", "#5CD1FF", 'ITEM3');
    const item4 = new wits_jsfrm_ui.CoolDragItem("paypal", "#FFF15C", 'ITEM4');
    const item5 = new wits_jsfrm_ui.CoolDragItem("link", "#64F592", 'ITEM5');

    menu.add(item1);
    menu.add(item2);
    menu.add(item3);
    menu.add(item4);
    menu.add(item5);
    $(document).delay(50).queue(function(next) {
      menu.open();
      next();
      $(document).delay(1000).queue(function(next) {
        menu.close();
        next();
      });
    });*/


  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

  }
});
