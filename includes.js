  (function (){
    let lib = 'mirror crypto-js jq.transit.min',
    css = 'font style';
    
    let scripts = `${lib.group('lib/')} iconic ${ css.group('css/') }`;
    fc.INCLUDES_SCRIPT = fc.include( scripts );
  }());