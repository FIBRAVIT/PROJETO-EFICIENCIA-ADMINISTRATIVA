/* Desenha o mapa de processos. Usado por index.html e admin.html.
   MAPA.render(svg, setores, {P, badge(code,x,y), legend}) */
window.MAPA=(function(){
var STEP=50;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function curve(x1,y1,x2,y2){var m=(x1+x2)/2;return '<path class="ln" d="M'+x1+','+y1+' C'+m+','+y1+' '+m+','+y2+' '+x2+','+y2+'"/>'}
function hh(l){return l.reduce(function(a,s){return a+Math.max(1,s.ps.length)*STEP+20},0)}
function render(svg,S,o){
  o=o||{};var P=o.P||{},badge=o.badge||function(){return""};
  var cx=725,top=30,h="";
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
  var mainN={x:525,w:120},mainA={x:805,w:120};
  h+='<g class="ctr"><circle cx="'+cx+'" cy="'+cy+'" r="68" style="fill:var(--ink)"/><text x="'+cx+'" y="'+(cy+2)+'" style="fill:var(--bg);font-size:30px">Fibravit</text><text x="'+cx+'" y="'+(cy+26)+'" style="fill:var(--bg);font-size:14px;font-weight:600">nossos processos</text></g>';
  h+='<g class="k-n"><path class="ln" d="M'+(cx-68)+','+cy+' L'+(mainN.x+mainN.w)+','+cy+'"/></g><g class="k-a"><path class="ln" d="M'+(cx+68)+','+cy+' L'+mainA.x+','+cy+'"/></g>';
  h+='<g class="main k-n"><rect x="'+mainN.x+'" y="'+(cy-27)+'" width="120" height="54" rx="27"/><text x="'+(mainN.x+60)+'" y="'+(cy+8)+'" text-anchor="middle">Negócio</text></g>';
  h+='<g class="main k-a"><rect x="'+mainA.x+'" y="'+(cy-27)+'" width="120" height="54" rx="27"/><text x="'+(mainA.x+60)+'" y="'+(cy+8)+'" text-anchor="middle">Apoio</text></g>';
  function sector(s,left){
    var k="k-"+s.side,sx=left?305:945,sw=200,q=pos[s.id];
    var from=left?mainN.x:mainA.x+mainA.w,to=left?sx+sw:sx;
    h+='<g class="'+k+'" data-s="'+esc(s.id)+'">'+curve(from,cy,to,q.sy);
    h+='<g class="sec" data-sid="'+esc(s.id)+'"><rect x="'+sx+'" y="'+(q.sy-21)+'" width="'+sw+'" height="42" rx="21"/><text x="'+(sx+sw/2)+'" y="'+(q.sy+7)+'" text-anchor="middle">'+esc(s.name)+'</text></g>';
    s.ps.forEach(function(p,i){
      var ly=q.ly[i],lx=left?5:1165,lw=280;
      h+=curve(left?sx:sx+sw,q.sy,left?lx+lw:lx,ly);
      h+='<g class="leaf" tabindex="0" role="button" data-c="'+esc(p[0])+'" aria-label="'+esc(p[3])+'"><rect x="'+lx+'" y="'+(ly-20)+'" width="'+lw+'" height="40" rx="20"/><text x="'+(lx+16)+'" y="'+(ly+5)+'">'+esc(p[1])+'  '+esc(p[2])+(p[6]?' *':'')+'</text>'+badge(p[0],left?lx:lx+lw,ly)+'</g>';
      P[p[0]]={p:p,s:s};
    });
    h+='</g>';
  }
  L.forEach(function(s){sector(s,true)});R.forEach(function(s){sector(s,false)});
  var H=top+colH+40;
  if(F){
    var fy=cy+205,ly=fy+95,n=F.ps.length;H=Math.max(H,ly+60);
    h+='<g class="k-m" data-s="'+esc(F.id)+'"><path class="ln" d="M'+cx+','+(cy+68)+' L'+cx+','+(fy-24)+'"/>';
    h+='<g class="main" data-sid="'+esc(F.id)+'"><rect x="'+(cx-60)+'" y="'+(fy-24)+'" width="120" height="48" rx="24"/><text x="'+cx+'" y="'+(fy+7)+'" text-anchor="middle">'+esc(F.name)+'</text></g>';
    F.ps.forEach(function(p,i){
      var lw=190,lx=cx-(n*215-25)/2+i*215;
      h+='<path class="ln" d="M'+cx+','+(fy+24)+' C'+cx+','+(ly-34)+' '+(lx+lw/2)+','+(ly-34)+' '+(lx+lw/2)+','+(ly-20)+'"/>';
      h+='<g class="leaf" tabindex="0" role="button" data-c="'+esc(p[0])+'" aria-label="'+esc(p[3])+'"><rect x="'+lx+'" y="'+(ly-20)+'" width="'+lw+'" height="40" rx="20"/><text x="'+(lx+16)+'" y="'+(ly+5)+'">'+esc(p[1])+'  '+esc(p[2])+'</text>'+badge(p[0],lx+lw,ly)+'</g>';
      P[p[0]]={p:p,s:F};
    });
    h+='</g>';
  }
  if(o.legend)h+='<text x="20" y="'+(H-12)+'" style="font-size:15px;fill:var(--muted)">'+esc(o.legend)+'</text>';
  svg.setAttribute("viewBox","0 0 1450 "+H);
  svg.innerHTML=h;
  return P;
}
return{render:render};
})();
