  (function (){
    
    function body(id){
      return `
        
      `;
    }
    
    
    
    function css(){ }
    
    
    fc.buildPage.main = {
      body: body,
      
      css: css, //return string csss
      
      extScript: [],
      extCss: [],
      
      done: fnc, // call when page successfully load
      onTriggerCallback, // function; work with fc.setTrigger({on:'callback',  call:' alternative function'})
      
      onHrefTrigger, //function: call when link is trigger
      
      header: true,
      footer: true,
      
      quickLink: 'home',
      
      description: '',
      title: 'home',
      
      elemId: 'm '
      
    };
    
    /*
      to set link use this method
        fc.setTrigger({on: 'href', url: 'url', reload: Boolean})
        parameters:
          > on = href // this is what makes the selected element link 🔗.
          > url = location 
            if url ends with .fc it means that the link is files it self.
            if url not ends with .fc it means that the link is folder and must have index.js file in the folder.
          > reload = false // means load the contents of the selected page without reload the entire page
          > reload = true default // will reload the entire page
      stop

      general
      
      fc.setTrigger({on:'callback'})
          this method will looks for 
      onTriggerCallback = function.
      and onTriggerCallback must defined on
     fc.buildPage.main={
       onTriggerCallback:(l) =>{}
     }
     
      fc.setTrigger({on:'callback', src:'', call: 'targetFunctionName'})
          this method will looks for 
      targetFunctionName = function.
     
      and targetFunctionName must defined on
     fc.buildPage.main={
       targetFunctionName:(event, data, selector, elemId, setting) =>{}
     }
     
     and lots of properties and value can be defined.
     method not accepted
     
     to access other properties use 
       data argument to get
        > this is also available
       argument:5
        > event: object event
        > data: is object. get all property set in  setTrigger({})
        > selector: current selected element in jQuery
        > elemId: is all element id or class defined on the current page // is object base
        > setting: is object. get all setting on the current page
    */
  }());