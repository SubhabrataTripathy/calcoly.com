/* Calcoly widget router — loaded on tool pages */
(function(){
'use strict';
var fmt = window.Calcoly ? window.Calcoly.fmt : function(n,d){if(!isFinite(n))return '—';return Number(n.toFixed(d||4)).toLocaleString('en-US',{maximumFractionDigits:d||4});};
var bc = window.Calcoly ? window.Calcoly.bindCopy : function(){};

/* ---- CONVERTER ---- */
var cv = document.querySelector('.cv');
if(cv && cv.dataset.type==='convert'){
  var ia=document.getElementById('cv-a'), ib=document.getElementById('cv-b'), rr=document.getElementById('cv-result'),
      ua=cv.dataset.ua, ub=cv.dataset.ub, dec=+cv.dataset.dec, lock=false;
  function a2b(){
    if(lock)return; lock=true;
    var v=parseFloat(ia.value.replace(',','.')); var r;
    if(cv.dataset.mode==='c2f') r=v*9/5+32;
    else if(cv.dataset.mode==='f2c') r=(v-32)*5/9;
    else r=v*parseFloat(cv.dataset.factor);
    ib.value=isFinite(v)?fmt(r,dec):'';
    rr.textContent=isFinite(v)?ib.value+' '+ub:'—';
    lock=false;
  }
  function b2a(){
    if(lock)return; lock=true;
    var v=parseFloat(ib.value.replace(',','.')); var r;
    if(cv.dataset.mode==='c2f') r=(v-32)*5/9;
    else if(cv.dataset.mode==='f2c') r=v*9/5+32;
    else{ var f=parseFloat(cv.dataset.factor); r=f?v/f:0; }
    ia.value=isFinite(v)?fmt(r,dec):'';
    rr.textContent=isFinite(v)?ia.value+' '+ua:'—';
    lock=false;
  }
  if(ia && ib){
    ia.addEventListener('input',a2b); ib.addEventListener('input',b2a);
    var sw=document.getElementById('cv-swap');
    if(sw) sw.addEventListener('click',function(){
      var mid=parseFloat(ib.value.replace(',','.'))||0;
      ia.value=fmt(mid,dec); a2b(); ia.focus();
    });
    var cp=document.getElementById('cv-copy');
    if(cp) bc(cp,function(){ return (ib.value||'')+' '+ub; });
    a2b();
  }
}

/* ---- TAB HELPER ---- */
function tabs(attr,cb){
  var btns=document.querySelectorAll('[data-'+attr+']');
  btns.forEach(function(b){
    b.addEventListener('click',function(){
      btns.forEach(function(x){x.removeAttribute('aria-selected');});
      b.setAttribute('aria-selected','true');
      cb(b.getAttribute('data-'+attr));
    });
  });
}

/* ---- PERCENTAGE ---- */
(function(){
  if(!document.querySelector('[data-pt]'))return;
  tabs('pt',function(m){
    ['pctof','pctis','pctchg'].forEach(function(k){
      var el=document.getElementById('pm-'+k);
      if(el) el.style.display=k===m?'':'none';
    });
    calcPct();
  });
  var ids=['pa','pb','pc','pd','pe','pf'];
  ids.forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calcPct); });
  function calcPct(){
    var pa=document.getElementById('pa'), pb=document.getElementById('pb');
    if(pa && pb){
      var a=+pa.value, b=+pb.value;
      var r1=fmt(a/100*b,4);
      document.getElementById('pr1').textContent=r1;
      document.getElementById('pf1').textContent=a+'% of '+b+' = '+r1;
    }
    var pc=document.getElementById('pc'), pd=document.getElementById('pd');
    if(pc && pd){
      var c=+pc.value, d=+pd.value;
      var r2=d?fmt(c/d*100,2)+'%':'—';
      document.getElementById('pr2').textContent=r2;
      document.getElementById('pf2').textContent=c+' is '+(d?fmt(c/d*100,2):'?')+'% of '+d;
    }
    var pe=document.getElementById('pe'), pf=document.getElementById('pf');
    if(pe && pf){
      var e=+pe.value, f=+pf.value;
      var chg=e?fmt((f-e)/Math.abs(e)*100,2):'—';
      document.getElementById('pr3').textContent=(f>=e?'+':'')+chg+'%';
      document.getElementById('pf3').textContent='Change from '+e+' to '+f+' = '+(chg);
    }
  }
  calcPct();
  ['pc1','pc2','pc3'].forEach(function(id){
    var el=document.getElementById(id);
    if(el) bc(el,function(){ return document.getElementById('pf'+id[2]).textContent; });
  });
})();

/* ---- PERCENTAGE INCREASE ---- */
(function(){
  var o=document.getElementById('pi-old'), n=document.getElementById('pi-new'), r=document.getElementById('pir'), c=document.getElementById('pic');
  if(!o || !n) return;
  function calc(){
    var oldV=+o.value, newV=+n.value;
    if(!oldV){ r.textContent='—'; return; }
    var inc=((newV-oldV)/Math.abs(oldV))*100;
    r.textContent=(inc>=0?'+':'')+fmt(inc,2)+'%';
  }
  o.addEventListener('input',calc); n.addEventListener('input',calc); calc();
  if(c) bc(c,function(){ return 'Percentage Increase: '+r.textContent; });
})();

/* ---- PERCENTAGE DECREASE ---- */
(function(){
  var o=document.getElementById('pd-old'), n=document.getElementById('pd-new'), r=document.getElementById('pdr'), c=document.getElementById('pdc');
  if(!o || !n) return;
  function calc(){
    var oldV=+o.value, newV=+n.value;
    if(!oldV){ r.textContent='—'; return; }
    var dec=((oldV-newV)/Math.abs(oldV))*100;
    r.textContent='-'+fmt(dec,2)+'%';
  }
  o.addEventListener('input',calc); n.addEventListener('input',calc); calc();
  if(c) bc(c,function(){ return 'Percentage Decrease: '+r.textContent; });
})();

/* ---- BMI ---- */
(function(){
  if(!document.querySelector('[data-bt]'))return;
  var mh=document.getElementById('bmf-h'), mw=document.getElementById('bmf-w');
  tabs('bt',function(m){
    if(m==='metric'){
      mh.querySelector('label').textContent='Height (cm)';
      mw.querySelector('label').textContent='Weight (kg)';
      mh.querySelector('input').value='175';
      mw.querySelector('input').value='70';
    } else {
      mh.querySelector('label').textContent='Height (inches)';
      mw.querySelector('label').textContent='Weight (lbs)';
      mh.querySelector('input').value='69';
      mw.querySelector('input').value='154';
    }
    calcBMI();
  });
  function calcBMI(){
    var m=document.querySelector('[data-bt][aria-selected]'), imp=m&&m.dataset.bt==='imperial';
    var h=+(document.getElementById('bh').value), w=+(document.getElementById('bw').value);
    var bmi;
    if(imp) bmi=703*w/(h*h);
    else bmi=w/((h/100)*(h/100));
    if(!isFinite(bmi)||h<=0||w<=0){
      document.getElementById('br').textContent='—';
      document.getElementById('bc2').textContent='';
      return;
    }
    document.getElementById('br').textContent=fmt(bmi,2);
    var cat=bmi<18.5?'Underweight':bmi<25?'Normal weight':bmi<30?'Overweight':'Obese';
    document.getElementById('bc2').textContent='WHO category: '+cat+' (BMI is a screening tool, not a medical diagnosis).';
  }
  document.getElementById('bh').addEventListener('input',calcBMI);
  document.getElementById('bw').addEventListener('input',calcBMI);
  bc(document.getElementById('bc'),function(){ return 'BMI: '+document.getElementById('br').textContent; });
  calcBMI();
})();

/* ---- AGE ---- */
(function(){
  if(!document.getElementById('adob'))return;
  function calc(){
    var dob=new Date(document.getElementById('adob').value+'T00:00:00');
    if(isNaN(dob)){ document.getElementById('ar').textContent='—'; return; }
    var now=new Date(), y=now.getFullYear()-dob.getFullYear(), m=now.getMonth()-dob.getMonth(), d=now.getDate()-dob.getDate();
    if(d<0){ m--; d+=new Date(now.getFullYear(),now.getMonth(),0).getDate(); }
    if(m<0){ y--; m+=12; }
    var totalDays=Math.floor((now-dob)/864e5);
    var totalMonths=y*12+m;
    document.getElementById('ar').textContent=y+' years, '+m+' months, '+d+' days';
    document.getElementById('arm').textContent=fmt(totalMonths,0);
    document.getElementById('ard').textContent=fmt(totalDays,0);
    var ny=new Date(now.getFullYear(),dob.getMonth(),dob.getDate());
    if(ny<=now) ny.setFullYear(ny.getFullYear()+1);
    var diff=Math.ceil((ny-now)/864e5);
    document.getElementById('arb').textContent=diff+' day'+(diff!==1?'s':'');
  }
  document.getElementById('adob').addEventListener('input',calc); calc();
  bc(document.getElementById('ac'),function(){ return document.getElementById('ar').textContent; });
})();

/* ---- DATE CALC ---- */
(function(){
  if(!document.querySelector('[data-dt]'))return;
  tabs('dt',function(m){
    document.getElementById('dm-diff').style.display=m==='diff'?'':'none';
    document.getElementById('dm-add').style.display=m==='add'?'':'none';
    calcDiff(); calcAdd();
  });
  function calcDiff(){
    var a=new Date(document.getElementById('ds1').value+'T00:00:00'), b=new Date(document.getElementById('ds2').value+'T00:00:00');
    if(isNaN(a)||isNaN(b)){ document.getElementById('dr').textContent='—'; return; }
    var days=Math.round((b-a)/864e5);
    var abs=Math.abs(days);
    var y=Math.floor(abs/365), rem=abs%365;
    var w=Math.floor(rem/7), d=rem%7;
    document.getElementById('dr').textContent=(days<0?'−':'')+fmt(abs,0)+' days';
    document.getElementById('dsr').innerHTML=
      '<div class="subresult"><div class="k">Weeks</div><div class="v tabular-nums">'+fmt(Math.floor(abs/7),0)+'</div></div>'+
      '<div class="subresult"><div class="k">Months</div><div class="v tabular-nums">~'+fmt(Math.round(abs/30.44),0)+'</div></div>'+
      '<div class="subresult"><div class="k">Breakdown</div><div class="v tabular-nums">'+y+'y '+w+'w '+d+'d</div></div>';
  }
  function calcAdd(){
    var a=new Date(document.getElementById('da1').value+'T00:00:00'), n=+document.getElementById('da2').value;
    if(isNaN(a)){ document.getElementById('dar').textContent='—'; return; }
    var r=new Date(a.getTime()+n*864e5);
    var ds=r.toISOString().split('T')[0];
    document.getElementById('dar').textContent=ds;
  }
  document.getElementById('ds1').addEventListener('input',calcDiff); document.getElementById('ds2').addEventListener('input',calcDiff);
  document.getElementById('da1').addEventListener('input',calcAdd); document.getElementById('da2').addEventListener('input',calcAdd);
  bc(document.getElementById('dac'),function(){ return document.getElementById('dar').textContent; });
  calcDiff(); calcAdd();
})();

/* ---- WORD COUNTER ---- */
(function(){
  if(!document.getElementById('wt'))return; var ta=document.getElementById('wt');
  function calc(){
    var t=ta.value;
    var w=t.trim()?t.trim().split(/\s+/).length:0;
    var c=t.length;
    var ns=t.replace(/\s/g,'').length;
    var s=t.split(/[.!?]+/).filter(Boolean).length;
    var p=t.split(/\n\n+/).filter(Boolean).length;
    var rm=Math.ceil(w/200);
    document.getElementById('waw').textContent=w;
    document.getElementById('wac').textContent=c;
    document.getElementById('wans').textContent=ns;
    document.getElementById('was').textContent=s;
    document.getElementById('wap').textContent=p||1;
    document.getElementById('war').textContent=rm+' min';
  }
  ta.addEventListener('input',calc); calc();
})();

/* ---- TIP ---- */
(function(){
  if(!document.getElementById('tb'))return;
  var bi=document.getElementById('tb'), ti=document.getElementById('tt'), ni=document.getElementById('tn');
  document.querySelectorAll('[data-v]').forEach(function(b){
    b.addEventListener('click',function(){ ti.value=b.dataset.v; calc(); });
  });
  function calc(){
    var bill=+bi.value, tip=+ti.value, n=Math.max(1,+ni.value);
    var tipAmt=bill*tip/100, total=bill+tipAmt, per=total/n;
    document.getElementById('tr').textContent='$'+fmt(per,2);
    document.getElementById('t1').textContent='$'+fmt(tipAmt,2);
    document.getElementById('t2').textContent='$'+fmt(total,2);
    document.getElementById('t3').textContent='$'+fmt(per,2);
  }
  bi.addEventListener('input',calc); ti.addEventListener('input',calc); ni.addEventListener('input',calc); calc();
  bc(document.getElementById('tc'),function(){ return document.getElementById('tr').textContent+' per person'; });
})();

/* ---- DISCOUNT ---- */
(function(){
  if(!document.getElementById('dd'))return;
  function calc(){
    var p=+document.getElementById('dd').value, d=+document.getElementById('dp').value;
    var save=p*d/100, sale=p-save;
    document.getElementById('dres').textContent='$'+fmt(sale,2);
    document.getElementById('d1').textContent='$'+fmt(save,2);
    document.getElementById('d2').textContent='$'+fmt(sale,2);
  }
  document.getElementById('dd').addEventListener('input',calc); document.getElementById('dp').addEventListener('input',calc); calc();
  bc(document.getElementById('dc'),function(){ return document.getElementById('d2').textContent; });
})();

/* ---- VAT ---- */
(function(){
  if(!document.querySelector('[data-vatm]'))return; var mode='add';
  tabs('vatm',function(m){
    mode=m;
    document.getElementById('vlab').textContent=m==='add'?'$':'$';
    calc();
  });
  document.querySelectorAll('[data-r]').forEach(function(b){
    b.addEventListener('click',function(){ document.getElementById('vr').value=b.dataset.r; calc(); });
  });
  function calc(){
    var a=+document.getElementById('va').value, r=+document.getElementById('vr').value/100;
    var net,gross,vat;
    if(mode==='add'){ net=a; vat=a*r; gross=a+vat; }
    else { gross=a; vat=a*r/(1+r); net=a-vat; }
    document.getElementById('vres').textContent='$'+fmt(gross,2);
    document.getElementById('v1').textContent='$'+fmt(net,2);
    document.getElementById('v2').textContent='$'+fmt(vat,2);
    document.getElementById('v3').textContent='$'+fmt(gross,2);
  }
  document.getElementById('va').addEventListener('input',calc); document.getElementById('vr').addEventListener('input',calc); calc();
  bc(document.getElementById('vc'),function(){ return document.getElementById('vres').textContent; });
})();

/* ---- CUPS/GRAMS ---- */
(function(){
  if(!document.getElementById('cgi'))return;
  var dirContainer=document.querySelector('[data-cg-dir]');
  var dir=dirContainer ? dirContainer.dataset.cgDir : 'c2g';
  function calc(){
    var g=+document.getElementById('cgi').value, v=+document.getElementById('cgv').value;
    var res;
    if(dir==='c2g') res=v*g; else res=v/g;
    var unit=dir==='c2g'?'g':'cups';
    document.getElementById('cgr').textContent=fmt(res,2)+' '+unit;
  }
  document.getElementById('cgi').addEventListener('change',calc);
  document.getElementById('cgv').addEventListener('input',calc); calc();
  bc(document.getElementById('cgc'),function(){ return document.getElementById('cgr').textContent; });
})();

/* ---- RECIPE SCALER ---- */
(function(){
  var orig=document.getElementById('rs-orig'), targ=document.getElementById('rs-targ'), r=document.getElementById('rsr'), c=document.getElementById('rsc');
  if(!orig || !targ) return;
  function calc(){
    var o=+orig.value, t=+targ.value;
    if(!o){ r.textContent='—'; return; }
    var mult=t/o;
    r.textContent=fmt(mult,2)+'x';
  }
  orig.addEventListener('input',calc); targ.addEventListener('input',calc); calc();
  if(c) bc(c,function(){ return 'Recipe Multiplier: '+r.textContent; });
})();

/* ---- FRACTION ---- */
(function(){
  if(!document.getElementById('fn1'))return;
  function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=b; b=a%b; a=t; } return a; }
  function calc(){
    var n1=+document.getElementById('fn1').value, d1=Math.max(1,+document.getElementById('fd1').value),
        op=document.getElementById('fo').value,
        n2=+document.getElementById('fn2').value, d2=Math.max(1,+document.getElementById('fd2').value);
    var rn,rd;
    if(op==='+'){ rn=n1*d2+n2*d1; rd=d1*d2; }
    else if(op==='-'){ rn=n1*d2-n2*d1; rd=d1*d2; }
    else if(op==='×'){ rn=n1*n2; rd=d1*d2; }
    else {
      if(n2===0){ document.getElementById('fr').textContent='Cannot divide by zero'; document.getElementById('fdec').textContent=''; return; }
      rn=n1*d2; rd=d1*n2;
    }
    var g=gcd(rn,rd); rn/=g; rd/=g;
    if(rd<0){ rn=-rn; rd=-rd; }
    var dec=rd!==0?(rn/rd).toFixed(4):'—';
    document.getElementById('fr').textContent=rn+'/'+rd;
    document.getElementById('fdec').textContent='Decimal equivalent = '+dec;
  }
  ['fn1','fd1','fn2','fd2'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  document.getElementById('fo').addEventListener('change',calc); calc();
  bc(document.getElementById('fc'),function(){ return document.getElementById('fr').textContent; });
})();

/* ---- GPA ---- */
(function(){
  if(!document.getElementById('grows'))return;
  var gmap={'A+':4,'A':4,'A-':3.7,'B+':3.3,'B':3,'B-':2.7,'C+':2.3,'C':2,'C-':1.7,'D+':1.3,'D':1,'F':0};
  function addRow(){
    var r=document.createElement('div');
    r.className='row3 gpa-row'; r.style.marginBottom='10px'; r.style.alignItems='end';
    r.innerHTML='<div class="field"><input type="text" value="" placeholder="Course name" style="height:44px"></div>'+
      '<div class="field"><select style="height:44px"><option>A+</option><option>A</option><option>A-</option><option>B+</option><option selected>B</option><option>B-</option><option>C+</option><option>C</option><option>C-</option><option>D+</option><option>D</option><option>F</option></select></div>'+
      '<div class="field"><input type="number" value="3" inputmode="numeric" min="1" style="height:44px" class="num-input"></div>';
    document.getElementById('grows').appendChild(r);
    r.querySelectorAll('input,select').forEach(function(el){ el.addEventListener('input',calcGPA); });
    calcGPA();
  }
  function calcGPA(){
    var rows=document.querySelectorAll('.gpa-row');
    var pts=0, cr=0, n=0;
    rows.forEach(function(r){
      var g=r.querySelector('select');
      var c=r.querySelector('input[type="number"]');
      if(!g||!c) return;
      var gp=gmap[g.value]||0;
      var crv=Math.max(1,+c.value||0);
      pts+=gp*crv; cr+=crv; n++;
    });
    var gpa=cr>0?pts/cr:0;
    document.getElementById('gpr').textContent=fmt(gpa,2);
    document.getElementById('gpinfo').textContent=n+' course'+(n!==1?'s':'')+', '+fmt(cr,0)+' total credits';
  }
  document.getElementById('gadd').addEventListener('click',addRow);
  document.getElementById('gclear').addEventListener('click',function(){
    var rows=document.querySelectorAll('.gpa-row');
    rows.forEach(function(r, idx){ if(idx>0) r.remove(); });
    var f=document.querySelector('#grows .gpa-row');
    if(f){ f.querySelector('input[type="text"]').value=''; f.querySelector('select').value='B+'; f.querySelector('input[type="number"]').value='3'; }
    calcGPA();
  });
  document.querySelectorAll('#grows input,#grows select').forEach(function(el){ el.addEventListener('input',calcGPA); });
  calcGPA();
  bc(document.getElementById('gpc'),function(){ return 'GPA: '+document.getElementById('gpr').textContent; });
})();

/* ---- SOURDOUGH HYDRATION ---- */
(function(){
  if(!document.getElementById('sd-flour'))return;
  function calc(){
    var f=+document.getElementById('sd-flour').value, w=+document.getElementById('sd-water').value;
    if(!f || f<=0){ document.getElementById('sdr').textContent='—'; return; }
    var hyd=(w/f)*100;
    document.getElementById('sdr').textContent=fmt(hyd,1)+'%';
    var cat = hyd < 65 ? 'Stiff / Low Hydration Dough' : hyd <= 72 ? 'Standard Sourdough (Easy to Handle)' : hyd <= 78 ? 'Open-Crumb High Hydration Sourdough' : 'Wet / Ciabatta Style Sourdough';
    document.getElementById('sdcat').textContent=cat;
  }
  document.getElementById('sd-flour').addEventListener('input',calc);
  document.getElementById('sd-water').addEventListener('input',calc); calc();
  bc(document.getElementById('sdc'),function(){ return document.getElementById('sdr').textContent+' Sourdough Hydration'; });
})();

/* ---- BAKER'S PERCENTAGE SCALER ---- */
(function(){
  if(!document.getElementById('bp-target'))return;
  function calc(){
    var target=+document.getElementById('bp-target').value,
        wPct=+document.getElementById('bp-water').value,
        sPct=+document.getElementById('bp-salt').value,
        stPct=+document.getElementById('bp-starter').value;
    var totPct = 100 + wPct + sPct + stPct;
    if(!totPct || target<=0){ document.getElementById('bpr').textContent='—'; return; }
    var flourG = target / (totPct / 100);
    var waterG = flourG * (wPct / 100);
    var saltG = flourG * (sPct / 100);
    var starterG = flourG * (stPct / 100);
    document.getElementById('bpr').textContent=fmt(flourG,1)+' g';
    document.getElementById('bp-f1').textContent=fmt(flourG,1)+' g';
    document.getElementById('bp-f2').textContent=fmt(waterG,1)+' g';
    document.getElementById('bp-f3').textContent=fmt(saltG,1)+' g';
    document.getElementById('bp-f4').textContent=fmt(starterG,1)+' g';
  }
  ['bp-target','bp-water','bp-salt','bp-starter'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.addEventListener('input',calc);
  });
  calc();
  bc(document.getElementById('bpc'),function(){ return document.getElementById('bpr').textContent+' Flour'; });
})();

/* ---- COLD BREW RATIO ---- */
(function(){
  if(!document.getElementById('cb-grounds'))return;
  function calc(){
    var g=+document.getElementById('cb-grounds').value, r=+document.getElementById('cb-ratio').value;
    if(!g || g<=0){ document.getElementById('cbr').textContent='—'; return; }
    var ml = g * r;
    var oz = ml * 0.033814;
    document.getElementById('cbr').textContent=fmt(ml,0)+' ml ('+fmt(oz,1)+' fl oz)';
  }
  document.getElementById('cb-grounds').addEventListener('input',calc);
  document.getElementById('cb-ratio').addEventListener('change',calc); calc();
  bc(document.getElementById('cbc'),function(){ return document.getElementById('cbr').textContent; });
})();

/* ---- ESPRESSO BREW RATIO ---- */
(function(){
  if(!document.getElementById('ep-dose'))return;
  function calc(){
    var dose=+document.getElementById('ep-dose').value, yld=+document.getElementById('ep-yield').value;
    if(!dose || dose<=0){ document.getElementById('epr').textContent='—'; return; }
    var ratio = yld / dose;
    document.getElementById('epr').textContent='1 : '+fmt(ratio,1);
    var cat = ratio <= 1.2 ? 'Ristretto Shot' : ratio <= 2.2 ? 'Normale (Standard Espresso)' : 'Lungo Shot';
    document.getElementById('epcat').textContent=cat;
  }
  document.getElementById('ep-dose').addEventListener('input',calc);
  document.getElementById('ep-yield').addEventListener('input',calc); calc();
  bc(document.getElementById('epc'),function(){ return document.getElementById('epr').textContent; });
})();

/* ---- YEAST CONVERSION ---- */
(function(){
  if(!document.getElementById('yc-val'))return;
  function calc(){
    var val=+document.getElementById('yc-val').value, type=document.getElementById('yc-type').value;
    if(!val || val<=0){ document.getElementById('ycr').textContent='—'; return; }
    var freshG, activeG, instantG;
    if(type==='fresh'){ freshG=val; activeG=val*0.5; instantG=val*(1/3); }
    else if(type==='active'){ activeG=val; freshG=val*2; instantG=val*0.75; }
    else { instantG=val; freshG=val*3; activeG=val/0.75; }
    document.getElementById('ycr').textContent=fmt(instantG,1)+' g Instant Yeast';
    document.getElementById('yc1').textContent=fmt(freshG,1)+' g';
    document.getElementById('yc2').textContent=fmt(activeG,1)+' g';
    document.getElementById('yc3').textContent=fmt(instantG,1)+' g';
  }
  document.getElementById('yc-val').addEventListener('input',calc);
  document.getElementById('yc-type').addEventListener('change',calc); calc();
  bc(document.getElementById('ycc'),function(){ return document.getElementById('ycr').textContent; });
})();

/* ---- GELATIN CONVERTER ---- */
(function(){
  if(!document.getElementById('gl-qty'))return;
  var map = { 'silver': 2.5, 'bronze': 1.8, 'gold': 2.0, 'platinum': 1.7, 'powder': 1.0 };
  function calc(){
    var q=+document.getElementById('gl-qty').value, type=document.getElementById('gl-type').value;
    if(!q || q<=0){ document.getElementById('glr').textContent='—'; return; }
    var factor = map[type] || 2.0;
    var powderG = type==='powder' ? q : q * factor;
    document.getElementById('glr').textContent=fmt(powderG,1)+' g Powdered Gelatin';
  }
  document.getElementById('gl-qty').addEventListener('input',calc);
  document.getElementById('gl-type').addEventListener('change',calc); calc();
  bc(document.getElementById('glc'),function(){ return document.getElementById('glr').textContent; });
})();

/* ---- HONEY FOR SUGAR SUBSTITUTE ---- */
(function(){
  if(!document.getElementById('hs-val'))return;
  function calc(){
    var v=+document.getElementById('hs-val').value, unit=document.getElementById('hs-unit').value;
    if(!v || v<=0){ document.getElementById('hsr').textContent='—'; return; }
    var honeyVal, liqRed, bSoda;
    if(unit==='grams'){
      honeyVal = v * 0.85;
      liqRed = (v / 200) * 60;
      bSoda = (v / 200) * 0.25;
      document.getElementById('hsr').textContent=fmt(honeyVal,1)+' g Honey';
      document.getElementById('hs1').textContent=fmt(honeyVal,1)+' g Honey';
      document.getElementById('hs2').textContent='−'+fmt(liqRed,0)+' ml liquid';
      document.getElementById('hs3').textContent='+'+fmt(bSoda,2)+' tsp baking soda';
    } else {
      honeyVal = v * 0.75;
      liqRed = v * 0.25;
      bSoda = v * 0.25;
      document.getElementById('hsr').textContent=fmt(honeyVal,2)+' US Cups Honey';
      document.getElementById('hs1').textContent=fmt(honeyVal,2)+' US Cups Honey';
      document.getElementById('hs2').textContent='−'+fmt(liqRed,2)+' cups liquid';
      document.getElementById('hs3').textContent='+'+fmt(bSoda,2)+' tsp baking soda';
    }
  }
  document.getElementById('hs-val').addEventListener('input',calc);
  document.getElementById('hs-unit').addEventListener('change',calc); calc();
  bc(document.getElementById('hsc'),function(){ return document.getElementById('hsr').textContent; });
})();

/* ---- CANNING PRESSURE BY ALTITUDE ---- */
(function(){
  if(!document.getElementById('ca-alt'))return;
  function calc(){
    var alt=+document.getElementById('ca-alt').value, gType=document.getElementById('ca-gauge').value;
    var psi;
    if(gType==='weighted'){
      psi = alt <= 1000 ? '10 PSI' : '15 PSI';
    } else {
      if(alt <= 2000) psi = '11 PSI';
      else if(alt <= 4000) psi = '12 PSI';
      else if(alt <= 6000) psi = '13 PSI';
      else if(alt <= 8000) psi = '14 PSI';
      else psi = '15 PSI';
    }
    document.getElementById('car').textContent=psi;
  }
  document.getElementById('ca-alt').addEventListener('input',calc);
  document.getElementById('ca-gauge').addEventListener('change',calc); calc();
  bc(document.getElementById('cac'),function(){ return document.getElementById('car').textContent; });
})();

/* ---- COCOA POWDER TO CHOCOLATE ---- */
(function(){
  if(!document.getElementById('cc-val'))return;
  function calc(){
    var v=+document.getElementById('cc-val').value, unit=document.getElementById('cc-unit').value;
    if(!v || v<=0){ document.getElementById('ccr').textContent='—'; return; }
    var oz = unit==='oz' ? v : v / 28.3495;
    var tbspCocoa = oz * 3;
    var gCocoa = oz * 18;
    var tbspButter = oz * 1;
    var gButter = oz * 14;
    document.getElementById('ccr').textContent=fmt(tbspCocoa,1)+' tbsp Cocoa + '+fmt(tbspButter,1)+' tbsp Butter';
    document.getElementById('cc1').textContent=fmt(tbspCocoa,1)+' tbsp ('+fmt(gCocoa,0)+'g) Cocoa Powder';
    document.getElementById('cc2').textContent=fmt(tbspButter,1)+' tbsp ('+fmt(gButter,0)+'g) Unsalted Butter / Oil';
  }
  document.getElementById('cc-val').addEventListener('input',calc);
  document.getElementById('cc-unit').addEventListener('change',calc); calc();
  bc(document.getElementById('ccc'),function(){ return document.getElementById('ccr').textContent; });
})();

/* ---- BRINE CALCULATOR ---- */
(function(){
  if(!document.getElementById('br-vol'))return;
  function calc(){
    var vol=+document.getElementById('br-vol').value, u=document.getElementById('br-unit').value, pct=+document.getElementById('br-type').value;
    if(!vol || vol<=0){ document.getElementById('brr').textContent='—'; return; }
    var waterG;
    if(u==='liters') waterG = vol * 1000;
    else if(u==='cups') waterG = vol * 240;
    else waterG = vol * 3785.41;
    var saltG = waterG * (pct / 100);
    document.getElementById('brr').textContent=fmt(saltG,1)+' g Kosher / Sea Salt';
  }
  document.getElementById('br-vol').addEventListener('input',calc);
  document.getElementById('br-unit').addEventListener('change',calc);
  document.getElementById('br-type').addEventListener('change',calc); calc();
  bc(document.getElementById('brc'),function(){ return document.getElementById('brr').textContent; });
})();

/* ---- TDEE CALCULATOR ---- */
(function(){
  if(!document.getElementById('td-w'))return;
  function calc(){
    var g=document.getElementById('td-gender').value, a=+document.getElementById('td-age').value, h=+document.getElementById('td-h').value, w=+document.getElementById('td-w').value, act=+document.getElementById('td-act').value;
    if(!a || !h || !w || a<=0 || h<=0 || w<=0){ document.getElementById('tdr').textContent='—'; return; }
    var bmr = (10 * w) + (6.25 * h) - (5 * a) + (g === 'm' ? 5 : -161);
    var tdee = Math.round(bmr * act);
    var cut = Math.round(tdee - 500);
    var bulk = Math.round(tdee + 300);
    document.getElementById('tdr').textContent=fmt(tdee,0)+' kcal / day';
    document.getElementById('td-cut').textContent=fmt(cut,0)+' kcal/day';
    document.getElementById('td-bulk').textContent=fmt(bulk,0)+' kcal/day';
    document.getElementById('td-bmr').textContent=fmt(Math.round(bmr),0)+' kcal/day';
  }
  ['td-gender','td-age','td-h','td-w','td-act'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.addEventListener('change',calc), el.addEventListener('input',calc);
  }); calc();
  bc(document.getElementById('tdc'),function(){ return document.getElementById('tdr').textContent; });
})();

/* ---- MACRO CALCULATOR ---- */
(function(){
  if(!document.getElementById('mc-cal'))return;
  function calc(){
    var cal=+document.getElementById('mc-cal').value, s=document.getElementById('mc-split').value;
    if(!cal || cal<=0){ document.getElementById('mcr').textContent='—'; return; }
    var pPct=30, cPct=40, fPct=30;
    if(s==='lowcarb'){ pPct=40; cPct=30; fPct=30; }
    else if(s==='keto'){ pPct=25; cPct=5; fPct=70; }
    else if(s==='highcarb'){ pPct=25; cPct=55; fPct=20; }
    var gP = Math.round((cal * (pPct/100)) / 4);
    var gC = Math.round((cal * (cPct/100)) / 4);
    var gF = Math.round((cal * (fPct/100)) / 9);
    document.getElementById('mcr').textContent=gP+'g Protein | '+gC+'g Carbs | '+gF+'g Fats';
    document.getElementById('mc-p').textContent=gP+' g';
    document.getElementById('mc-c').textContent=gC+' g';
    document.getElementById('mc-f').textContent=gF+' g';
  }
  document.getElementById('mc-cal').addEventListener('input',calc);
  document.getElementById('mc-split').addEventListener('change',calc); calc();
  bc(document.getElementById('mcc'),function(){ return document.getElementById('mcr').textContent; });
})();

/* ---- WATER INTAKE ---- */
(function(){
  if(!document.getElementById('wi-w'))return;
  function calc(){
    var w=+document.getElementById('wi-w').value, ex=+document.getElementById('wi-ex').value||0;
    if(!w || w<=0){ document.getElementById('wir').textContent='—'; return; }
    var l = (w * 0.033) + (ex * 0.012);
    var oz = l * 33.814;
    document.getElementById('wir').textContent=fmt(l,2)+' Liters ('+fmt(oz,0)+' fl oz)';
  }
  document.getElementById('wi-w').addEventListener('input',calc);
  document.getElementById('wi-ex').addEventListener('input',calc); calc();
  bc(document.getElementById('wic'),function(){ return document.getElementById('wir').textContent; });
})();

/* ---- PAINT CALCULATOR ---- */
(function(){
  if(!document.getElementById('pt-l'))return;
  function calc(){
    var l=+document.getElementById('pt-l').value, w=+document.getElementById('pt-w').value, h=+document.getElementById('pt-h').value, coats=+document.getElementById('pt-coats').value||1, open=+document.getElementById('pt-open').value||0;
    if(!l || !w || !h || l<=0 || w<=0 || h<=0){ document.getElementById('ptr').textContent='—'; return; }
    var grossSqFt = 2 * (l + w) * h;
    var netSqFt = Math.max(0, grossSqFt - (open * 20));
    var gal = (netSqFt * coats) / 350;
    var lit = gal * 3.78541;
    document.getElementById('ptr').textContent=fmt(gal,1)+' Gallons ('+fmt(lit,1)+' Liters)';
  }
  ['pt-l','pt-w','pt-h','pt-coats','pt-open'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.addEventListener('input',calc);
  }); calc();
  bc(document.getElementById('ptc'),function(){ return document.getElementById('ptr').textContent; });
})();

/* ---- TILE CALCULATOR ---- */
(function(){
  if(!document.getElementById('tl-rl'))return;
  function calc(){
    var rl=+document.getElementById('tl-rl').value, rw=+document.getElementById('tl-rw').value, tw=+document.getElementById('tl-tw').value, th=+document.getElementById('tl-th').value;
    if(!rl || !rw || !tw || !th || rl<=0 || rw<=0 || tw<=0 || th<=0){ document.getElementById('tlr').textContent='—'; return; }
    var roomArea = rl * rw;
    var tileArea = (tw * th) / 144;
    var raw = roomArea / tileArea;
    var total = Math.ceil(raw * 1.10);
    document.getElementById('tlr').textContent=total+' Tiles ('+Math.round(roomArea)+' sq ft)';
  }
  ['tl-rl','tl-rw','tl-tw','tl-th'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.addEventListener('input',calc);
  }); calc();
  bc(document.getElementById('tlc'),function(){ return document.getElementById('tlr').textContent; });
})();

/* ---- CONCRETE VOLUME ---- */
(function(){
  if(!document.getElementById('cc-l'))return;
  function calc(){
    var l=+document.getElementById('cc-l').value, w=+document.getElementById('cc-w').value, t=+document.getElementById('cc-t').value;
    if(!l || !w || !t || l<=0 || w<=0 || t<=0){ document.getElementById('ccr2').textContent='—'; return; }
    var cuFt = l * w * (t / 12);
    var cuYd = cuFt / 27;
    var b80 = Math.ceil(cuFt / 0.60);
    var b60 = Math.ceil(cuFt / 0.45);
    document.getElementById('ccr2').textContent=fmt(cuYd,2)+' Cubic Yards';
    document.getElementById('cc-b80').textContent=b80+' Bags';
    document.getElementById('cc-b60').textContent=b60+' Bags';
    document.getElementById('cc-cf').textContent=fmt(cuFt,1)+' cu ft';
  }
  ['cc-l','cc-w','cc-t'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.addEventListener('input',calc);
  }); calc();
  bc(document.getElementById('ccc2'),function(){ return document.getElementById('ccr2').textContent; });
})();

/* ---- OVEN TEMP & GAS MARK ---- */
(function(){
  if(!document.getElementById('ot-c'))return;
  var lock=false;
  var cEl=document.getElementById('ot-c'), fEl=document.getElementById('ot-f'), gmEl=document.getElementById('ot-gm');
  function calcFromC(){
    if(lock)return; lock=true;
    var c=+cEl.value;
    var f=c*9/5+32;
    var gm=c>=135 ? Math.round(((c-121)/14)*2)/2 : 0.5;
    fEl.value=isFinite(f)?Math.round(f):'';
    gmEl.value=isFinite(gm)?gm:'';
    updateRes(c, f);
    lock=false;
  }
  function calcFromF(){
    if(lock)return; lock=true;
    var f=+fEl.value;
    var c=(f-32)*5/9;
    var gm=c>=135 ? Math.round(((c-121)/14)*2)/2 : 0.5;
    cEl.value=isFinite(c)?Math.round(c):'';
    gmEl.value=isFinite(gm)?gm:'';
    updateRes(c, f);
    lock=false;
  }
  function calcFromGM(){
    if(lock)return; lock=true;
    var gm=+gmEl.value;
    var c=121 + (gm * 14);
    var f=c*9/5+32;
    cEl.value=isFinite(c)?Math.round(c):'';
    fEl.value=isFinite(f)?Math.round(f):'';
    updateRes(c, f);
    lock=false;
  }
  function updateRes(c, f){
    var fanC=Math.round(c-20);
    var fanF=Math.round(f-25);
    document.getElementById('otr').textContent=fanC+'°C ('+fanF+'°F)';
    var cat = c < 140 ? 'Slow / Low Baking' : c <= 190 ? 'Moderate Baking' : c <= 220 ? 'Hot Oven / Pastry' : 'Very Hot / Pizza Oven';
    document.getElementById('otcat').textContent=cat;
  }
  cEl.addEventListener('input',calcFromC); fEl.addEventListener('input',calcFromF); gmEl.addEventListener('input',calcFromGM); calcFromC();
  bc(document.getElementById('otc'),function(){ return document.getElementById('otr').textContent+' Fan-Forced Temp'; });
})();

/* ---- DENSITY WEIGHT CONVERTER ---- */
(function(){
  if(!document.getElementById('dc-ing'))return;
  function calc(){
    var dens=+document.getElementById('dc-ing').value;
    var vol=+document.getElementById('dc-vol').value;
    var unit=document.getElementById('dc-unit').value;
    if(!vol || vol<=0){ document.getElementById('dcr').textContent='—'; return; }
    var ml = unit==='cups'?vol*240 : unit==='tbsp'?vol*14.7868 : unit==='tsp'?vol*4.92892 : unit==='floz'?vol*29.5735 : vol;
    var g = ml * dens;
    var oz = g * 0.035274;
    document.getElementById('dcr').textContent=fmt(g,1)+' g ('+fmt(oz,2)+' oz)';
  }
  ['dc-ing','dc-vol','dc-unit'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('change',calc); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('dcc'),function(){ return document.getElementById('dcr').textContent; });
})();

/* ---- YARN WEIGHT & GAUGE ---- */
(function(){
  if(!document.getElementById('yg-cat'))return;
  var map={
    '0': { g: '33–40 sts / 4" (10cm)', n: 'Needle: 1.5–2.25 mm (US 000-1) | Hook: 1.4–2.25 mm (Steel 6–8)' },
    '1': { g: '27–32 sts / 4" (10cm)', n: 'Needle: 2.25–3.25 mm (US 1-3) | Hook: 2.25–3.5 mm (US B-1 to E-4)' },
    '2': { g: '23–26 sts / 4" (10cm)', n: 'Needle: 3.25–3.75 mm (US 3-5) | Hook: 3.5–4.5 mm (US E-4 to 7)' },
    '3': { g: '21–24 sts / 4" (10cm)', n: 'Needle: 3.75–4.5 mm (US 5-7) | Hook: 4.5–5.5 mm (US 7 to I-9)' },
    '4': { g: '16–20 sts / 4" (10cm)', n: 'Needle: 4.5–5.5 mm (US 7-9) | Hook: 5.5–6.5 mm (US I-9 to K-10.5)' },
    '5': { g: '12–15 sts / 4" (10cm)', n: 'Needle: 5.5–8.0 mm (US 9-11) | Hook: 6.5–9.0 mm (US K-10.5 to M-13)' },
    '6': { g: '7–11 sts / 4" (10cm)', n: 'Needle: 8.0–12.75 mm (US 11-17) | Hook: 9.0–15.0 mm (US M-13 to Q)' },
    '7': { g: '6 sts or fewer / 4" (10cm)', n: 'Needle: 12.75 mm and larger (US 17+) | Hook: 15.0 mm and larger' }
  };
  function calc(){
    var cat=document.getElementById('yg-cat').value;
    var info=map[cat]||map['4'];
    document.getElementById('ygr').textContent=info.g;
    document.getElementById('yginfo').textContent=info.n;
  }
  document.getElementById('yg-cat').addEventListener('change',calc); calc();
  bc(document.getElementById('ygc'),function(){ return document.getElementById('ygr').textContent; });
})();

/* ---- FABRIC YARDAGE ---- */
(function(){
  if(!document.getElementById('fy-yd'))return;
  function calc(){
    var yd=+document.getElementById('fy-yd').value;
    var w=+document.getElementById('fy-width').value;
    if(!yd || yd<=0){ document.getElementById('fyr').textContent='—'; return; }
    var meters = yd * 0.9144;
    var sqFt = (yd * 36) * w / 144;
    var sqM = sqFt * 0.092903;
    document.getElementById('fyr').textContent=fmt(meters,2)+' Meters';
    document.getElementById('fyinfo').textContent='Total Fabric Surface: ~'+fmt(sqM,2)+' sq meters ('+fmt(sqFt,1)+' sq ft)';
  }
  ['fy-yd','fy-width'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('fyc'),function(){ return document.getElementById('fyr').textContent; });
})();

/* ---- PAPER SIZE TO PIXELS / DPI ---- */
(function(){
  if(!document.getElementById('pd-preset'))return;
  var map={
    'a4': { w: 8.27, h: 11.69 },
    'a3': { w: 11.69, h: 16.54 },
    'a5': { w: 5.83, h: 8.27 },
    'letter': { w: 8.5, h: 11.0 },
    'legal': { w: 8.5, h: 14.0 },
    'tabloid': { w: 11.0, h: 17.0 }
  };
  function calc(){
    var p=document.getElementById('pd-preset').value;
    var dpi=+document.getElementById('pd-dpi').value;
    var dims=map[p]||map['a4'];
    var pxW=Math.round(dims.w * dpi);
    var pxH=Math.round(dims.h * dpi);
    var mp=((pxW * pxH)/1000000).toFixed(1);
    document.getElementById('pdr').textContent=pxW+' × '+pxH+' px';
    document.getElementById('pdinfo').textContent='Total Uncompressed Image: '+mp+' Megapixels';
  }
  ['pd-preset','pd-dpi'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('pdc'),function(){ return document.getElementById('pdr').textContent; });
})();

/* ---- SCREEN PPI CALCULATOR ---- */
(function(){
  if(!document.getElementById('sp-w'))return;
  function calc(){
    var w=+document.getElementById('sp-w').value;
    var h=+document.getElementById('sp-h').value;
    var d=+document.getElementById('sp-d').value;
    if(!w || !h || !d || w<=0 || h<=0 || d<=0){ document.getElementById('spr').textContent='—'; return; }
    var diagPx = Math.sqrt(w*w + h*h);
    var ppi = diagPx / d;
    var aspectRatio = w / h;
    var angle = Math.atan(1 / aspectRatio);
    var physW = d * Math.cos(angle);
    var physH = d * Math.sin(angle);
    var dotPitch = 25.4 / ppi;
    document.getElementById('spr').textContent=fmt(ppi,2)+' PPI';
    document.getElementById('spinfo').textContent='Physical Display: '+fmt(physW,1)+'" × '+fmt(physH,1)+'" (Dot Pitch: '+fmt(dotPitch,3)+' mm)';
  }
  ['sp-w','sp-h','sp-d'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('spc'),function(){ return document.getElementById('spr').textContent; });
})();

/* ---- AWG WIRE GAUGE ---- */
(function(){
  if(!document.getElementById('aw-gauge'))return;
  function calc(){
    var awg=+document.getElementById('aw-gauge').value;
    if(isNaN(awg) || awg<0){ document.getElementById('awr').textContent='—'; return; }
    var dMm = 0.127 * Math.pow(92, (36 - awg) / 39);
    var dIn = dMm * 0.0393701;
    var areaMm2 = (Math.PI / 4) * dMm * dMm;
    var amp = awg <= 4 ? 95 : awg <= 6 ? 55 : awg <= 8 ? 40 : awg <= 10 ? 30 : awg <= 12 ? 20 : awg <= 14 ? 15 : awg <= 16 ? 10 : 7;
    document.getElementById('awr').textContent=fmt(areaMm2,2)+' mm²';
    document.getElementById('awinfo').textContent='Diameter: '+fmt(dMm,2)+' mm ('+fmt(dIn,4)+' inches) | Max Ampacity: ~'+amp+' Amps';
  }
  document.getElementById('aw-gauge').addEventListener('input',calc); calc();
  bc(document.getElementById('awc'),function(){ return document.getElementById('awr').textContent; });
})();

/* ---- EXPOSURE TRIANGLE ---- */
(function(){
  if(!document.getElementById('et-shutter'))return;
  function calc(){
    var t=+document.getElementById('et-shutter').value;
    var f=+document.getElementById('et-aperture').value;
    var iso=+document.getElementById('et-iso').value;
    var ev = Math.log2((f*f) / t) - Math.log2(iso / 100);
    document.getElementById('etr').textContent='EV '+fmt(ev,1);
    var eqT = (f*f) / Math.pow(2, ev);
    var frac = eqT < 1 ? '1/'+Math.round(1/eqT)+'s' : fmt(eqT,1)+'s';
    document.getElementById('etinfo').textContent='Target EV balance @ ISO 100 equivalent: '+frac+' @ f/'+f;
  }
  ['et-shutter','et-aperture','et-iso'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('etc'),function(){ return document.getElementById('etr').textContent; });
})();

/* ---- PAN SUBSTITUTION ---- */
(function(){
  if(!document.getElementById('ps-orig'))return;
  var areas={
    '9_round': 63.6,
    '8_round': 50.3,
    '8_square': 64.0,
    '9_square': 81.0,
    '9x13': 117.0
  };
  function calc(){
    var oArea=areas[document.getElementById('ps-orig').value];
    var nArea=areas[document.getElementById('ps-new').value];
    var ratio = nArea / oArea;
    document.getElementById('psr').textContent=fmt(ratio,2)+'x Area';
    var txt = ratio < 0.9 ? 'Batter will be thicker: Lower oven temp by 25°F (15°C) & add +10-15 mins bake time.' : ratio > 1.15 ? 'Batter will be thinner: Check doneness 5-10 minutes earlier.' : 'Nearly identical surface area: Bake at normal recipe time!';
    document.getElementById('psinfo').textContent=txt;
  }
  ['ps-orig','ps-new'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('psc'),function(){ return document.getElementById('psr').textContent; });
})();

/* ---- FIREWOOD CORD CALCULATOR ---- */
(function(){
  if(!document.getElementById('fc-l'))return;
  function calc(){
    var l=+document.getElementById('fc-l').value;
    var h=+document.getElementById('fc-h').value;
    var logIn=+document.getElementById('fc-log').value;
    if(!l || !h || !logIn || l<=0 || h<=0 || logIn<=0){ document.getElementById('fcr').textContent='—'; return; }
    var cuFt = l * h * (logIn / 12);
    var fullCords = cuFt / 128;
    var faceCords = (l * h) / 32;
    var weightKg = Math.round(cuFt * 28);
    document.getElementById('fcr').textContent=fmt(fullCords,2)+' Full Cords ('+fmt(faceCords,1)+' Face Cords)';
    document.getElementById('fcinfo').textContent='Volume: '+fmt(cuFt,1)+' cu ft (~'+fmt(weightKg,0)+' kg seasoned oak weight)';
  }
  ['fc-l','fc-h','fc-log'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('fcc'),function(){ return document.getElementById('fcr').textContent; });
})();

/* ---- AQUARIUM STOCKING ---- */
(function(){
  if(!document.getElementById('aq-l'))return;
  function calc(){
    var l=+document.getElementById('aq-l').value;
    var w=+document.getElementById('aq-w').value;
    var h=+document.getElementById('aq-h').value;
    if(!l || !w || !h || l<=0 || w<=0 || h<=0){ document.getElementById('aqr').textContent='—'; return; }
    var gal = (l * w * h) / 231;
    var liters = gal * 3.78541;
    var maxFishInches = Math.round(gal * 0.95);
    document.getElementById('aqr').textContent=fmt(gal,1)+' US Gallons ('+fmt(liters,1)+' L)';
    document.getElementById('aqinfo').textContent='Safe Stocking Capacity: ~'+maxFishInches+' inches total adult small fish';
  }
  ['aq-l','aq-w','aq-h'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('aqc'),function(){ return document.getElementById('aqr').textContent; });
})();

/* ---- SOIL & MULCH CALCULATOR ---- */
(function(){
  if(!document.getElementById('sm-l'))return;
  function calc(){
    var l=+document.getElementById('sm-l').value;
    var w=+document.getElementById('sm-w').value;
    var d=+document.getElementById('sm-d').value;
    if(!l || !w || !d || l<=0 || w<=0 || d<=0){ document.getElementById('smr').textContent='—'; return; }
    var cuFt = l * w * (d / 12);
    var cuYd = cuFt / 27;
    var bags2 = Math.ceil(cuFt / 2);
    document.getElementById('smr').textContent=fmt(cuYd,2)+' Cubic Yards';
    document.getElementById('sminfo').textContent=fmt(cuFt,1)+' Cubic Feet = '+bags2+' bags (2 cu ft bags)';
  }
  ['sm-l','sm-w','sm-d'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('smc'),function(){ return document.getElementById('smr').textContent; });
})();

/* ---- PAINT COVERAGE & TEXTURE ---- */
(function(){
  if(!document.getElementById('pc-area'))return;
  function calc(){
    var area=+document.getElementById('pc-area').value;
    var rate=+document.getElementById('pc-tex').value;
    var coats=+document.getElementById('pc-coats').value;
    if(!area || area<=0){ document.getElementById('pcr').textContent='—'; return; }
    var gal = (area / rate) * coats;
    var liters = gal * 3.78541;
    var cans = Math.ceil(gal);
    document.getElementById('pcr').textContent=fmt(gal,2)+' Gallons ('+fmt(liters,1)+' L)';
    document.getElementById('pcinfo').textContent='Buy '+cans+' × 1-Gallon Cans';
  }
  ['pc-area','pc-tex','pc-coats'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('pcc'),function(){ return document.getElementById('pcr').textContent; });
})();

/* ---- STEP-UP COMPOUND INTEREST ---- */
(function(){
  if(!document.getElementById('su-init'))return;
  function calc(){
    var P=+document.getElementById('su-init').value;
    var pmt=+document.getElementById('su-mo').value;
    var step=+document.getElementById('su-step').value / 100;
    var rate=+document.getElementById('su-rate').value / 100;
    var years=+document.getElementById('su-years').value;
    if(!years || years<=0){ document.getElementById('sur').textContent='—'; return; }
    var totalValue = P;
    var totalContrib = P;
    var currentMoPmt = pmt;
    var monthlyRate = rate / 12;
    for(var y=1; y<=years; y++){
      for(var m=1; m<=12; m++){
        totalValue = (totalValue + currentMoPmt) * (1 + monthlyRate);
        totalContrib += currentMoPmt;
      }
      currentMoPmt *= (1 + step);
    }
    var interestEarned = totalValue - totalContrib;
    document.getElementById('sur').textContent='$'+fmt(totalValue,0);
    document.getElementById('suinfo').textContent='Total Principal Invested: $'+fmt(totalContrib,0)+' | Total Interest Earned: $'+fmt(interestEarned,0);
  }
  ['su-init','su-mo','su-step','su-rate','su-years'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('suc'),function(){ return document.getElementById('sur').textContent; });
})();

/* ---- PAN EQUIVALENCE ---- */
(function(){
  if(!document.getElementById('pe-pan'))return;
  var map={
    '9_round': { c: 6.0, eq: 'Equivalent to: 8" Square Pan or 1.3x 8" Round Pan' },
    '8_round': { c: 4.5, eq: 'Equivalent to: 9" Pie Dish' },
    '8_square': { c: 5.6, eq: 'Equivalent to: 9" Round Pan' },
    '9_square': { c: 7.2, eq: 'Equivalent to: 1.2x 9" Round Pan' },
    '9x13': { c: 13.0, eq: 'Equivalent to: Two 9" Round Pans or 10" Bundt Pan' },
    'bundt10': { c: 12.0, eq: 'Equivalent to: Two 8" Round Pans or 9"×13" Rectangular Pan' },
    'spring9': { c: 10.0, eq: 'Equivalent to: 1.6x 9" Round Pan' },
    'pie9': { c: 4.0, eq: 'Equivalent to: 8" Round Pan' }
  };
  function calc(){
    var v=document.getElementById('pe-pan').value;
    var item=map[v]||map['9_round'];
    document.getElementById('per').textContent=fmt(item.c,1)+' US Cups Capacity';
    document.getElementById('peinfo').textContent=item.eq;
  }
  document.getElementById('pe-pan').addEventListener('change',calc); calc();
  bc(document.getElementById('pec'),function(){ return document.getElementById('per').textContent; });
})();

/* ---- HUMIDITY-ADJUSTED HYDRATION ---- */
(function(){
  if(!document.getElementById('hh-flour'))return;
  function calc(){
    var flour=+document.getElementById('hh-flour').value;
    var targetHyd=+document.getElementById('hh-hyd').value;
    var hum=+document.getElementById('hh-hum').value;
    if(!flour || flour<=0){ document.getElementById('hhr').textContent='—'; return; }
    var baseWater = flour * (targetHyd / 100);
    var deltaHum = hum - 50;
    var waterAdj = flour * deltaHum * 0.0008;
    var netWater = baseWater - waterAdj;
    var netHyd = (netWater / flour) * 100;
    var diff = Math.round(netWater - baseWater);
    var diffTxt = diff === 0 ? 'Normal ambient humidity: No water adjustment needed.' : diff < 0 ? 'High humidity: Reduced water by '+diff+'g because flour absorbed ambient moisture.' : 'Low humidity: Increased water by +'+Math.abs(diff)+'g because dry flour absorbs more liquid.';
    document.getElementById('hhr').textContent=fmt(netWater,0)+' g Water ('+fmt(netHyd,1)+'% Net)';
    document.getElementById('hhinfo').textContent=diffTxt;
  }
  ['hh-flour','hh-hyd','hh-hum'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('hhc'),function(){ return document.getElementById('hhr').textContent; });
})();

/* ---- SEWING SEAM ALLOWANCE ---- */
(function(){
  if(!document.getElementById('sa-val'))return;
  function calc(){
    var val=+document.getElementById('sa-val').value;
    var allow=+document.getElementById('sa-allow').value;
    if(!val || val<=0){ document.getElementById('sar').textContent='—'; return; }
    var totalAdded = allow * 2;
    var cutInches = val + totalAdded;
    var cutCm = cutInches * 2.54;
    document.getElementById('sar').textContent=fmt(cutInches,2)+' inches ('+fmt(cutCm,1)+' cm)';
    document.getElementById('sainfo').textContent='Total Seam Allowance Added: +'+fmt(totalAdded,2)+' inches (+'+fmt(totalAdded*2.54,2)+' cm)';
  }
  ['sa-val','sa-allow'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('sac'),function(){ return document.getElementById('sar').textContent; });
})();

/* ---- 3D PRINTING FILAMENT ---- */
(function(){
  if(!document.getElementById('fl-wt'))return;
  function calc(){
    var wt=+document.getElementById('fl-wt').value;
    var dens=+document.getElementById('fl-mat').value;
    var dia=+document.getElementById('fl-dia').value;
    if(!wt || wt<=0){ document.getElementById('flr').textContent='—'; return; }
    var radiusCm = (dia / 10) / 2;
    var volCm3 = wt / dens;
    var lengthCm = volCm3 / (Math.PI * radiusCm * radiusCm);
    var meters = lengthCm / 100;
    var feet = meters * 3.28084;
    document.getElementById('flr').textContent=fmt(meters,1)+' Meters ('+fmt(feet,0)+' ft)';
    document.getElementById('flinfo').textContent='Filament Volume: '+fmt(volCm3,1)+' cm³ (Density: '+dens+' g/cm³)';
  }
  ['fl-wt','fl-mat','fl-dia'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('flc'),function(){ return document.getElementById('flr').textContent; });
})();

/* ---- HOMEBREW ABV ---- */
(function(){
  if(!document.getElementById('ba-og'))return;
  function calc(){
    var og=+document.getElementById('ba-og').value;
    var fg=+document.getElementById('ba-fg').value;
    if(!og || !fg || og<=fg){ document.getElementById('bar').textContent='—'; return; }
    var abv = (og - fg) * 131.25;
    var atten = ((og - fg) / (og - 1.0)) * 100;
    var cal = (131.25 * (og - fg) * 3.5) + (2586 * (fg - 1.0));
    document.getElementById('bar').textContent=fmt(abv,2)+'% ABV';
    document.getElementById('bainfo').textContent='Apparent Attenuation: '+fmt(atten,1)+'% | Estimated Calories: ~'+Math.round(cal)+' kcal / 12oz';
  }
  ['ba-og','ba-fg'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('bac'),function(){ return document.getElementById('bar').textContent; });
})();

/* ---- CAMERA CROP FACTOR ---- */
(function(){
  if(!document.getElementById('cf-fl'))return;
  function calc(){
    var fl=+document.getElementById('cf-fl').value;
    var fstop=+document.getElementById('cf-fstop').value;
    var crop=+document.getElementById('cf-sensor').value;
    if(!fl || fl<=0){ document.getElementById('cfr').textContent='—'; return; }
    var eqFl = Math.round(fl * crop);
    var eqFstop = fmt(fstop * crop, 1);
    document.getElementById('cfr').textContent=eqFl+'mm f/'+eqFstop+' Eq.';
    document.getElementById('cfinfo').textContent='Field of view and DOF match a '+eqFl+'mm lens on 35mm full-frame.';
  }
  ['cf-fl','cf-fstop','cf-sensor'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('cfc'),function(){ return document.getElementById('cfr').textContent; });
})();

/* ---- RUNNING PACE & SPLITS ---- */
(function(){
  if(!document.getElementById('rp-dist'))return;
  function calc(){
    var distKm=+document.getElementById('rp-dist').value;
    var h=+document.getElementById('rp-h').value || 0;
    var m=+document.getElementById('rp-m').value || 0;
    var totalMin = (h * 60) + m;
    if(!distKm || totalMin<=0){ document.getElementById('rpr').textContent='—'; return; }
    var paceMinKm = totalMin / distKm;
    var minKm = Math.floor(paceMinKm);
    var secKm = Math.round((paceMinKm - minKm) * 60);
    if(secKm===60){ minKm++; secKm=0; }
    var paceMinMile = totalMin / (distKm * 0.621371);
    var minMile = Math.floor(paceMinMile);
    var secMile = Math.round((paceMinMile - minMile) * 60);
    if(secMile===60){ minMile++; secMile=0; }
    var kmh = distKm / (totalMin / 60);
    var mph = kmh * 0.621371;
    document.getElementById('rpr').textContent=minKm+':'+(secKm<10?'0':'')+secKm+' min/km';
    document.getElementById('rpinfo').textContent='Mile Pace: '+minMile+':'+(secMile<10?'0':'')+secMile+' min/mile | Speed: '+fmt(kmh,1)+' km/h ('+fmt(mph,1)+' mph)';
  }
  ['rp-dist','rp-h','rp-m'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('rpc'),function(){ return document.getElementById('rpr').textContent; });
})();

/* ---- CYCLING GEAR RATIO ---- */
(function(){
  if(!document.getElementById('cg-front'))return;
  function calc(){
    var front=+document.getElementById('cg-front').value;
    var rear=+document.getElementById('cg-rear').value;
    var cad=+document.getElementById('cg-cad').value;
    if(!front || !rear || !cad || front<=0 || rear<=0 || cad<=0){ document.getElementById('cgr2').textContent='—'; return; }
    var ratio = front / rear;
    var wheelCircM = 2.105; // 700c x 25 mm standard
    var devMeters = ratio * wheelCircM;
    var gearInches = ratio * 27.0;
    var kmh = (cad * ratio * wheelCircM * 60) / 1000;
    var mph = kmh * 0.621371;
    document.getElementById('cgr2').textContent=fmt(kmh,1)+' km/h ('+fmt(mph,1)+' mph)';
    document.getElementById('cginfo').textContent='Gear Ratio: '+fmt(ratio,2)+' : 1 | Gear Inches: '+fmt(gearInches,1)+'" | Development: '+fmt(devMeters,2)+' m/turn';
  }
  ['cg-front','cg-rear','cg-cad'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('cgc2'),function(){ return document.getElementById('cgr2').textContent; });
})();

/* ---- FIREWOOD BTU CALCULATOR ---- */
(function(){
  if(!document.getElementById('fb-wood'))return;
  function calc(){
    var btuPerCord=+document.getElementById('fb-wood').value;
    var cords=+document.getElementById('fb-cords').value;
    if(!cords || cords<=0){ document.getElementById('fbr').textContent='—'; return; }
    var totalBtu = btuPerCord * cords;
    var oilGal = Math.round((totalBtu * 1000000) / 138500);
    var kwh = Math.round((totalBtu * 1000000) / 3412);
    document.getElementById('fbr').textContent=fmt(totalBtu,1)+' Million BTU';
    document.getElementById('fbinfo').textContent='Equivalent Heat: ~'+oilGal+' Gallons of Heating Oil or '+kwh.toLocaleString()+' kWh Electricity';
  }
  ['fb-wood','fb-cords'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('fbc'),function(){ return document.getElementById('fbr').textContent; });
})();

/* ---- SOLAR PANEL CALCULATOR ---- */
(function(){
  if(!document.getElementById('sl-bill'))return;
  function calc(){
    var bill=+document.getElementById('sl-bill').value;
    var rate=+document.getElementById('sl-rate').value;
    if(!bill || !rate || bill<=0 || rate<=0){ document.getElementById('slr').textContent='—'; return; }
    var monthlyKwh = bill / rate;
    var dailyKwh = monthlyKwh / 30;
    var kwSystem = dailyKwh / 4.2;
    var roundedKw = Math.ceil(kwSystem * 2) / 2;
    var areaSqFt = Math.round(roundedKw * 90);
    var annualSavings = Math.round(monthlyKwh * 12 * rate * 0.90);
    document.getElementById('slr').textContent=fmt(roundedKw,1)+' kW Plant';
    document.getElementById('slinfo').textContent='Generates ~'+Math.round(monthlyKwh)+' units/mo | Annual Savings: ~₹'+annualSavings.toLocaleString('en-IN')+' | Area: ~'+areaSqFt+' sq ft';
  }
  ['sl-bill','sl-rate'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('slc'),function(){ return document.getElementById('slr').textContent; });
})();

/* ---- WATER TANK REFILL TIME ---- */
(function(){
  if(!document.getElementById('wt-vol'))return;
  function calc(){
    var vol=+document.getElementById('wt-vol').value;
    var flow=+document.getElementById('wt-flow').value;
    if(!vol || !flow || vol<=0 || flow<=0){ document.getElementById('wtr').textContent='—'; return; }
    var min = vol / flow;
    var h = Math.floor(min / 60);
    var remMin = Math.round(min % 60);
    var txt = h > 0 ? h+' hrs '+remMin+' mins' : Math.round(min)+' Minutes';
    var lps = flow / 60;
    var gpm = flow * 0.264172;
    document.getElementById('wtr').textContent=txt;
    document.getElementById('wtinfo').textContent='Flow Rate: '+fmt(lps,2)+' Liters/sec ('+fmt(gpm,1)+' GPM US)';
  }
  ['wt-vol','wt-flow'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('wtc'),function(){ return document.getElementById('wtr').textContent; });
})();

/* ---- EV CHARGING COST ---- */
(function(){
  if(!document.getElementById('ev-preset'))return;
  function calc(){
    var preset=document.getElementById('ev-preset').value.split('_');
    var batKwh=+preset[0];
    var rangeKm=+preset[1];
    var rate=+document.getElementById('ev-rate').value;
    var chgKw=+document.getElementById('ev-type').value;
    if(!batKwh || !rate || batKwh<=0 || rate<=0){ document.getElementById('evr').textContent='—'; return; }
    var fullCost = batKwh * rate;
    var costPerKm = fullCost / rangeKm;
    var hrs = batKwh / (chgKw * 0.90);
    document.getElementById('evr').textContent='₹'+Math.round(fullCost)+' Full Charge (₹'+fmt(costPerKm,2)+'/km)';
    document.getElementById('evinfo').textContent='Full Charge Time: ~'+fmt(hrs,1)+' Hours on '+chgKw+' kW charger';
  }
  ['ev-preset','ev-rate','ev-type'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('change',calc); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('evc'),function(){ return document.getElementById('evr').textContent; });
})();

/* ---- GUITAR STRING TENSION ---- */
(function(){
  if(!document.getElementById('gt-set'))return;
  var sets={
    '10-46': 108.4,
    '9-42': 86.2,
    '11-52': 125.8,
    '12-53': 160.5,
    '45-105': 178.0
  };
  function calc(){
    var setKey=document.getElementById('gt-set').value;
    var scale=+document.getElementById('gt-scale').value;
    var tune=document.getElementById('gt-tune').value;
    var baseTension=sets[setKey]||108.4;
    var scaleMult = Math.pow(scale / 25.5, 2);
    var tuneMult = tune==='drop_d'?0.95 : tune==='d_std'?0.80 : 1.0;
    var netTension = baseTension * scaleMult * tuneMult;
    var netKg = netTension * 0.453592;
    var avgPerString = netTension / (setKey==='45-105'?4:6);
    document.getElementById('gtr').textContent=fmt(netTension,1)+' lbs ('+fmt(netKg,1)+' kg)';
    document.getElementById('gtinfo').textContent='Average Per String: '+fmt(avgPerString,1)+' lbs | Neck Tension: Safe Standard';
  }
  ['gt-set','gt-scale','gt-tune'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('change',calc); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('gtc'),function(){ return document.getElementById('gtr').textContent; });
})();

/* ---- AQUARIUM CO2 ---- */
(function(){
  if(!document.getElementById('ac-ph'))return;
  function calc(){
    var ph=+document.getElementById('ac-ph').value;
    var kh=+document.getElementById('ac-kh').value;
    if(!ph || !kh || ph<=0 || kh<=0){ document.getElementById('acr').textContent='—'; return; }
    var co2 = 3 * kh * Math.pow(10, 7.0 - ph);
    var status = co2 < 15 ? 'Low CO2 (Slow plant growth)' : co2 <= 32 ? 'Optimal CO2 Zone (Good plant growth, safe for fish)' : 'Danger High CO2 (Risk of fish gasping)';
    document.getElementById('acr').textContent=fmt(co2,1)+' ppm CO2';
    document.getElementById('acinfo').textContent='Status: '+status;
  }
  ['ac-ph','ac-kh'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('acc'),function(){ return document.getElementById('acr').textContent; });
})();

/* ---- CRYPTO CONVERTER ---- */
(function(){
  if(!document.getElementById('cc-amount'))return;
  var cryptoUsd = { 'BTC': 77737.21, 'ETH': 3385.14, 'SOL': 185.40, 'USDT': 1.00, 'XRP': 0.58, 'BNB': 580.20, 'DOGE': 0.14, 'ADA': 0.42 };
  var fiatRates = { 'USD': { r: 1.0, s: '$' }, 'INR': { r: 83.50, s: '₹' }, 'EUR': { r: 0.92, s: '€' }, 'GBP': { r: 0.78, s: '£' }, 'PHP': { r: 58.20, s: '₱' }, 'IDR': { r: 16250.0, s: 'Rp' }, 'CAD': { r: 1.38, s: '$' }, 'AUD': { r: 1.52, s: '$' } };
  var names = { 'BTC': 'Bitcoin', 'ETH': 'Ethereum', 'SOL': 'Solana', 'USDT': 'Tether', 'XRP': 'XRP', 'BNB': 'BNB', 'DOGE': 'Dogecoin', 'ADA': 'Cardano' };

  function calc(){
    var amount=+document.getElementById('cc-amount').value;
    var cCode=document.getElementById('cc-from').value;
    var fCode=document.getElementById('cc-to').value;
    if(!amount || amount<=0){ document.getElementById('cc-res').textContent='—'; return; }
    var cPrice = cryptoUsd[cCode] || 1;
    var fInfo = fiatRates[fCode] || fiatRates['USD'];
    var totalVal = amount * cPrice * fInfo.r;
    var unitVal = cPrice * fInfo.r;
    var formattedVal = fInfo.s + totalVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    var formattedUnit = fInfo.s + unitVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('cc-res').textContent = amount + ' ' + (names[cCode]||cCode) + ' (' + cCode + ') = ' + formattedVal + ' ' + fCode;
  }

  function renderPills(){
    var container = document.getElementById('crypto-pills');
    if(!container) return;
    var pairs = [
      { c: 'BTC', f: 'INR' }, { c: 'BTC', f: 'USD' }, { c: 'BTC', f: 'IDR' }, { c: 'BTC', f: 'EUR' },
      { c: 'ETH', f: 'INR' }, { c: 'ETH', f: 'USD' }, { c: 'SOL', f: 'USD' }, { c: 'USDT', f: 'INR' },
      { c: 'XRP', f: 'PHP' }, { c: 'BNB', f: 'PHP' }
    ];
    container.innerHTML = pairs.map(function(p){
      var cPrice = cryptoUsd[p.c] || 1;
      var fInfo = fiatRates[p.f] || fiatRates['USD'];
      var val = cPrice * fInfo.r;
      var valStr = fInfo.s + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return '<a class="pill-tag" href="/money/crypto-converter/" title="Reference-rate conversion" style="font-size:13px;padding:6px 12px;display:inline-flex;align-items:center;gap:6px;background:var(--surface-soft)">' +
        '<span>' + (names[p.c]||p.c) + ' to ' + p.f + '</span>' +
        '<strong style="color:var(--ink)">' + valStr + '</strong>' +
        '</a>';
    }).join('');
  }

  document.getElementById('cc-swap').addEventListener('click', function(){
    var cSel = document.getElementById('cc-from');
    var fSel = document.getElementById('cc-to');
    var prevC = cSel.value;
    cSel.value = fSel.value === 'USD' ? 'BTC' : 'ETH';
    calc();
  });

  document.getElementById('cc-refresh').addEventListener('click', function(){
    calc();
    renderPills();
  });

  ['cc-amount','cc-from','cc-to'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc);
  });

  calc();
  renderPills();
  bc(document.getElementById('ccc3'), function(){ return document.getElementById('cc-res').textContent; });
})();

/* ---- WPI TO YARN WEIGHT ---- */
(function(){
  if(!document.getElementById('wp-val'))return;
  function calc(){
    var wpi=+document.getElementById('wp-val').value;
    if(!wpi || wpi<=0){ document.getElementById('wpr').textContent='—'; return; }
    var cat = wpi >= 18 ? '#0 Lace (18+ WPI)' : wpi >= 15 ? '#1 Super Fine / Fingering (14-18 WPI)' : wpi >= 12 ? '#2 Fine / Sport (12-14 WPI)' : wpi >= 11 ? '#3 Light / DK (11-12 WPI)' : wpi >= 9 ? '#4 Medium / Worsted / Aran (9-11 WPI)' : wpi >= 6 ? '#5 Bulky / Chunky (6-8 WPI)' : '#6 Super Bulky (5-6 WPI)';
    var ply = wpi >= 18 ? '2-3 Ply' : wpi >= 15 ? '4 Ply' : wpi >= 12 ? '5 Ply' : wpi >= 11 ? '8 Ply' : wpi >= 9 ? '10-12 Ply' : '14+ Ply';
    var mm = wpi >= 18 ? '1.5–2.25 mm' : wpi >= 15 ? '2.25–3.25 mm' : wpi >= 12 ? '3.25–3.75 mm' : wpi >= 11 ? '3.75–4.5 mm' : wpi >= 9 ? '4.5–5.5 mm' : '5.5–8.0 mm';
    document.getElementById('wpr').textContent=cat;
    document.getElementById('wpinfo').textContent='AU/UK Ply Rating: '+ply+' | Recommended Needle: '+mm;
  }
  ['wp-val'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('wpc'), function(){ return document.getElementById('wpr').textContent; });
})();

/* ---- KNITTING NEEDLE CONVERTER ---- */
(function(){
  if(!document.getElementById('kn-size'))return;
  var map = {
    '2.25': { us: 'US 1', uk: 'UK 13', mm: '2.25 mm' },
    '3.25': { us: 'US 3', uk: 'UK 10', mm: '3.25 mm' },
    '4.0':  { us: 'US 6', uk: 'UK 8',  mm: '4.00 mm' },
    '4.5':  { us: 'US 7', uk: 'UK 7',  mm: '4.50 mm' },
    '5.0':  { us: 'US 8', uk: 'UK 6',  mm: '5.00 mm' },
    '6.0':  { us: 'US 10', uk: 'UK 4', mm: '6.00 mm' },
    '8.0':  { us: 'US 11', uk: 'UK 0', mm: '8.00 mm' },
    '10.0': { us: 'US 15', uk: 'UK 000', mm: '10.00 mm' }
  };
  function calc(){
    var val = document.getElementById('kn-size').value;
    var info = map[val] || map['4.5'];
    document.getElementById('knr').textContent = info.us + ' = ' + info.uk + ' = ' + info.mm;
  }
  document.getElementById('kn-size').addEventListener('change', calc);
  calc();
  bc(document.getElementById('knc'), function(){ return document.getElementById('knr').textContent; });
})();

/* ---- CROCHET HOOK CONVERTER ---- */
(function(){
  if(!document.getElementById('ch-size'))return;
  var map = {
    '2.25': { us: 'US B-1', uk: 'UK 13', mm: '2.25 mm' },
    '3.5':  { us: 'US E-4', uk: 'UK 9',  mm: '3.50 mm' },
    '4.0':  { us: 'US G-6', uk: 'UK 8',  mm: '4.00 mm' },
    '5.0':  { us: 'US H-8', uk: 'UK 6',  mm: '5.00 mm' },
    '5.5':  { us: 'US I-9', uk: 'UK 5',  mm: '5.50 mm' },
    '6.0':  { us: 'US J-10', uk: 'UK 4', mm: '6.00 mm' },
    '6.5':  { us: 'US K-10.5', uk: 'UK 3', mm: '6.50 mm' },
    '9.0':  { us: 'US M/N-13', uk: 'UK 00', mm: '9.00 mm' }
  };
  function calc(){
    var val = document.getElementById('ch-size').value;
    var info = map[val] || map['5.0'];
    document.getElementById('chr').textContent = info.us + ' = ' + info.uk + ' = ' + info.mm;
  }
  document.getElementById('ch-size').addEventListener('change', calc);
  calc();
  bc(document.getElementById('chc'), function(){ return document.getElementById('chr').textContent; });
})();

/* ---- HOMEBREW PRIMING SUGAR ---- */
(function(){
  if(!document.getElementById('ps-vol'))return;
  function calc(){
    var vol=+document.getElementById('ps-vol').value;
    var targetCo2=+document.getElementById('ps-co2').value;
    var temp=+document.getElementById('ps-temp').value;
    if(!vol || vol<=0){ document.getElementById('psr2').textContent='—'; return; }
    var residualCo2 = 3.0378 - (0.050062 * temp) + (0.00026555 * temp * temp);
    var delta = targetCo2 - residualCo2;
    if(delta <= 0) delta = 0.1;
    var cornGrams = delta * vol * 15.1;
    var cornOz = cornGrams / 28.3495;
    var tableGrams = cornGrams * 0.91;
    var dmeGrams = cornGrams * 1.36;
    var honeyGrams = cornGrams * 1.24;
    document.getElementById('psr2').textContent = Math.round(cornGrams) + ' g Corn Sugar (' + fmt(cornOz,1) + ' oz)';
    document.getElementById('psinfo').textContent = 'Table Sugar: ' + Math.round(tableGrams) + 'g | DME: ' + Math.round(dmeGrams) + 'g | Honey: ' + Math.round(honeyGrams) + 'g';
  }
  ['ps-vol','ps-co2','ps-temp'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('psc2'), function(){ return document.getElementById('psr2').textContent; });
})();

/* ---- 3D PRINT COST CALCULATOR ---- */
(function(){
  if(!document.getElementById('pc-wt'))return;
  function calc(){
    var wt=+document.getElementById('pc-wt').value;
    var spool=+document.getElementById('pc-spool').value;
    var hrs=+document.getElementById('pc-hrs').value;
    var pwr=+document.getElementById('pc-pwr').value;
    var elec=+document.getElementById('pc-elec').value;
    if(!wt || wt<=0){ document.getElementById('pcr2').textContent='—'; return; }
    var matCost = (wt / 1000) * spool;
    var kwhUsed = (pwr / 1000) * hrs;
    var elecCost = kwhUsed * elec;
    var total = matCost + elecCost;
    document.getElementById('pcr2').textContent = '$' + fmt(total,2) + ' Total Cost';
    document.getElementById('pcinfo').textContent = 'Filament Material: $' + fmt(matCost,2) + ' | Electricity: $' + fmt(elecCost,2) + ' (' + fmt(kwhUsed,2) + ' kWh used)';
  }
  ['pc-wt','pc-spool','pc-hrs','pc-pwr','pc-elec'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('pcc2'), function(){ return document.getElementById('pcr2').textContent; });
})();

/* ---- US/UK/METRIC CUPS CONVERTER ---- */
(function(){
  if(!document.getElementById('cv-ing'))return;
  function calc(){
    var gPerUsCup=+document.getElementById('cv-ing').value;
    var qty=+document.getElementById('cv-qty').value;
    var cupMl=+document.getElementById('cv-type').value;
    if(!qty || qty<=0){ document.getElementById('cvr').textContent='—'; return; }
    var totalMl = qty * cupMl;
    var totalGrams = (totalMl / 236.588) * gPerUsCup;
    var metricCups = totalMl / 250.0;
    var ukCups = totalMl / 284.13;
    var usCustCups = totalMl / 236.588;
    document.getElementById('cvr').textContent = Math.round(totalGrams) + ' g Weight (' + fmt(totalMl,0) + ' ml)';
    document.getElementById('cvinfo').textContent = 'US Customary: ' + fmt(usCustCups,2) + ' cups | Metric (AU/CA): ' + fmt(metricCups,2) + ' cups | UK Imperial: ' + fmt(ukCups,2) + ' cups';
  }
  ['cv-ing','cv-qty','cv-type'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('change',calc); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('cvc'), function(){ return document.getElementById('cvr').textContent; });
})();

/* ---- US vs UK GALLONS ---- */
(function(){
  if(!document.getElementById('gl-val'))return;
  function calc(){
    var val=+document.getElementById('gl-val').value;
    var from=document.getElementById('gl-from').value;
    if(!val || val<=0){ document.getElementById('glr2').textContent='—'; return; }
    if(from==='us'){
      var ukGal = val * 0.832674;
      var liters = val * 3.78541;
      document.getElementById('glr2').textContent = fmt(ukGal,2) + ' UK Imperial Gallons';
      document.getElementById('glinfo').textContent = 'Metric Volume: ' + fmt(liters,2) + ' Liters (1 US Gal = 3.785 L)';
    } else {
      var usGal = val * 1.20095;
      var liters = val * 4.54609;
      document.getElementById('glr2').textContent = fmt(usGal,2) + ' US Fluid Gallons';
      document.getElementById('glinfo').textContent = 'Metric Volume: ' + fmt(liters,2) + ' Liters (1 UK Gal = 4.546 L)';
    }
  }
  ['gl-val','gl-from'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('glc2'), function(){ return document.getElementById('glr2').textContent; });
})();

/* ---- TIRE PRESSURE PSI BAR KPA ---- */
(function(){
  if(!document.getElementById('pr-val'))return;
  function calc(){
    var val=+document.getElementById('pr-val').value;
    var unit=document.getElementById('pr-unit').value;
    if(!val || val<=0){ document.getElementById('prr').textContent='—'; return; }
    var psi = unit==='psi'? val : unit==='bar'? val * 14.5038 : val / 6.89476;
    var bar = psi / 14.5038;
    var kpa = psi * 6.89476;
    document.getElementById('prr').textContent = fmt(bar,2) + ' BAR (' + Math.round(kpa) + ' kPa)';
    document.getElementById('prinfo').textContent = fmt(psi,1) + ' PSI = ' + fmt(bar,2) + ' BAR = ' + fmt(kpa,1) + ' kPa';
  }
  ['pr-val','pr-unit'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('prc'), function(){ return document.getElementById('prr').textContent; });
})();

/* ---- KIDS CLOTHING SIZE ---- */
(function(){
  if(!document.getElementById('kc-size'))return;
  var map = {
    '2t': { uk: '2-3 Years', eu: '92 cm', ht: '86–92 cm (33–36")', wt: '13–15 kg (28–32 lbs)' },
    '3t': { uk: '3-4 Years', eu: '98 cm', ht: '92–98 cm (36–38.5")', wt: '15–17 kg (32–37 lbs)' },
    '4t': { uk: '4-5 Years', eu: '104 cm', ht: '98–104 cm (38.5–41")', wt: '17–19 kg (37–42 lbs)' },
    '5':  { uk: '5-6 Years', eu: '110 cm', ht: '104–110 cm (41–43.5")', wt: '19–21 kg (42–46 lbs)' },
    '6':  { uk: '6-7 Years', eu: '116 cm', ht: '110–116 cm (43.5–45.5")', wt: '21–24 kg (46–53 lbs)' },
    '7':  { uk: '7-8 Years', eu: '122 cm', ht: '116–122 cm (45.5–48")', wt: '24–27 kg (53–60 lbs)' }
  };
  function calc(){
    var val=document.getElementById('kc-size').value;
    var info=map[val]||map['2t'];
    document.getElementById('kcr').textContent = 'UK: ' + info.uk + ' | EU: ' + info.eu;
    document.getElementById('kcinfo').textContent = 'Child Height Range: ' + info.ht + ' | Weight: ' + info.wt;
  }
  document.getElementById('kc-size').addEventListener('change', calc);
  calc();
  bc(document.getElementById('kcc'), function(){ return document.getElementById('kcr').textContent; });
})();

/* ---- DATE FORMAT RESOLVER ---- */
(function(){
  if(!document.getElementById('dr-p1'))return;
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function calc(){
    var p1=+document.getElementById('dr-p1').value;
    var p2=+document.getElementById('dr-p2').value;
    var yr=+document.getElementById('dr-yr').value || 2024;
    if(!p1 || !p2){ document.getElementById('drr').textContent='—'; return; }
    var isAmbiguous = (p1 <= 12 && p2 <= 12 && p1 !== p2);
    var usStr = (p1<=12 ? months[p1-1] : 'Invalid Month') + ' ' + p2 + ', ' + yr;
    var ukStr = (p2<=12 ? months[p2-1] : 'Invalid Month') + ' ' + p1 + ', ' + yr;
    document.getElementById('drr').textContent = 'US: ' + usStr + ' | UK: ' + ukStr;
    document.getElementById('drinfo').textContent = isAmbiguous ? '⚠️ Ambiguous Date: Both numbers ≤ 12! Explicitly specify MM/DD or DD/MM.' : 'Clear Date: Unambiguous day/month determination.';
  }
  ['dr-p1','dr-p2','dr-yr'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); });
  calc();
  bc(document.getElementById('drc'), function(){ return document.getElementById('drr').textContent; });
})();

/* ---- BUILDING FLOOR CONVERTER ---- */
(function(){
  if(!document.getElementById('fl-val'))return;
  function calc(){
    var val=document.getElementById('fl-val').value;
    var sys=document.getElementById('fl-sys').value;
    if(sys==='uk'){
      if(val==='g') { document.getElementById('flr2').textContent='US Equivalent: 1st Floor'; document.getElementById('flinfo').textContent='UK Ground Floor (G) is called 1st Floor in the US and Canada.'; }
      else if(val==='-1') { document.getElementById('flr2').textContent='US Equivalent: Basement (B1)'; document.getElementById('flinfo').textContent='Basement levels are identical in US and UK elevators.'; }
      else { var num=+val+1; document.getElementById('flr2').textContent='US Equivalent: '+num+(num===2?'nd':num===3?'rd':'th')+' Floor'; document.getElementById('flinfo').textContent='UK '+val+(val==='1'?'st':val==='2'?'nd':val==='3'?'rd':'th')+' floor is one story above ground (US '+num+'th floor).'; }
    } else {
      if(val==='1'||val==='g') { document.getElementById('flr2').textContent='UK Equivalent: Ground Floor (G)'; document.getElementById('flinfo').textContent='US 1st Floor is ground level (UK Ground / G).'; }
      else if(val==='-1') { document.getElementById('flr2').textContent='UK Equivalent: Basement (-1)'; document.getElementById('flinfo').textContent='Basement levels are identical.'; }
      else { var num2=+val-1; document.getElementById('flr2').textContent='UK Equivalent: '+num2+(num2===1?'st':num2===2?'nd':num2===3?'rd':'th')+' Floor'; document.getElementById('flinfo').textContent='US '+val+'th floor is called '+num2+(num2===1?'st':'th')+' Floor in UK.'; }
    }
  }
  ['fl-val','fl-sys'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('flc2'), function(){ return document.getElementById('flr2').textContent; });
})();

/* ---- FUEL ECONOMY ---- */
(function(){
  if(!document.getElementById('fe-val'))return;
  function calc(){
    var val=+document.getElementById('fe-val').value;
    var unit=document.getElementById('fe-unit').value;
    if(!val || val<=0){ document.getElementById('fer').textContent='—'; return; }
    var usMpg, ukMpg, l100;
    if(unit==='us_mpg'){
      usMpg = val;
      ukMpg = val * 1.20095;
      l100 = 235.215 / val;
    } else if(unit==='uk_mpg'){
      ukMpg = val;
      usMpg = val / 1.20095;
      l100 = 282.481 / val;
    } else {
      l100 = val;
      usMpg = 235.215 / val;
      ukMpg = 282.481 / val;
    }
    document.getElementById('fer').textContent = fmt(usMpg,1) + ' US MPG | ' + fmt(ukMpg,1) + ' UK MPG | ' + fmt(l100,2) + ' L/100km';
    document.getElementById('feinfo').textContent = '1 UK Gallon = 1.20 US Gallons | Canada/Europe uses L/100km.';
  }
  ['fe-val','fe-unit'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('input',calc); if(el) el.addEventListener('change',calc); });
  calc();
  bc(document.getElementById('fec'), function(){ return document.getElementById('fer').textContent; });
})();

})();
