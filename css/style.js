  (function (){
    
    let k_css = css(),
    c = '',
    colr1 = fc.colorA,
    colr2 = fc.colorB,
    
    fc_Style = function (id, media){
      return `
        *{
          box-sizing: border-box;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
          ${k_css.disabledSelection}
        }
        
        *::-webkit-scrollbar {
          display: none 
        }
        
        html,body{
          width: 100%;
          height: 100%;
          background:url('img/bg3.png');
        }
        
        h1,h2,h3,h4,h5,h6,ul,li,p,body{
          padding: 0;
          margin: 0;
        }
        
        a,input,button,textarea{
          outline: none;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        svg{
          opacity: 1.0;
          width: 22px;
          height: 22px
        }
        
        .transition{
          ${k_css.transition}
        }
        
        #${id.headerWrapper}{
          position:fixed;
          top:0;
          width:100%;
          height: 86px;
          border-bottom: 1px solid #a1a1a1;
          box-shadow: 0 3px 4px 1px rgba(0,0,0,0.5);
          padding-bottom:2px;
          background-image:-webkit-linear-gradient(#2a5934,#016773);
          background: #204056;
          z-index:5;
        }
        
        #${id.headerBox}{
          display: flex;
          height: 45px;
        }
       
        #${id.brandingBox}{
          width:80%;
          text-align: center;
        }
        
        #${id.brandingText}{
          font-family: stormfaze;
          font-weight: lighter;
          font-size: 36px;
          letter-spacing: 2px;
          color:#bff199;
          color:#9dbc7a;
          margin-top:3px;
          text-shadow: 0 4px 3px rgba(0,0,0,0.8);
        }
        
        #${id.menuIconBox}, #${id.searchBox} {
          width:10%;
          text-align: center;
        }
        
        #${id.searchInput}{
          display: none
        }
        
        .${id.menuIcon}, .${id._menuIconOpen}, .${id.searchIcon}{
          fill:#9dbc7a;
          margin-top:9px;
          width:28px;
          height:28px;
          padding:1px;
          border:1px solid #9dbc7a;
          border-radius:8px;
        }
        
        .${id.menuIcon}{
          margin-left: 8px;
        }
        
        .${id._menuIconOpen}{
          fill: #f3f3f3;
          margin-left: 12px;
          border-radius: 50%;
          width:33px;
          height:33px;
          box-shadow: 0 1px 3px 1px #fff;
          background: #ad0000
        }
        
        .${id.searchIcon}{
          margin-right: 6px;
        }
        
        #${id.quickLinkWrapper}{
          height: 35px;
          background: #016773;
          margin-top:5px;
          white-space: nowrap;
          overflow:scroll;
          text-align: left;
        }
        
        .${id.quickLinkItem}{
          margin:3px 10px;
          padding:0 1px;
          text-align: center;
        }
        
        .${id.quickLinkItem}:nth-child(even){
          margin:0 0.003em;
        }
        
        .${id.quickLinkIcon}{
          fill: #dddddd;
          width: 20px;
          height: 20px;
          margin-top: 7px;
        }
        
        .${id.activeQuickLink}{
          width: 25px;
          height: 25px;
         xborder: 1px solid #00ff00;
          border-radius: 7px;
          margin-top: 4px;
          fill:#00ff00;
          box-shadow: 0 1px 3px 1px #dddddd
        }
        
        #${id.menuWrapper}{
          position: fixed;
          top:0;
          z-index: 0;
          padding-right: 3.4em;
          width:100%;
          height: 100%;
          background: #275256;
          display:none
        }
        
        #${id.fixedMenuWrapper}{
          text-align:center;
          width:100%;
          padding-top:8px;
          height:86px;
          white-space: nowrap;
          overflow: scroll;
          background: #275256;
          box-shadow: 0 3px 4px 1px ${fc.rgba('bff199',0.4)};
          border-bottom: 1px solid #a1a1a1;
          ${k_css.middle}
        }
        
        .${id.fixedMenuIcon}{
          width:32px;
          height:32px;
          background:#86f60d;
          margin-top: 4px;
          margin-bottom: 14px;
          border-radius:8px;
          padding:2px;
          fill:#5b5566;
          box-shadow: 0 3px 4px 1px #888
        }
        
       .${id.fixedMenuText}{
          color: #86f60d;
          font-size: 17px;
          font-weight: lighter;
          font-family: '${fc.fontName[1]}';
          letter-spacing: 1.1px;
        }
        
        .${id.fixedMenuItem}{
          display:inline-block;
          transition:0.6s;
          -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .${id.fixedMenuItem}:hover{
          -webkit-transform:scale(.70);
        }
        
        .${id.fixedMenuItem}:nth-child(even){
          margin:0 5px
        }
        
        .${id.fixedMenuItem} > span{
          display:block;
        }
        
        .${id.fixedMenuItem} > span:nth-child(2){
          padding:2px 8px;
          margin-top:-6px;
        }
        
        /* use with javascript */
        .${id._translate}{
         transform:translateX(85%);
        }
        
        .${id._menuOpen} {
          box-shadow:-2px 0 5px 3px rgba(0,0,0,0.5);
        }
        
          .${id._menuOpenBG}{
          background: #275256;
        }
        .flex{ display: flex }
        .fixed{ position: fixed }
        .hide{display:none}
        .show{display:block}
        
        #${id.main}{
          width: 100%;
          padding: 16px;
          padding-top: ${fc.setting.header == false ? 0 : '6.5em'};
          
        }
        
        /*
        #${id.main} > *:first-child{
          margin-top: 2em;
        }
        */
        
        #${id.noContent}{
          width: 100%;
          height: 380px;
          padding: 12px;
          color: red;
          ${k_css.middle}
        }
        
        .article{
          border-radius: 14px;
          background:#ccc;
          margin: 14px;
          padding:8px;
          font-size:16px;
          word-break: break-all;
        }
        
        #${id.footerWrapper}{
          width: 100%;
          padding-top: 3em;
          padding-bottom: 1.2em;
          background: #7823da;
          background:url('img/alper-guzeler-cCtedNjoSuY-unsplash.jpg');
          background-position: center;
          background-repeat: no-repeat; 
          background-size: cover; 
        }
        
        
        
        ${$$.cssMedia.tablet(`
          #${id.main}{
            //padding: 3em
          }
          
        `)}
      `;
    };/*fc_Style style end.*/
    
    function css(){
      return {
        middle: `
          display: flex;
          align-items: center;
          justify-content: center;
        `,
        
        disabledSelection : `
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        `,
        
        transition : `
          -webkit-transition: all 0.6s;
          -o-transition: all 0.6s;
          -moz-transition: all 0.6s;
          transition: all 0.6s
        `
      };
    }
    
    const styles = function (currentPageCss, id){
      const media = $$.cssMedia,
      css = `
        ${fc_Style(id, media)}
        ${currentPageCss || ''}
        ${fc.fontCss()}
      `;
      
       $$.each(id, (k, v) => {
        if(v == undefined || v =='undefined'){
          alert(`${k} is not set as element id`)
          
        }
    })
     
      
      return css;
    };
    
    
    fc.styles = styles;
    fc.stringCss = css();
  }());