  (function(){
    
    let fonts = [
      'minstrels.ttf',
      'Closeness-Bold.ttf',
      'pdark.ttf',
      'prototype.ttf',
      'blackjack.otf',
      'stormfaze.ttf',
      'crashed_scoreboard.ttf',
      'MING____.ttf',
      'amita-regular.ttf',
      'BebasNeue-webfont.woff',
    ];
    
    let printFont = '',
    font_obj = {},
    fontNameArr = [];
    
    for (let i = 0; i < fonts.length; i++){
      let fnt = fonts[i].split('.')[0];
      let ff = `
        @font-face{
          font-family: "${fnt}";
          src: url("css/fonts/${fonts[i]}")
        }
      `;
      fontNameArr[fonts.length-i]=fnt;
      font_obj[fnt] = ff;
      printFont += ff;
    }
    
    function fontCss(){
      return printFont;
    }
    
    function fontName(n){
      if(typeof n == 'number'){
        return font_obj[$$.keys(font_obj)[n]];
      }
      else{
        if(fontNames.hasOwnProperty(n)){
          return fontNames[n];
        }
      }
    }
    
    fc.fontCss = fontCss;
    fc.fontName = fontNameArr;
    fc.fontObj = font_obj;
  }());