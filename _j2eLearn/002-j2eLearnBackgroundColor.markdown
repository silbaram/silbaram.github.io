---
layout: j2e-layout
title:  "backgroundColor"
categories: j2eLearn
pageType: j2eLearn
---

> # **backgroundColor**
> CSS background-color 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **role Syntax**

```
backgroundColor: color
```

| 속 성 | 형 식|
|---|---|
| color | red |
| color | #000000 |
| color | rgb(255,255,255) |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, backgroundColor:"변경값"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="keyframeButton" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
    <span>click me</span>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, backgroundColor:"변경값"}]});
</pre>

<br />

> ### **Example**

<div id="trasitionButton" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <span>click me</span>
</div>
