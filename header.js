  (function (){
    
    let menu_open = false,
    
    quick_link_items = [
      ['home', 'home'],
      ['game', 'games'],
      ['quote', 'quotes'],
      ['code', 'programming']
    ],
    
    fixed_menu_item = [
      ['Home', 'home', 'home'],
      ['Account', 'person', 'account'],
      ['Contact Us', 'call', 'contact-us.fc'],
      ['About Us', 'group', 'about-us.fc'],
    ];
    
    function header(id){
      return `
        ${menu(id)}
        <div id="${ id.headerWrapper }">
          <div id="${ id.headerBox }">
            <div id="${ id.menuIconBox }" ${ fc.setTrigger({on:'callback', call:'openMenu', src:'header'}) }> ${ fc.icon.menu({'class': id.menuIcon }) } </div>
            <div id="${ id.brandingBox }"> <h1 id="${id.brandingText }">FEZCAP</h1> </div>
            <div id="${ id.searchBox }">
              <input type="search" id="${ id.searchInput }" placeholder="Search files" /> 
              ${ fc.icon.search({'class' : id.searchIcon }) }
            </div>
          </div>
          <div id="${id.quickLinkWrapper}">
            ${ quickLink(id) }
          </div>
        </div>
      `;
    }
    
    function quickLink(id, url){
      let quick_link_elem = '';
      $$.each(quick_link_items, item => {
        let icon = fc.icon[ item[0] ],
        link = item[1],
        active_item = fc.setting.quickLink == link.split('.')[0] ? id.activeQuickLink : '';
        quick_link_elem += `<a ${fc.setTrigger({on: 'href', url: link, urlType: 'quickLink'})} class="${id.quickLinkItem}"> ${icon({'class': `${id.quickLinkIcon} ${active_item}` }) }</a>`;
      });
      return quick_link_elem;
    }
    
    function menu(id){
      let fixedMenu = () =>{
        let elem = `<div id="${id.fixedMenuWrapper}">`;
        $$.each(fixed_menu_item, item => {
          let icon = fc.icon[item[1]];
          elem += `<a ${fc.setTrigger({ url: item[2], on: 'href'})} class="${id.fixedMenuItem}">
            <span>${icon({'class': id.fixedMenuIcon })} </span>
            <span class="${ id.fixedMenuText }">${ item[0] }</span>
          </a>`;
        });
        return `${elem}</div>`;
      };
      
      return`
        <div id="${id.menuWrapper}">
          ${fixedMenu()}
          
          <div id='ttt'></div>
        </div>
      `;
    }
    
    function openMenu(evt, sel, option, id, pageSetting){
      if(!menu_open) menu_open = true;
      else menu_open = false;
      
      function openM(open){
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
      openM(menu_open);
    }
    
    function onHrefTrigger(evt, sel, option, id, pageSetting){
      
    }
    
    fc.buildPage.header = {
      onHrefTrigger:onHrefTrigger,
      body: header,
      openMenu: openMenu,
      elemId: `_menuOpen _menuIconOpen _translate _menuOpenBG menuWrapper fixedMenuWrapper fixedMenuItem fixedMenuIcon fixedMenuText headerWrapper headerBox brandingBox brandingText menuIconBox menuIcon searchBox searchInput searchIcon quickLinkWrapper quickLinkItem activeQuickLink quickLinkIcon`,
    };
    
  }());
  