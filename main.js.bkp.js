  (function (){
    let App = {
      ready: function ($this){
        const started = this.sesStore.getAll().started,
        url = this.getUrl();
        
        if(started == undefined){
          this.setUrl({pg: fc.homePage});
          this.sesStore.put({started: true});
          this.pageRequest(fc.homePage, true);
          return;
        }
        this.pageRequest(url);
        this.onRefresh(started, url, $this);
      },
      
      generateGuid: function(id = ' '){
        let ID = {};
        $$.each(id.split(' '), v => {  ID[v.trim()] = $$.guid(true) });
        return ID;
      },
      
      pageRequest200: function(pageSetting, url, cur_url){
        let page = {},
        createScript = (txt, attr = {}) => $$.tag({
          elem: 'script', text: txt, attr: attr
        });
        
        function initBody(cb){
          if(pageSetting.main && (pageSetting.main.body && (typeof pageSetting.main.body == 'function') )){
            page.body = (h, f) => `${h} ${$$.tag({
              text:`${pageSetting.main.body()}${f}`,
              attr: { id: page.elemId.main}
            })}`;
            cb(pageSetting.main, pageSetting);
          }
        }
        
        $$.each(pageSetting, (pageType, settings) => {
          $$.each(settings, (setting, val) => {
            if(setting == 'elemId' && $$.len(val)){
              page.elemId += ` main ${val} `;
            }
          });
        });
        
        page.elemId = fc.generateGuid( page.elemId.replace('undefined', '').trim() );
        fc.setting = {
          url: url,
          currUrl: cur_url,
          ...pageSetting,
          ...pageSetting.main,
          ...page
        };
        
        initBody(function(setting, pg){
          page.body = fc.minimize( page.body(
            setting.header == false ? '' : pg.header.body(),
            setting.footer == false ? '' : pg.footer.body()
          ));
          
          page.css = typeof setting.css == 'function' ? setting.css() : '';
          page.extCss = typeof setting.extCss ? setting.extCss : [];
          page.script = typeof setting.script == 'function' ? createScript( setting.script() ) : '';
          page.extScript = typeof setting.extScript ? setting.extScript : [];
          page.title = setting.title || 'FEZCAP';
        });
        
        title_elem = $('title');
        title_elem.html(`${title_elem.text()} »» ${page.title}`);
        $$.injectCss( fc.styles(page.css) );
        
        $$.runJs(page.extScript).fail(function (){
          alert('fail to load external script "'+this.url+'"');
        }).done(
        function(){
          fc.currentPageScript( );
        });
        
        $$.runJs(page.extCss).fail(function (){
          alert('fail to load external css "'+this.url+'"');
        }).done(
        function(){
          $$.injectCss(fc.currentPageStyle() );
        });
        
        if(fc.sesStore.getAll().reload == undefined && fc.setting.reload ===true){
         
       loc =   window.location
       location.href = loc
        fc.sesStore.put({reload:true})
    //   alert(loc)
         
        }
        
        $(`#${fc.rootId}`).html(page.body);
        fc.trigger(fc.setting);
      },
      
      pageRequest404: function(url){
        
        alert(this.url+ ' fail ');
      },
      
      pageRequest: function(url, init){
        pg = ((init === true) ? url : url.pg)+`/index`;
        this.getPage( this.pageFiles(pg))
        .fail( function(){
          fc.pageRequest404.call(this, url);
        })
        .done( function (){
          fc.pageRequest200.call(this, fc.buildPage, url, pg);
        });
      },
      
      getUrl: function(){
        let param = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, k, v) => { param[k] = v });
        return param;
      },
      
      setUrl: function(obj){
        const url = new URL(window.location);
        $$.each(obj, (k, v) => { 
          //v = v[0] == '*' ? this.encrypt(v.delChar('^')) : k == 'pg' ? this.encrypt(v) : v;
          url.searchParams.set(k, v);
        });
        
        window.history.pushState({}, '', url);
      },
      
      onRefresh: function(started){
        const store = this.sesStore.getAll();
       },
      
      rgba: (h, a) => $$.hexToRGB(h, 'A', a),
      minimize: (txt,typ) => txt.split(typ || '\n').map(t => t.trim()).join(''),
      encrypt: (c, p) => CryptoJS.AES.encrypt(c, p||fc.pin).toString(),
      decrypt: (c, p) => CryptoJS.AES.decrypt(c, p||fc.pin).toString(CryptoJS.enc.Utf8),
      conn: () => navigator.onLine,
    
      /*app informations ****/
      homePage: 'home',
      name: 'fezcap',
      version: 1,
      author: 'isaiah Ubong',
      email: 'fezcap24@gmail.com',
    };
    
    function init(){
      if(this.url){
        let failUrl = this.url.split('?')[0];
        alert(failUrl+' fail to load...');
        return;
      }
      
      fc.locStore = $$.localStore('fezcap', 'local');
      fc.sesStore = $$.localStore('fezcap', 'session');
      fc.db = $$.database({
        databaseName: 'FC_DATABASE',
        storeName: 'fezcap'
      });
      
      $('meta[name=theme-color]').attr('content', $$.colorCode());
      $$.each(App, (k, v) => { fc[k] = v });
      
      fc.triggerId = $$.guid(true);
      fc.triggerBtn = $$.guid(true);
      fc.triggerBtnId = $$.guid(true);
      fc.setTrigger = val => `data-${fc.triggerBtnId}="${fc.triggerBtn}" data-${fc.triggerId}="${typeof val == 'object' ? JSON.stringify(val).replaceAll('"', "'"): val}"`;
      fc.trigger = trigger;
      
      fc.rootId = $$.guid(true);
      fc.getPage = $$.runJs;
      
      fc.currentPageStyle = () => {},
      fc.currentPageScript = () => {},
      
      fc.buildPage = {};
      fc.pageFiles = body => `header ${body} footer`.split(' ');
      
      $('body').prepend($$.tag({ attr: { id: fc.rootId } }));
      fc.ready(this);
    }
    
    function trigger(setting){
      const id = setting.elemId,
      store = fc.sesStore,
      get_store_item = store.getAll(),
      setItem = {};
      
      $(`*[data-${fc.triggerBtnId}=${fc.triggerBtn}]`).click(function (){
        let $this = $(this),
        on_trigger = $this.attr(`data-${fc.triggerId}`);
        trigger_obj = on_trigger[0] == '{' ? JSON.parse(on_trigger.replaceAll("'",'"')) : undefined;
        trigger_obj != undefined ? onTrigger($this)[trigger_obj.on](trigger_obj) : onTrigger()[on_trigger]() ;
      });
      
      let menuCounter = 0;
      if(get_store_item.menuOpen){
        onTrigger().menu(true);
      }
      
      function onTrigger($this){
        return  {
          href: function (data){
            let url = data.url
            if(get_store_item.menuOpen){
              return;
            }
            
            
            if(url.indexOf('.fc') > -1){
             url = url.replace('.fc', '');
              fc.setUrl({pg:url, ext:'fc'});
            }
            
            if(url.indexOf('.ffc') > -1){
              url = url.replace('.ffc', '');
              fc.setUrl({pg:url, ext:'ffc'});
            }
            
            fc.pageRequest(fc.getUrl());
          
           
          },
          
          menu: function (openM){
            menuCounter++;
            if(openM){ openMenu(openM); return }
            
            if(menuCounter == 1){ 
              openM = true;
              store.put({ menuOpen: true });
            }else{
              openM = false;
              menuCounter = 0;
              store.delete('menuOpen');
            }
            openMenu(openM);
            
            function openMenu(open){
              if(open){
                $(`#${id.menuWrapper}`).fadeIn();
                $(`#${id.main}`).css({
                  position:'fixed',
                  width: '100%',
                  height: '100%' 
                });
                header_main = $(`#${id.headerWrapper}, #${id.main}`);
                header_main.transition({
                  x:'85%'
                }, function(){ 
                  $(`#${id.menuIconBox}`).html(fc.icon.cancel({ 'class': id._menuIconOpen}));
                }).addClass(`${id._menuOpen} ${id._menuOpenBG}`);
              }
              else{
                header_main.transition({
                  x:'0'
                }, function(){
                  $(`#${id.menuIconBox}`).html(fc.icon.menu({ 'class': id.menuIcon}));
                  $(`#${id.menuWrapper}`).hide(10, function(){});
                  $(`#${id.main}`).css({ position:'static', width: '100%', height: '0' });
                  header_main.removeClass(`${id._menuOpen} ${id._menuOpenBG}`);
                });
              }
            }
          }/*menu controller*/
        }
      }
    }
    
    fc.INIT_FEZCAP.fail(init).done(function(){ fc.INCLUDES_SCRIPT.fail(init).done(init) });
  }());