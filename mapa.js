/* Desenha o mapa de processos. Usado por index.html e admin.html.
   MAPA.render(svg, setores, {P, badge(code,x,y), legend}) */
window.MAPA=(function(){
var STEP=40;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function curve(x1,y1,x2,y2){var m=(x1+x2)/2;return '<path class="ln" d="M'+x1+','+y1+' C'+m+','+y1+' '+m+','+y2+' '+x2+','+y2+'"/>'}
function hh(l){return l.reduce(function(a,s){return a+Math.max(1,s.ps.length)*STEP+20},0)}
function render(svg,S,o){
  o=o||{};var P=o.P||{},badge=o.badge||function(){return""};
  var cx=650,top=40,h="";
  var L=S.filter(function(s){return s.side==="n"}),R=S.filter(function(s){return s.side==="a"}),F=S.filter(function(s){return s.side==="m"})[0];
  var colH=Math.max(hh(L),hh(R),260),cy=top+colH/2,pos={};
  function lay(list){
    var y=cy-hh(list)/2+STEP/2;
    list.forEach(function(s){
      var n=Math.max(1,s.ps.length);
      pos[s.id]={sy:y+(n-1)*STEP/2,ly:s.ps.map(function(p,i){return y+i*STEP})};
      y+=n*STEP+20;
    });
  }
  lay(L);lay(R);
  var mainN={x:455,w:110},mainA={x:735,w:110};
  h+='<g class="ctr"><circle cx="'+cx+'" cy="'+cy+'" r="56"/><text x="'+cx+'" y="'+(cy-2)+'">Fibravit</text><text x="'+cx+'" y="'+(cy+20)+'" style="font-size:13px;font-weight:600">nossos processos</text></g>';
  h+='<g class="k-n"><path class="ln" d="M'+(cx-56)+','+cy+' L'+(mainN.x+mainN.w)+','+cy+'"/></g><g class="k-a"><path class="ln" d="M'+(cx+56)+','+cy+' L'+mainA.x+','+cy+'"/></g>';
  h+='<g class="main k-n"><rect x="'+mainN.x+'" y="'+(cy-24)+'" width="110" height="48" rx="24"/><text x="'+(mainN.x+55)+'" y="'+(cy+6)+'" text-anchor="middle">Negócio</text></g>';
  h+='<g class="main k-a"><rect x="'+mainA.x+'" y="'+(cy-24)+'" width="110" height="48" rx="24"/><text x="'+(mainA.x+55)+'" y="'+(cy+6)+'" text-anchor="middle">Apoio</text></g>';
  function sector(s,left){
    var k="k-"+s.side,sx=left?275:885,sw=160,q=pos[s.id];
    var from=left?mainN.x:mainA.x+mainA.w,to=left?sx+sw:sx;
    h+='<g class="'+k+'" data-s="'+esc(s.id)+'">'+curve(from,cy,to,q.sy);
    h+='<g class="sec" data-sid="'+esc(s.id)+'"><rect x="'+sx+'" y="'+(q.sy-18)+'" width="'+sw+'" height="36" rx="18"/><text x="'+(sx+sw/2)+'" y="'+(q.sy+6)+'" text-anchor="middle">'+esc(s.name)+'</text></g>';
    s.ps.forEach(function(p,i){
      var ly=q.ly[i],lx=left?5:1065,lw=left?250:225;
      h+=curve(left?sx:sx+sw,q.sy,left?lx+lw:lx,ly);
      h+='<g class="leaf" tabindex="0" role="button" data-c="'+esc(p[0])+'" aria-label="'+esc(p[3])+'"><rect x="'+lx+'" y="'+(ly-16)+'" width="'+lw+'" height="32" rx="16"/><text x="'+(lx+14)+'" y="'+(ly+5)+'">'+esc(p[1])+'  '+esc(p[2])+(p[6]?' *':'')+'</text>'+badge(p[0],left?lx:lx+lw,ly)+'</g>';
      P[p[0]]={p:p,s:s};
    });
    h+='</g>';
  }
  L.forEach(function(s){sector(s,true)});R.forEach(function(s){sector(s,false)});
  var H=top+colH+30;
  if(F){
    var fy=cy+200,ly=fy+80,n=F.ps.length;H=Math.max(H,ly+70);
    h+='<g class="k-m" data-s="'+esc(F.id)+'"><path class="ln" d="M'+cx+','+(cy+56)+' L'+cx+','+(fy-22)+'"/>';
    h+='<g class="main" data-sid="'+esc(F.id)+'"><rect x="'+(cx-55)+'" y="'+(fy-22)+'" width="110" height="44" rx="22"/><text x="'+cx+'" y="'+(fy+6)+'" text-anchor="middle">'+esc(F.name)+'</text></g>';
    F.ps.forEach(function(p,i){
      var lw=150,lx=cx-(n*170-20)/2+i*170;
      h+='<path class="ln" d="M'+cx+','+(fy+22)+' C'+cx+','+(ly-30)+' '+(lx+lw/2)+','+(ly-30)+' '+(lx+lw/2)+','+(ly-16)+'"/>';
      h+='<g class="leaf" tabindex="0" role="button" data-c="'+esc(p[0])+'" aria-label="'+esc(p[3])+'"><rect x="'+lx+'" y="'+(ly-16)+'" width="'+lw+'" height="32" rx="16"/><text x="'+(lx+12)+'" y="'+(ly+5)+'">'+esc(p[1])+'  '+esc(p[2])+'</text>'+badge(p[0],lx+lw,ly)+'</g>';
      P[p[0]]={p:p,s:F};
    });
    h+='</g>';
  }
  if(o.legend)h+='<text x="20" y="'+(H-15)+'" style="font-size:13px;fill:var(--muted)">'+esc(o.legend)+'</text>';
  svg.setAttribute("viewBox","0 0 1300 "+H);
  svg.innerHTML=h;
  return P;
}
return{render:render};
})();
