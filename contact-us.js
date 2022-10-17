  (function (){
    
    function pageDone(id, setting){
      submitMail(id);
    }
    
    function onTriggerCallback(event, selector, option, elemId, pageSetting){
      contact = {
        sms: function (){
          input = $(`#${elemId.smsText}`);
          txt = input.val();
          if(txt.trim().length == 0){
            alert('empty field');
            return;
          }
          let a = document.createElement('a');
          a.href = 'sms:+2347039894774?&body=testing';
          a.click();
          document.body.appendChild(a);
        },
        
        call:  function(){
          let a = document.createElement('a');
          a.href = 'tel:+2347039894774';
          a.click();
          document.body.appendChild(a);
        },
        
        whatsapp: function(){
          input = $(`#${elemId.whatsappMsg}`);
          txt = input.val();
          if(txt.trim().length == 0){
            alert('empty field');
            return;
          }
          try{
            window.open(`http://wa.me/+2347039894774?text=${txt}`, "_blank").focus();
          }catch(err){
            window.location.assign(`http://wa.me/+2347039894774?text=${txt}`, "_blank");
          }
        },
        facebook: x => {}
        
      }[option.param]();
    }
    
    function submitMail(id){
      let form = document.getElementById(id.mailForm);
      async function handleSubmit(event) {
        event.preventDefault();
        let status = document.getElementById(id.formStatus),
        data = new FormData(event.target);
        
        for( let [k, v] of data){
          if(v.trim().length == 0){
            status.innerHTML = `<p id="${id.formSubmitFail}"><strong style="color:#a00">${k.title()}</strong> input field is empty`;
            return;
          }
        }
        
        
        fetch(event.target.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          if(response.ok){
            status.innerHTML = '<p id="${id.formSubmitDone}">Successful! Thanks 👍</p>';
            form.reset()
          }else {
            response.json().then(data => {
              if(Object.hasOwn(data, 'errors')){
                status.innerHTML = `<p id="${id.formSubmitFail}">${ data["errors"].map(error => error["message"]).join(", ")}</p>`;
              } else {
                status.innerHTML = `<p id="${id.formSubmitFail}">Oops! There was a problem submitting your form</p>`;
              }
            });
          }
        }).catch(error => {
          status.innerHTML = `<p id="${id.formSubmitFail}">Oops! There was a problem submitting your form</p>`;
        });
      }
      form.addEventListener("submit", handleSubmit);
    }
    
    
    function body(id){
      return `
        <!--
         <a href="https://msng.link/o/?Text=fm">Message me on Facebook Messenger</a>
        -->
        
        <div id="${id.contact_us}">
          <img class="${id.contactUsImg}" src="img/contact_us.jpg" />
          <p> We're available in a number of ways, any time you need us. Use one of these contact method to reach us any time. We Love 💕💕 you</p>
        </div>
        
        <div class="${id.contactFormWraper}">
          <div class="${id.formTitle}">
            <h2>📞 give us a call</h2>
          </div>
          <div class="${id.contactForm}">
            <div>
              <div> our mobile number </div>
              <input type="number" placeholder="+2347039894774" disabled></textarea>
            </div>
            <div>
              <button ${fc.setTrigger({param: 'call', on:'callback'})} >Send Call Now</button>
            </div>
          </div>
        </div>
        
        <div class="${id.contactFormWraper}">
          <div class="${id.formTitle}">
            <h2>✉️ whatsapp us</h2>
          </div>
          <div class="${id.contactForm}">
            <div>
              <div>message</div>
              <textarea id="${id.whatsappMsg}" placeholder="Whatsapp us"></textarea>
            </div>
            <div>
              <button ${fc.setTrigger({param: 'whatsapp', on:'callback'})} >Send Message</button>
            </div>
          </div>
        </div>
        
        <div class="${id.contactFormWraper}">
          <div class="${id.formTitle}">
            <h2>✉️ send us SMS</h2>
          </div>
          <div class="${id.contactForm}">
            <div>
              <div>message</div>
              <textarea id="${id.smsText}" placeholder="SMS us"></textarea>
            </div>
            <div>
              <button ${fc.setTrigger({param: 'sms', on:'callback'})} >send message</button>
            </div>
          </div>
        </div>
        
        <div class="${id.contactFormWraper}">
          <div class="${id.formTitle}">
            <h2>✉️ send us email</h2>
          </div>
          <div id="${id.formStatus}"></div>
          <form id="${id.mailForm}" class="${id.contactForm}" action="https://formspree.io/f/xnqrzgkw" method="POST">
            <div>
              <div>Name:</div>
              <input type="text" name="name" placeholder="Your name" />
            </div>
            <div>
              <div>Email:</div>
              <input type="email" name="email" placeholder="example@gmail.com" />
            </div>
            <div>
              <div>Message:</div>
              <textarea name="message" placeholder="mail 💌 us"></textarea>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      `;
    }
    
    function css(id){
      return`
        .${id.contactUsImg}{
          width:100%;
          height:188px
        }
        
        #${id.contact_us}{
          margin-bottom:16px;
          margin-top: 0;
          text-align: center;
        }
        
        #${id.contact_us} p{
          padding: 14px 14px;
          padding-bottom: 0px;
          font-size: 20px;
          letter-spacing: 1.5px;
          font-family: amita-regular;
          text-transform: capitalize;
          color: #204056;
          text-align: center
        }
        
        .${id.contactFormWraper}{
          margin: 6px 0 3em 0;
          box-shadow: 2px 4px 6px #333;
          border: 1px solid #333;
        }
        
        .${id.formTitle} {
          border-bottom: 2px solid #ffc600;
          background: #016773;
          text-align: center;
          margin-bottom: 6px;
          padding: 5px;
          margin-bottom: 16px;
          box-shadow: 0 4px 5px #333;
          border-radius: 0 0 80px 80px
        }
        
        .${id.formTitle} h2 {
          color: #ffc600; 
          font-family: BebasNeue-webfont;
          font-size: 26px;
          font-weigth: lighter;
          letter-spacing: 1.8px;
          text-transform: capitalize;
          padding: 8px 0
        }
        
        .${id.contactForm} > div{
          background: #dddddd;
          padding: 8px;
          margin: 16px;
          text-align: center
        }
        
        .${id.contactForm} > div > div{
          color: #204056;
          margin: 6px 5px;
          font-size: 19px;
          text-transform: capitalize
        }
        
        .${id.contactForm} > div > textarea,
        .${id.contactForm} > div > input{
          padding: 10px;
          font-size: 18px;
          color: #016773;
          border: 1px solid #016773;
        }
        
        .${id.contactForm} > div > button{
          padding: 10px;
          background: #204056;
          color: #ffc600;
          border: 0;
          box-shadow: 0 2px 6px #ffc600;
          border-radius: 20px;
          font-size:18px;
          font-family: prototype;
          letter-spacing: 1.5px;
          text-transform: capitalize
        }
        
        #${id.formStatus}{
          text-align: center;
        }
        
        #${id.formSubmitFail}{
          padding: 10px;
          color: red
        }
        
        #${id.formSubmitDone}{
          padding: 10px;
          font-size: 19px;
          color: #006800
        }
        
        ${$$.cssMedia.tablet(`
          .${id.contactFormWraper}{
            margin: 6px 2.2em 3em 2.2em;
          }
          
          #${id.contact_us} p{
            padding: 12px 4.5em;
            font-size: 24px
          }
          
          .${id.contactUsImg}{
            width:95%;
            height:300px
          }
          
        `)}
      `;
    }
    
    fc.buildPage.main = {
      body: body,
      done: pageDone,
      onTriggerCallback: onTriggerCallback,
      css: css,
      quickLink: 'contactUs',
      title: 'Contact Us',
      elemId: 'mailForm contactUsImg smsText whatsappMsg contact_us formSubmitFail formSubmitDone contactFormWraper formStatus contactForm formTitle'
    };
  }());