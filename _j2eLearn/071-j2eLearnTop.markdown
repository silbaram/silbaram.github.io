---
layout: j2e-layout
title:  "top"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-27 18:27:58 +0900
lastmod: 2016-07-27 18:27:58 +0900
---

> # **top**
> CSS top 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**

```
top: length
```

| 속 성 | 형 식|
|---|---|
| length | Xpx, X% |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 0, top:"시작점"}, {share: 100, top:"이동점"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="demo_contain" style="height:600px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, top:"이동점"}]});
</pre>

<br />

> ### **Example**

<div id="demo_contain2" style="height:600px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>
