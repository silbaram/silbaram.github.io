---
layout: j2e-layout
title:  "perspectiveOrigin"
categories: j2eLearn
pageType: j2eLearn
---

> # **perspectiveOrigin**
> CSS perspective-origin 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
perspectiveOrigin: x-axis y-axis
```

| 속 성 | 형 식|
|---|---|
| x-axis | left, center, right, px, % |
| y-axis | left, center, right, px, % |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, perspectiveOrigin:"이동점"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="position: relative; margin: auto; height: 150px; width: 250px; padding: 10px; border: 0px solid black; -webkit-perspective: 200px; perspective: 200px;">
    <div style="padding: 50px; position: absolute; border: 1px solid black; background-color: red; -webkit-transform: rotateX(45deg); transform: rotateX(45deg);">click me </div>
  </div>
</div>





<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, perspectiveOrigin:"이동점"}]});
</pre>

<br />

> ### **Example**

<div id="demo_contain2" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="position: relative; margin: auto; height: 150px; width: 250px; padding: 10px; border: 0px solid black; -webkit-perspective: 200px; perspective: 200px;">
    <div style="padding: 50px; position: absolute; border: 1px solid black; background-color: red; -webkit-transform: rotateX(45deg); transform: rotateX(45deg);">click me </div>
  </div>
</div>
