---
layout: j2e-layout
title:  "backgroundPosition"
categories: j2eLearn
pageType: j2eLearn
---

> # **backgroundPosition**
> CSS background-position 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **role Syntax**


```
backgroundPosition: value
```

| 속 성 | 형 식|
|---|---|
| value | left top, left center, left bottom, right top, right center, right bottom, center top, center center, center bottom |
| value | X% Y% |
| value | Xpx Ypx |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, backgroundPosition:"변경값"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-position: top left; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
    <span>click me</span>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, backgroundPosition:"변경값"}]});
</pre>

<br />

> ### **Example**

<div id="demo_contain2" style="height:200px; width:100%; background-position: top left; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <span>click me</span>
</div>
