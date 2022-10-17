  (function (){
    let App = {
      ready: function ($this){
        let started = this.sesStore.getAll().started,
        url = this.getUrl();
        
        if((started == undefined && url.pg == undefined) || ( started && url.pg == undefined )){
          this.setUrl({pg: fc.homePage});
          this.sesStore.put({started: true});
          this.pageRequest(fc.homePage, true);
          return;
        }
        
        if(url.pg[0] != 'U' && url.pg[1] != '2'){
          this.setUrl({pg: url.pg});
          url = this.getUrl();
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
          bdy = (b) =>{  page.body = (h, f) => `${h} ${$$.tag({
              text:`${b}${f}`,
              attr: { id: page.elemId.main}
            })}`;
            cb(pageSetting.main, pageSetting);
          };
          
          if(pageSetting.main && (pageSetting.main.body && (typeof pageSetting.main.body == 'function') )){
            bdy( pageSetting.main.body(page.elemId) );
          }else{
            bdy($$.tag({
              attr: { id: page.elemId.noContent },
              text: 'No Contents On This Page!'
            }));
          }
        }
        
        $$.each(pageSetting, (pageType, settings) => {
          $$.each(settings, (setting, val) => {
            if(setting == 'elemId' && $$.len(val)){
              page.elemId += ` main noContent ${val} `;
            }
          });
        });
        
        page.elemId = fc.generateGuid( page.elemId.replace('undefined', '').trim() );
        fc.setting = {
          url: url, currUrl: cur_url,
          build: {...pageSetting}, ...pageSetting.main, ...page
        };
        
        initBody(function(setting, pg){
          if(setting == undefined){
            page.body = fc.minimize( page.body( pg.header.body(page.elemId), pg.footer.body(page.elemId) ));
            return;
          }
          
          page.body = fc.minimize( page.body(
            setting.header == false ? '' : pg.header.body(page.elemId),
            setting.footer == false ? '' : pg.footer.body(page.elemId)
          ));
         
          page.css = typeof setting.css == 'function' ? setting.css(page.elemId) : '';
          page.extCss =  setting.extCss ? setting.extCss : [];
          page.extScript = setting.extScript ? setting.extScript : [];
          page.title = setting.title || '';
        });
        
        $('title').html(`${fc.name} »» ${page.title}`);
        $$.injectCss( fc.minimize( fc.styles(page.css, page.elemId) ) );
        
        $$.runJs(page.extScript).fail(function (){
          alert('fail to load external script "'+this.url+'"');
        }).done(
        function(){
          fc.currentPageScript(page.elemId, pageSetting.main );
        });
        
        $$.runJs(page.extCss).fail(function (){
          alert('fail to load external css "'+this.url+'"');
        }).done(
        function(){
          $$.injectCss(fc.currentPageStyle(page.elemId, pageSetting.main) );
        });
        
        $(`#${fc.rootId}`).html(fc.minimize( page.body ));
        fc.trigger(fc.setting, page.elemId);
      },
      
      pageRequest404: function(url){
        let $this = this;
        fc.getPage(['page404']).done(function (){
          fc.buildPage.page404.body($this);
        });
      },
      
      pageRequest: function(url, init){
        const u =  u => u.indexOf('.fc') > -1 ? u.delChar('$', 3) : `${u}/index`,
        pg = init === true ? u(url) : u(url.pg);
        this.getPage( this.pageFiles(pg))
        .fail( function(){
          fc.pageRequest404.call(this, url);
          fc.loader();
        })
        .done( function (){
          fc.pageRequest200.call(this, fc.buildPage, url, pg);
          fc.loader();
        });
      },
      
      getUrl: function(){
        let param = {},
        dec = v => decodeURIComponent(v);
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, k, v) => { 
          param[k] = v[0] == 'U' && v[1] == '2' 
          ? fc.decrypt(dec(v)) : dec(v);
        });
        return param;
      },
      
      setUrl: function(obj){
        const url = new URL(window.location);
        $$.each(obj, (k, v) => { 
          v = v[0] == '*' ? this.encrypt(v.delChar('^')) : k == 'pg' ? this.encrypt(v) : v;
          url.searchParams.set(k, v);
        });
        window.history.pushState({}, '', url);
        return url;
      },
      
      setTrigger: function(val){
        if(typeof val != 'object') return '';
        return `data-${fc.triggerDataAttr}="${fc.triggerDataVal}" data-${fc.triggerItemAttr}="${ fc.encrypt( JSON.stringify(val).replaceAll('"', "'") ) }"`;
      },
      
      onRefresh: function(started){
        const store = this.sesStore.getAll();
      },
      
      onReturn: function (){
        window.onpopstate = function(e){ 
          window.location.reload(true);
        };
      },
      
      loader: function(){
        $('#loadingWrapper').fadeOut(1500);
      },
      
      rgba: (h, a) => $$.hexToRGB(h, 'A', a),
      minimize: (txt,typ) => txt.split(typ || '\n').map(t => t.trim()).join(''),
      encrypt: (c, p) => CryptoJS.AES.encrypt(c, p||fc.priv.pin).toString(),
      decrypt: (c, p) => CryptoJS.AES.decrypt(c, p||fc.priv.pin).toString(CryptoJS.enc.Utf8),
      conn: () => navigator.onLine,
      
      /*app informations ****/
      homePage: 'home',
      name: 'Fezcap',
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
      fc.triggerDataAttr = $$.guid(true);
      fc.triggerDataVal = $$.guid(true);
      fc.triggerItemAttr = $$.guid(true);
      fc.trigger = trigger;
      fc.rootId = $$.guid(true);
      fc.getPage = $$.runJs;
      fc.currentPageStyle = () => {},
      fc.currentPageScript = () => {},
      fc.priv = { pin: $$.pid() };
      fc.buildPage = {};
      fc.pageFiles = body => `header ${body} footer`.split(' ');
      $('body').prepend($$.tag({ attr: { id: fc.rootId }}) );
      fc.ready(this);
    }
    
    function trigger(setting, id){
      $(`*[data-${fc.triggerDataAttr}=${fc.triggerDataVal}]`).click(function (evt){
        let $this = $(this),
        on_trigger = fc.decrypt( $this.attr(`data-${fc.triggerItemAttr}`)),
        trigger_obj = JSON.parse(on_trigger.replaceAll("'",'"'));
        if(setting && trigger_obj.on == 'href'){
          if(setting.build.header && typeof setting.build.header.onHrefTrigger == 'function'){
            setting.build.header.onHrefTrigger.call(this, evt, $this, trigger_obj, id, setting);
          }
          if(setting.build.main && typeof setting.build.main.onHrefTrigger == 'function'){
            setting.build.main.onHrefTrigger.call(this, evt, $this, trigger_obj, id, setting);
          }
          if(setting.build.footer && typeof setting.build.footer.onHrefTrigger == 'function'){
            setting.build.footer.onHrefTrigger.call(this, evt, $this, trigger_obj, id, setting);
          }
        }
        onTrigger(this, evt, $this)[trigger_obj.on](trigger_obj);
        fc.onReturn(); 
      }); 
      
      if(setting && typeof setting.done == 'function'){
        setting.done(id, setting);
      }
      if(setting.build.header && typeof setting.build.header.done == 'function'){
        setting.build.header.done(id, setting);
      }
      if(setting.build.footer && typeof setting.build.footer.done == 'function'){
        setting.build.footer.done(id, setting);
      }
      
      function onTrigger(self, evt, $this){
        return  {
          callback: function (data){
            if((data.src != undefined && data.call != undefined)){
              if(setting.build[data.src] && typeof setting.build[data.src][data.call] == 'function'){
                setting.build[data.src][data.call].call(self, evt, $this, data, id, setting);
                return;
              }
            }else{
              if(data.call == undefined && data.src != undefined){
                if(setting.build[data.src] && typeof setting.build[data.src].onTriggerCallback == 'function'){
                  setting.build[data.src].onTriggerCallback.call(self, evt, $this, data, id, setting);
                  return;
                }
              }
            }
            
            if(data.call != undefined && typeof setting[data.call] == 'function'){
              setting[data.call].call(self, evt, $this, data, id, setting)
            }else{
              if(setting.onTriggerCallback != undefined && typeof setting.onTriggerCallback == 'function'){
                setting.onTriggerCallback.call(self, evt, $this, data, id, setting)
              }
            }
          },
          
          href: function (data){
            let url = data.url;
            fc.setUrl({pg:url});
            if(data.reload == false){
              fc.pageRequest(fc.getUrl());
              return;
            } 
            window.location.reload(true);
          }
        }
      }
    }
    
    fc.INIT_FEZCAP.fail(init).done(function(){ fc.INCLUDES_SCRIPT.fail(init).done(init) });
  }());