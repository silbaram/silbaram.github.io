---
layout: j2e-layout
title:  "marginRight"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-26 17:44:58 +0900
lastmod: 2016-07-26 17:44:58 +0900
---

> # **marginRight**
> CSS margin-left 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
marginRight: length
```

| 속 성 | 형 식|
|---|---|
| length | Xpx, X% |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, marginRight:"이동점"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="float:left; width:100px; height:100px; background-color:#D941C5; border:1px solid">
    <span>click me</span>
  </div>
  <div style="float:left; width:100px; height:100px; background-color:#D941C5; border:1px solid;">

  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, marginRight:"이동점"}]});
</pre>

<br />

> ### **Example**

<div id="demo_contain2" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="float:left; width:100px; height:100px; background-color:#D941C5; border:1px solid">
    <span>click me</span>
  </div>
  <div style="float:left; width:100px; height:100px; background-color:#D941C5; border:1px solid;">

  </div>
</div>
