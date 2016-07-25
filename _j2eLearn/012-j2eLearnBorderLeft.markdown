---
layout: j2e-layout
title:  "borderLeft"
categories: j2eLearn
pageType: j2eLearn
---

> # **borderLeft**
> CSS border-left 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
borderLeft: borderWidth borderColor
```

| 속 성 | 형 식|
|---|---|
| borderWidth | Xpx |
| borderColor | red |
| borderColor | #000000 |
| borderColor | rgb(255,255,255) |


<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, borderLeft:"변경값"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeBottomButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, borderLeft:"변경값"}]});
</pre>

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
<div id="trasitionBottomButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;">
  <span>click me</span>
</div>
</div>
