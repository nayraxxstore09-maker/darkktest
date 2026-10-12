const b=document.querySelector('.menu-btn'),n=document.querySelector('.nav');
if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});}

/* Quote / inspection forms.
   If FORM_ENDPOINT is set (for example a Formspree URL), forms are sent there.
   Otherwise the form opens a text message to the business with the details filled in. */
const FORM_ENDPOINT="";
const SMS_NUMBER="+13257700900";
document.querySelectorAll('form.jf').forEach(f=>{
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    const st=f.querySelector('.form-status');
    st.className='form-status';
    let ok=true;
    f.querySelectorAll('[required]').forEach(i=>{const bad=!i.value.trim();i.classList.toggle('invalid',bad);if(bad)ok=false;});
    if(!ok){st.textContent='Please fill in your name and phone number.';st.classList.add('err');return;}
    const lines=[f.dataset.kind+' - JMJ Roofing website'];
    new FormData(f).forEach((v,k)=>{if(String(v).trim())lines.push(k+': '+String(v).trim());});
    const text=lines.join('\n');
    if(FORM_ENDPOINT){
      try{
        const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))});
        if(!r.ok)throw 0;
        st.textContent='Thank you. We got your request and will call you soon.';f.reset();
      }catch(_){st.textContent='Something went wrong. Please call (325) 770-0900.';st.classList.add('err');}
      return;
    }
    st.textContent='Opening your messages app. Tap send to finish. Or call (325) 770-0900.';
    window.location.href='sms:'+SMS_NUMBER+'?body='+encodeURIComponent(text);
  });
});