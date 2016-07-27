---
layout: j2e-layout
title:  "borderBottomRightRadius"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-26 10:07:08 +0900
lastmod: 2016-07-26 10:07:08 +0900
---

> # **borderBottomRightRadius**
> CSS border-bottom-right-radius 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
borderBottomRightRadius: length|% [length|%]
```

| 속 성 | 형 식|
|---|---|
| length, % [length, %] | Xpx Ypx |
| length, % [length, %] | Xpx |
| length, % [length, %] | X% |
| length, % [length, %] | X% Y% |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, borderBottomRightRadius:"변경값"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5; border:15px solid black;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, borderBottomRightRadius:"변경값"}]});
</pre>

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5; border:15px solid black;">
    <span>click me</span>
    </div>
</div>
