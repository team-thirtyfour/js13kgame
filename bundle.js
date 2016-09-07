"use strict";!function(){var e=function(e,i){return{entities:e,gravity:i,movableEntities:e.filter(function(e){return e.isMovable}),playerEntity:e.find(function(e){return e.isPlayer})}},i=function(e,i,t,n,r,o,c,a,l,h,u,d,f,s,v,y){return{x:e,y:i,width:t,height:n,velX:r,velY:o,collisionFactorX:c,collisionFactorY:a,forme:l,color:h,isMovable:u,isPlayer:d,isKiller:f,isFinisher:s,childFactory:y,collider:v,isKilled:!1,canJump:!1}},t={RECT:0,CIRCLE:1,TRIANGLE:2,TRIANGLE_DOWN:3},n=!0,r=function(e,i,n){var r=o(e,n);i.fillStyle=n.color,i.beginPath(),n.forme===t.RECT?i.rect(r.x,r.y,r.width,r.height):n.forme===t.CIRCLE?i.arc(r.x+r.width/2,r.y+r.height/2,r.width/2,0,2*Math.PI):n.forme===t.TRIANGLE?(i.moveTo(r.x+r.width/2,r.y),i.lineTo(r.x+r.width,r.y+r.height),i.lineTo(r.x,r.y+r.height)):n.forme===t.TRIANGLE_DOWN&&(i.moveTo(r.x,r.y),i.lineTo(r.x+r.width,r.y),i.lineTo(r.x+r.width/2,r.y+r.height)),i.closePath(),i.fill()},o=function(e,i){return{x:i.x*e.width/100,y:i.y*e.height/100,width:i.width*e.width/100,height:i.height*e.height/100}},c=function(e,i){var t=e.getContext("2d");t.clearRect(0,0,e.width,e.height),i.forEach(function(i){return r(e,t,i)})},a={init:function(){n=!0},render:function(e){n&&(n=!1,c(l,e.entities.filter(function(e){return!e.isMovable}))),c(h,e.entities.filter(function(e){return e.isMovable}))}},l=document.createElement("canvas");l.width=.8*window.innerWidth,l.height=.8*window.innerHeight,document.getElementsByTagName("body")[0].appendChild(l);var h=document.createElement("canvas");h.width=.8*window.innerWidth,h.height=.8*window.innerHeight,document.getElementsByTagName("body")[0].appendChild(h),window.addEventListener("resize",function(){l.width=.8*window.innerWidth,l.height=.8*window.innerHeight,h.width=.8*window.innerWidth,h.height=.8*window.innerHeight,n=!0},!1);var u=0,d=function(e,i){i||(i=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),n=t.exec(i);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null},f={level:function(){var e=d("map"),i=d("gravity");return s(e&&i?[parseFloat(i),e]:v[u])},next:function(){u<v.length-1?u++:window.alert("win")},previous:function(){u>0&&u--}},s=function(n){var r=n[1].split("|"),o=r.map(function(e){var n=e.split(",");switch(n[0]){case"J":return i(+n[1],+n[2],2,2,0,0,0,0,t.CIRCLE,"red",!0,!0,!1,!1,!0);case"M":return i(+n[1],+n[2],+n[3],+n[4],0,0,0,-.1,t.RECT,"grey",!1,!1,!1,!1,!1);case"T":return i(+n[1],+n[2],+n[3],+n[4],0,0,0,-.5,t.RECT,"blue",!1,!1,!1,!1,!1);case"T_C":return i(+n[1],+n[2],+n[3],+n[4],0,0,0,0,t.RECT,"violet",!0,!1,!1,!1,!0);case"G":return i(+n[1],+n[2],3,5,0,0,0,0,t.RECT,"violet",!1,!1,!1,!0,!1);case"F":return i(+n[1],+n[2],+n[3],+n[4],0,0,0,0,t.TRIANGLE_DOWN,"orange",!1,!1,!0,!1,!1);case"A":return i(+n[1],+n[2],2,2,0,0,0,0,t.CIRCLE,"pink",!1,!1,!0,!1,!1,function(){return i(50,50,.5,.5,0,0,0,0,t.CIRCLE,"pink",!0,!1,!0,!1,!1)})}});return e(o,n[0])},v=[[1,"J,10,10|T,0,90,90,2|G,90,90|A,50,50"],[1,"J,10,10|T,0,50,80,2|M,50,10,2,40|G,70,45|F,10,0,20,5|F,30,0,10,8|F,40,0,5,3|F,45,0,10,3|F,55,0,10,5"],[1,"J,50,10|T,0,90,95,2|G,90,5|F,55,0,10,10"]],y=function(e){var i=parseFloat(document.getElementById("gravityInput").value);isNaN(i)||(e.gravity=i)},w={update:function(e,i){e.movableEntities.forEach(function(t){t.x+=i*t.velX,t.velX=0,t.y+=i*t.velY,t.velY+=e.gravity})}},g=0,E=1,m=2,p=3,x=function(e,i){var t=!(e.x>=i.x+i.width||e.x+e.width<=i.x||e.y>=i.y+i.height||e.y+e.height<=i.y);if(t)return e.x>i.x&&e.y>i.y?i.y>e.y-e.height?g:p:e.x<i.x&&e.y>i.y?i.y>e.y-e.height?g:E:e.x<i.x&&e.y<i.y?i.y<e.y+e.height?m:E:i.y<e.y+e.height?m:p},T=function(e){return e.x>100||e.x<0||e.y>100||e.y<0},C={check:function(e){var i=!1;return e.playerEntity.canJump=!1,e.entities.forEach(function(t){e.entities.forEach(function(n){if(t!==n&&t.collider){var r=x(t,n);void 0!==r&&(r===m?(t.velX*=n.collisionFactorX,t.velY*=n.collisionFactorY,t.y=n.y-t.height):r===g?(t.velX*=n.collisionFactorX,t.velY*=n.collisionFactorY,t.y=n.y+t.height):r===E?t.x=n.x-t.width:r===p&&(t.x=n.x+n.width),t===e.playerEntity&&(n.collisionFactorY<0&&(t.canJump=!0),n.isKiller&&(t.isKilled=!0),i=n.isFinisher))}})}),i},checkGameOver:function(e){var i=e.playerEntity;return i.isKilled||T(i)},garbageOffScreenEntities:function(e){for(var i=e.entities.length-1;i>-1;i--){var t=e.entities[i];T(t)&&e.entities.splice(e.entities.indexOf(t),1)}}},F=[!1,!1,!1],R=function(e){return function(i){var t=i.keyCode-37;void 0!==F[t]&&(F[t]=e)}};window.addEventListener("keydown",R(!0),!1),window.addEventListener("keyup",R(!1),!1);var I=50,b=-50,L=function(e){var i=e.playerEntity;F[0]?i.velX=-I:F[2]&&(i.velX=I),F[1]&&i.canJump&&(i.velY+=b)},N=60,G=requestAnimationFrame||function(e){setTimeout(e,1/N*1e3)},X=0,Y=function(e,i,t){var n=0,r=function r(){X++;var o=Date.now(),c=(o-n)/1e3;if(C.garbageOffScreenEntities(e),L(e),y(e),C.checkGameOver(e)&&n>0)return t();w.update(e,c);var l=C.check(e);return l?i():(X%25===0&&e.entities.filter(function(e){return void 0!==e.childFactory}).forEach(function(i){var t=i.childFactory();e.entities.push(t),e.movableEntities.push(t)}),a.render(e),n=o,void G(r))};a.init(),r()},k=function(){f.next(),J()},A=function(){f.previous(),J()},J=function(){var e=f.level();y(e),Y(e,k,A)};J()}();