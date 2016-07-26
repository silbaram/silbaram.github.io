---
layout: j2e-layout
title:  "backgroundSize"
categories: j2eLearn
pageType: j2eLearn
---

> # **backgroundSize**
> CSS background-size 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **role Syntax**


```
backgroundSize: length
```

| 속 성 | 형 식|
|---|---|
| length | X% |
| length | X% Y% |
| length | Xpx |
| length | Xpx Ypx |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, backgroundSize:"변경값"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="keyframeButton" style="height:200px; width:100%; background-position: center; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
    <span>click me</span>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, backgroundSize:"변경값"}]});
</pre>

* CSS background-size 값을 명시 하지 않을 경우 올바른 동작 안될 수 있음

<br />

> ### **Example**

<div id="trasitionButton" style="height:200px; width:100%; background-size: 14px 14px; background-position: center; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <span>click me</span>
</div>
