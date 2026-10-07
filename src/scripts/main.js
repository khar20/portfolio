/* Clock */
function tick(){
  const d=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Lima'}));
  const p=x=>String(x).padStart(2,'0');
  const el=document.getElementById('sb-clk');
  if(el) el.textContent=`${p(d.getHours())}:${p(d.getMinutes())}`;
}
tick(); setInterval(tick,30000);

/* Custom cursor */
if(window.matchMedia('(pointer:fine)').matches){
  const cur=document.getElementById('cur');
  const body=document.body;
  document.addEventListener('mousemove',e=>{
    cur.style.left=e.clientX+'px';
    cur.style.top=e.clientY+'px';
  },{passive:true});

  const CLK='a,button,[onclick],.pl-link,.sbh-a,.sb-a,.ci-link,.cf-btn,.etab,.soc';
  const HOV='.pl-item,.sk-item,.sk-row,.award-item,.lang,.hb-label';
  document.addEventListener('mouseover',e=>{
    const isClk=e.target.closest(CLK);
    body.classList.toggle('cur-link',!!isClk);
    body.classList.toggle('cur-hov',!isClk&&!!e.target.closest(HOV));
  });
  document.querySelectorAll('input,textarea,select').forEach(el=>{
    el.addEventListener('mouseenter',()=>body.classList.add('cur-text'));
    el.addEventListener('mouseleave',()=>body.classList.remove('cur-text'));
  });

  document.addEventListener('mousedown',()=>{
    body.classList.add('cur-click');
    cur.style.animation='none';
    requestAnimationFrame(()=>{cur.style.animation='spinOnce .3s ease'});
  });
  document.addEventListener('mouseup',()=>body.classList.remove('cur-click'));
  document.addEventListener('mouseleave',()=>cur.style.opacity='0');
  document.addEventListener('mouseenter',()=>cur.style.opacity='');
}

/* Elements */
const mainEl=document.getElementById('main');
const progEl=document.getElementById('prog');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Sidebar reveal */
new IntersectionObserver(([e])=>{
  document.body.classList.toggle('scrolled',!e.isIntersecting);
},{root:mainEl,threshold:0.05}).observe(document.getElementById('hero'));

/* Section reveal */
const secObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('vis'); secObs.unobserve(e.target); }
  });
},{root:mainEl,threshold:.08});
document.querySelectorAll('.sec').forEach(s=>secObs.observe(s));

/* Scroll progress + active nav */
const SECS=['projects','experience','skills','contact'];
const navLinks=document.querySelectorAll('[data-sec]');
let raf=null;

function onScroll(){
  const h=mainEl.scrollHeight-mainEl.clientHeight;
  progEl.style.transform=`scaleX(${h>0?mainEl.scrollTop/h:0})`;

  let active='';
  const probe=mainEl.scrollTop+160;
  SECS.forEach(id=>{
    const el=document.getElementById(id);
    if(el && probe>=el.offsetTop) active=id;
  });
  navLinks.forEach(el=>el.classList.toggle('active',el.dataset.sec===active));
}
mainEl.addEventListener('scroll',()=>{
  if(raf) return;
  raf=requestAnimationFrame(()=>{ onScroll(); raf=null; });
},{passive:true});
onScroll();

/* Smooth anchor navigation */
function goTo(id){
  const t=document.getElementById(id);
  if(!t) return;
  mainEl.scrollTo({top:t.offsetTop, behavior: reduce?'auto':'smooth'});
}
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(href==='#'){ e.preventDefault(); return; }
    const id=href.slice(1);
    const t=document.getElementById(id);
    if(t){ e.preventDefault(); goTo(id); }
  });
});
document.getElementById('toTop').addEventListener('click',()=>{
  mainEl.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
});

/* Experience tabs */
document.querySelectorAll('.etab').forEach(t=>{
  t.addEventListener('click',()=>{
    document.querySelectorAll('.etab').forEach(x=>{
      x.classList.remove('active');
      x.setAttribute('aria-selected','false');
    });
    t.classList.add('active');
    t.setAttribute('aria-selected','true');
    const tab=t.dataset.tab;
    const work=document.getElementById('body-work');
    const edu=document.getElementById('body-edu');
    work.style.display = tab==='work' ? 'block' : 'none';
    edu.style.display  = tab==='edu'  ? 'block' : 'none';
    const shown = tab==='work' ? work : edu;
    shown.style.animation='none';
    requestAnimationFrame(()=>{
      shown.style.animation='fadeUp .4s cubic-bezier(.22,1,.36,1) both';
    });
  });
});

/* Theme */
function toggleTheme(){
  const next=document.documentElement.dataset.theme==='dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme=next;
  try{ localStorage.setItem('theme',next); }catch(e){}
}
['themeBtn','themeBtnSb','themeBtnMob'].forEach(id=>{
  document.getElementById(id)?.addEventListener('click',toggleTheme);
});

/* Language switcher (navigates to the alternate locale) */
document.querySelectorAll('.lang-sel').forEach(sel=>{
  sel.addEventListener('change',()=>{ location.href=sel.value; });
});

/* Contact form */
const form=document.getElementById('contactForm');
let msgs={};
try{ msgs=JSON.parse(form.dataset.msgs||'{}'); }catch(e){}
form.addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('cfName');
  const email=document.getElementById('cfEmail');
  const msg=document.getElementById('cfMsg');
  const btn=form.querySelector('.cf-btn');

  let ok=true;
  [name,email,msg].forEach(f=>{
    const invalid = !f.value.trim() || (f.type==='email' && !/^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle('err',invalid);
    if(invalid) ok=false;
  });
  if(!ok){
    const orig=btn.innerHTML;
    btn.textContent=msgs.checkFields||'';
    btn.style.borderColor='var(--ora)';
    btn.style.color='var(--ora)';
    setTimeout(()=>{ btn.style.cssText=''; btn.innerHTML=orig; },1900);
    return;
  }

  const orig = btn.innerHTML;
  btn.textContent = msgs.sending||'';
  btn.disabled=true;
  setTimeout(()=>{
    btn.textContent = msgs.sent||'';
    btn.style.borderColor='var(--teal)';
    btn.style.color='var(--teal)';
    form.reset();
    setTimeout(()=>{
      btn.innerHTML=orig;
      btn.disabled=false;
      btn.style.cssText='';
    },2600);
  },1100);
});
form.querySelectorAll('.cf-i').forEach(f=>{
  f.addEventListener('input',()=>f.classList.remove('err'));
});