  (function (){
    
    function footer(id){
     let f =''
      $$.each('0-50', i =>{
        f+= `<div>${ $$.guid(true) }</div>`
      })
     
      return `
        <div id="${id.footerWrapper}">
          <h2>footer</h2>
            <center>  </center
        </div>
      `;
    }
    
    fc.buildPage.footer = {
      elemId: 'footerWrapper k',
      body: footer
    };
    
  }());