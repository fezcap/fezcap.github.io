  (function (){
    
    function main(id){
      let f =''
      $$.each('0-100', i =>{
        f+= `<div>${ $$.guid(true) }</div>`
      })
      return `
        <h1>fexcap HOM TESTING LINK</h1>
        <br>
        <a ${fc.setTrigger({url:'test.fc', on:'href'})}>text link</a>
        <center> ${f} </center>
      `;
    }
    
    
    
    function script(){ }
    function css(){ }
    
    
    fc.buildPage.main = {
      body: main,
      
      script: script,
      css: css,
      
      extScript: [],
      extCss: [],
      
      header: true,
      footer: true,
      
      quickLink: 'home',
      
      description: '',
      title: 'hom',
      
      elemId: 'm '
      
    };
  }());