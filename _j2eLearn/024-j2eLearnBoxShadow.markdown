---
layout: j2e-layout
title:  "boxShadow"
categories: j2eLearn
pageType: j2eLearn
---

> # **boxShadow**
> CSS box-shadow 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **role Syntax**


```
box-shadow: none | h-shadow v-shadow [blur] [spread] color
```

| 속 성 | 형 식|
|---|---|
| h-shadow | Xpx |
| v-shadow | Xpx |
| blur | Xpx |
| spread | Xpx |
| color | red |
| color | #000000 |
| color | rgb(255,255,255) |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, boxShadow:"이동점"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="width:100px; height:100px; position:absolute; too:10px; left:10px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, boxShadow:"이동점"}]});
</pre>

<br />

> ### **Example**

<div id="demo_contain2" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="width:100px; height:100px; position:absolute; top:10px; left:10px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>
