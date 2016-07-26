---
layout: j2e-layout
title:  "paddingRight"
categories: j2eLearn
pageType: j2eLearn
---

> # **paddingRight**
> CSS padding-right 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
paddingRight: length
```

| 속 성 | 형 식|
|---|---|
| length | Xpx |
| length | X% |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, paddingRight:"이동점"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="keyframeButton" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, paddingRight:"이동점"}]});
</pre>

<br />

> ### **Example**

<div id="trasitionButton" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me
</div>
