---
layout: j2e-layout
title:  "skewY"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-27 18:31:01 +0900
lastmod: 2016-07-31 22:38:38 +0900
---

> # **skewY**
> CSS Transform skewY 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**

```
skewY: angle
```

| 속 성 | 형 식|
|---|---|
| angle | skewY: "45" |

* 단위를 빼면 기본 단위는 deg

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, skewY:"angle"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", skewY:"-20"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="position:relative; width:100px; height:100px; margin: 0 auto; top: 30px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, skewY:"angle"}]});
</pre>

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
$(document).ready(function(){
  var checkValue = 0;
  $("#trasitionButton").click(function(){
    let value = "";
    if(checkValue == 0) {
      value = "-20";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "0";
      checkValue = 0;
    }
    
    j2e("#trasitionButton").animate({role:[{duration: 1, skewY:value}]});
  }
});
</pre>

<br />

* #### 결과
<div id="demo_contain2" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="position:relative; width:100px; height:100px; margin: 0 auto; top: 30px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>
