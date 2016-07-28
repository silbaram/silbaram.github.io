---
layout: j2e-layout
title:  "backgroundSize"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-25 17:18:33 +0900
lastmod: 2016-07-28 17:22:33 +0900
---

> # **backgroundSize**
> CSS background-size 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **role Syntax**

```
backgroundSize: length [length|percentage] | percentage [length|percentage]
```

| 속 성 | 형 식|
|---|---|
| length [length \| percentage] | backgroundSize: "Xpx [Ypx \| Y%]" |
| percentage [length \| percentage] | backgroundSize: "X% [Y% \| Ypx]" |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, backgroundSize:"length [length|percentage] | percentage [length|percentage]"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", backgroundSize:"100 100"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="keyframeButton" style="height:200px; width:100%; background-position: center; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
    <span>click me</span>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, backgroundSize:"length [length|percentage] | percentage [length|percentage]"}]});
</pre>

* CSS background-size 값을 명시 하지 않을 경우 올바른 동작 안될 수 있음

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
$(document).ready(function(){
  var checkValue = 0;
  $("#trasitionButton").click(function(){
    let value = "";
    if(checkValue == 0) {
      value = "100px 100px";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "15px 15px";
      checkValue = 0;
    }
    j2e("#trasitionButton").animate({role:[{duration: 1, backgroundSize:value}]});
  });
});
</pre>

<br />

* #### 결과
<div id="trasitionButton" style="height:200px; width:100%; background-size: 14px 14px; background-position: center; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <span>click me</span>
</div>
