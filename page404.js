  (function (){
    
    function main($this){
      let id = fc.generateGuid(this.elemId),
      not_found = notFound($this, id);
      $('title').html(`${fc.name} »» ${this.title}`);
      $$.injectCss(css(id, $this));
      $(`#${fc.rootId}`).html(not_found);
      fc.trigger(null, id);
    }
    
    function notFound($this, id){
      return `
        <br>
        <br>
        <a ${fc.setTrigger({on: 'href', url: 'home.fc'})} >Home</a>
        <br>
        <br>
        ${$this.url}  not found
      `;
    }
    
    function css(id, _){
      return `
        
      `;
    }
    
    fc.buildPage.page404 = {
      body: main,
      title: 'not found 404',
      elemId: 'm h'
    };
    
  }());