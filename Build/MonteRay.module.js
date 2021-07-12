/* MonteRay Alpha 1 Copyright (c) 2021 Tech Labs, Inc. https://techlabsinc.github.io/MonteRay/LICENSE */
 var _=_||{};_.PathtracingRenderer=function(i){this.VERSION="Alpha 1";var M=Math.pow(.1,-52);i=i||{},console.log("Rendering provided by MonteRay "+this.VERSION+" https://techlabsinc.github.io/MonteRay/LICENSE");var f;i.canvas?f=i.canvas:f=document.createElement("canvas");var C=f.getContext("2d",{alpha:i.alpha===!0}),p,B,U,F,w,Z=new THREE.Color(0);this.domElement=f,this.autoClear=!0,this.setClearColor=function(n){Z.set(n)},this.setPixelRatio=function(n){w=n,this.setSize(p*w,B*w)},this.setSize=function(n,m){p=Math.round(n/w),B=Math.round(m/w),U=p/2,F=B/2,f.style.width=n+"px",f.style.height=m+"px"},this.setSize(f.width,f.height),this.setPixelRatio(1),this.clear=function(){},(!i.BVHAcceleration||i.BVHAcceleration&&i.BVHAcceleration!=!1)&&(THREE.BufferGeometry.prototype.computeBoundsTree=MeshBVHLib.computeBoundsTree,THREE.BufferGeometry.prototype.disposeBoundsTree=MeshBVHLib.disposeBoundsTree,THREE.Mesh.prototype.raycast=MeshBVHLib.acceleratedRaycast);function oe(n,m){return Math.floor(Math.random()*(m-n+1))+n}var G=1;this.download=function(){var n=document.createElement("a");n.setAttribute("href",f.toDataURL()),n.setAttribute("download",document.title+"_"+G+".png"),G++,n.style.display="none",document.body.appendChild(n),n.onclick=function(m){m.stopPropagation()},n.click(),document.body.removeChild(n),i.nextFrame()};var E=1;this.render=function(n,m){var v=p,h=B,ne=U,le=F;f.width=v,f.height=h;var R=1,ce=Math.PI*2,I=new THREE.Color(0),t=new THREE.Raycaster;t.firstHitOnly=!0;for(var P=[],Q=new THREE.Vector2(1/v,1/h),z=0;z<h;z++)for(var D=0;D<v;D++)P.push(new THREE.Vector2((D+.5)/v*2-1,-((z+.5)/h)*2+1));n.updateMatrixWorld(),m.updateMatrixWorld();try{document.getElementById("sa").innerHTML="Analyzing scene..."}catch(e){}var O=[];n.traverseVisible(function(e){try{(!i.BVHAcceleration||i.BVHAcceleration&&i.BVHAcceleration!=!1)&&e instanceof THREE.Mesh&&e.geometry.computeBoundsTree(),I.equals(e.material.emissive)||O.push([e,new MeshSurfaceSampler(e).build()])}catch(o){}});var k=O.length;try{document.getElementById("sa").innerHTML="Pre-rendering..."}catch(e){}for(var S=[],u=[],$=P.length,T=0;T<$;T++){var b=new THREE.Color(0),N=P[T];t.setFromCamera(N,m);var y=t.intersectObjects(n.children,!0)[0],W=1;if(y==null)b.add(n.background);else try{if(I.equals(y.object.material.emissive))y.object.material.isMeshBasicMaterial?b.copy(y.object.material.colors):(b.setScalar(y.distance/m.far),S.push([N,y,2,new THREE.Color(0),T*4]),i.alpha&&(W=0));else{var q=1;y.object.material.emissiveIntensity&&(q=y.object.material.emissiveIntensity),b.copy(y.object.material.color),b.multiply(y.object.material.emissive.clone().multiplyScalar(q))}}catch(e){b.setScalar(y.distance/m.far),S.push([N,y,2,new THREE.Color(0),T*4]),i.alpha&&(W=0)}u.push(b.r*255),u.push(b.g*255),u.push(b.b*255),u.push(W*255)}var x=new ImageData(new Uint8ClampedArray(u),v,h);C.putImageData(x,0,0),S.sort(function(e,o){return e[1].distance-o[1].distance});function ee(e){return e.face.normal.clone().applyMatrix3(new THREE.Matrix3().getNormalMatrix(e.object.matrixWorld)).normalize()}var g=!1;function s(e,o){var r;if(r=t.intersectObjects(n.children,!0)[0],r==null)return n.background;if(o>4&&(o>20||Math.random()>Math.max(r.object.material.color.r,Math.max(r.object.material.color.g,r.object.material.color.b))))return I;var l=ee(r),c=I.clone();if(I.equals(r.object.material.emissive)){if(r.object.material.mirror||r.object.material.metalness==1)return t.ray.origin.copy(r.point),t.ray.direction.reflect(l),s([e[0],r,e[2],e[3],e[4]],o+1);if(r.object.material.glass)return g==!1?(t.ray.origin.copy(r.point.addScaledVector(l,-M)),t.ray.direction.lerp(l.clone().negate(),r.object.material.refractionRatio),g=!0,s([e[0],r,e[2],e[3],e[4]],o+1)):(t.ray.origin.copy(r.point.addScaledVector(l,M)),t.ray.direction.lerp(l,r.object.material.refractionRatio),g=!1,s([e[0],r,e[2],e[3],e[4]],o));var A=0,X=1;for(i.lightSamples&&(X=Math.floor(Math.random()*i.lightSamples));A<X;){var L=new THREE.Vector3,Y=O[Math.floor(Math.random()*k)];if(Y[1].sample(L),L.copy(Y[0].localToWorld(L)),t.set(r.point.addScaledVector(l,1e-12),new THREE.Vector3().normalize()),t.ray.lookAt(L),i.advancedLighting)if(Math.random()>.5){var a=s([e[0],r,e[2],e[3],e[4]],o+1),j=l.dot(t.ray.direction);c.add(r.object.material.color.clone().multiply(a.clone().multiplyScalar(j)))}else{var a=t.intersectObjects(n.children,!0)[0],j=l.dot(t.ray.direction);if(i.recursiveLighting){if(a!=null){var d=1;a.object.material.emissiveIntensity&&(d=a.object.material.emissiveIntensity),c.add(a.object.material.color.clone().multiply(a.object.material.emissive.clone().multiplyScalar(d)))}else a.object.material.mirror||a.object.material.metalness==1?(t.ray.origin.copy(a.point),t.ray.direction.reflect(l),c.add(s([e[0],a,e[2],e[3],e[4]],o+1))):a.object.material.glass?g==!1?(t.ray.origin.copy(a.point.addScaledVector(l,-M)),t.ray.direction.lerp(l.clone().negate(),a.object.material.refractionRatio),g=!0,c.add(s([e[0],a,e[2],e[3],e[4]],o+1))):(t.ray.origin.copy(a.point.addScaledVector(l,M)),t.ray.direction.lerp(l,a.object.material.refractionRatio),g=!1,c.add(s([e[0],a,e[2],e[3],e[4]],o))):c.add(n.background);c.multiply(r.object.material.color)}else if(a!=null){var j=l.dot(t.ray.direction),d=1;a.object.material.emissiveIntensity&&(d=a.object.material.emissiveIntensity),c.add(r.object.material.color.clone().multiply(a.object.material.color.clone().multiply(a.object.material.emissive.clone().multiplyScalar(j).multiplyScalar(k).multiplyScalar(d))))}}else{var a=t.intersectObjects(n.children,!0)[0],j=l.dot(t.ray.direction);if(i.recursiveLighting){if(a!=null){var d=1;a.object.material.emissiveIntensity&&(d=a.object.material.emissiveIntensity),c.add(a.object.material.color.clone().multiply(a.object.material.emissive.clone().multiplyScalar(d)))}else a.object.material.mirror||a.object.material.metalness==1?(t.ray.origin.copy(a.point),t.ray.direction.reflect(l),c.add(s([e[0],a,e[2],e[3],e[4]],o+1))):a.object.material.glass?g==!1?(t.ray.origin.copy(a.point.addScaledVector(l,-M)),t.ray.direction.lerp(l.clone().negate(),a.object.material.refractionRatio),g=!0,c.add(s([e[0],a,e[2],e[3],e[4]],o+1))):(t.ray.origin.copy(a.point.addScaledVector(l,M)),t.ray.direction.lerp(l,a.object.material.refractionRatio),g=!1,c.add(s([e[0],a,e[2],e[3],e[4]],o))):c.add(n.background);c.multiply(r.object.material.color).multiplyScalar(l.dot(t.ray.direction))}else if(a!=null){var j=l.dot(t.ray.direction),d=1;a.object.material.emissiveIntensity&&(d=a.object.material.emissiveIntensity),c.add(r.object.material.color.clone().multiply(a.object.material.color.clone().multiply(a.object.material.emissive.clone().multiplyScalar(j).multiplyScalar(k).multiplyScalar(d))))}}A++}i.lightSamples&&c.multiplyScalar(1/(A+1)),J.lookAt(l);var re=new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()*.5).applyQuaternion(J.quaternion);t.set(r.point,re);var de=1/(2*Math.PI),j=l.dot(t.ray.direction),me=1/Math.PI,te=s([e[0],r,e[2],e[3],e[4]],o+1);return c.multiplyScalar(1).add(r.object.material.color.clone().multiply(te).multiplyScalar(j*2))}else{var d=1;return r.object.material.emissiveIntensity&&(d=r.object.material.emissiveIntensity),r.object.material.color.clone().multiply(r.object.material.emissive.clone().multiplyScalar(d))}}var J=new THREE.Object3D,H=0;i.fps||(E=S.length,i.pixelBatchSize&&(E=i.pixelBatchSize));var V=0,ae=this;try{document.getElementById("sa").innerHTML=v+"x"+h+"<br />Rendering 1 sample per pixel..."}catch(e){}function K(){try{for(var e=0;e<E;e++){var o=S[H],r=S[H][2]-1;if(r<1&&(r=1),t.setFromCamera(new THREE.Vector2(o[0].x+(Math.random()-.5)*Q.x,o[0].y+(Math.random()-.5)*Q.y),m),o[3].multiplyScalar(r-1),o[3].add(s(o,0)),o[3].multiplyScalar(1/r),S[H][2]++,H++,u[o[4]]=o[3].r*255,u[o[4]+1]=o[3].g*255,u[o[4]+2]=o[3].b*255,u[o[4]+3]=255,H>=S.length){if(H=0,(i.maxSamples||i.downloadInterval)&&(R>=i.maxSamples||R%i.downloadInterval==0)){var l=new ImageData(new Uint8ClampedArray(u),v,h);if(C.putImageData(l,0,0),ae.download(),R>=i.maxSamples){try{document.getElementById("sa").innerHTML="Render Complete"}catch(A){}return}}R++;try{document.getElementById("sa").innerHTML=v+"x"+h+"<br />Rendering "+R+" samples per pixel..."}catch(d){}}}var l=new ImageData(new Uint8ClampedArray(u),v,h);if(C.putImageData(l,0,0),i.fps){var c=performance.now();c-V>1e3/i.fps?E-=10:c-V<1e3/i.fps&&(E+=100),E<1&&(E=1);try{document.getElementById("sa").innerHTML=v+"x"+h+"<br />"+R+"spp "+E+"ppf "+Math.round(1/((c-V)/1e3))+"fps"}catch(d){}V=performance.now()}}catch(d){console.log(d)}setTimeout(K,0)}setTimeout(K,0)}};var ie=_.PathtracingRenderer;export{ie as PathtracingRenderer};
