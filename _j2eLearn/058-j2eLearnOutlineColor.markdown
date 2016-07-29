---
layout: j2e-layout
title:  "outlineColor"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-26 18:55:58 +0900
lastmod: 2016-07-29 18:12:35 +0900
---

> # **outlineColor**
> CSS outline-color 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
outlineColor: color
```

| 속 성 | 형 식|
|---|---|
| color | outlineColor: "red \| #000000 \| rgb(255,255,255)" |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, outlineColor:"color"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", outlineColor:"#FFE400"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="width:100px; height:100px; margin: 20px; outline: 15px solid red;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, outlineColor:"color"}]});
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
      value = "#FFE400";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "red";
      checkValue = 0;
    }

    j2e("#trasitionButton").animate({role:[{duration: 1, outlineColor:value}]});
  }
});
</pre>

<br />

* #### 결과
<div id="demo_contain2" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="width:100px; height:100px; margin: 20px; outline: 15px solid red;">
    <span>click me</span>
  </div>
</div>
