---
layout: j2e-layout
title:  "font"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-26 13:20:28 +0900
lastmod: 2016-07-26 13:20:28 +0900
---

> # **font**
> CSS font 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **role Syntax**


```
font: fontWeight fontSize/lineHeight
```

| 속 성 | 형 식|
|---|---|
| fontWeight | normal, bold, bolder, lighter, 100, 200, 300, 400, 500, 600, 700, 800, 900 |
| fontSize | xx-small, x-small, small, medium, large, x-large, xx-large, smaller, larger, Xpx, X% |
| lineHeight | X, Xpx, X% |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, font:"이동점"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="width:200px; height:100px; position:absolute; too:10px; left:10px; border: 1px solid black">
    <p>click me</p>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, font:"이동점"}]});
</pre>

<br />

> ### **Example**

<div id="demo_contain2" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="width:200px; height:100px; position:absolute; top:10px; left:10px; border: 1px solid black">
    <span>click me</span>
  </div>
</div>
