---
layout: j2e-layout
title:  "fontWeight"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-26 14:22:38 +0900
lastmod: 2016-07-29 15:22:44 +0900
---

> # **fontWeight**
> CSS font-weight 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **role Syntax**


```
fontWeight: keywords | number
```

| 속 성 | 형 식|
|---|---|
| keywords | fontWeight : "bold\|100" |

* keywords : normal, bold, bolder, lighter
* number : 100, 200, 300, 400, 500, 600, 700, 800, 900

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, fontWeight:"keywords | number"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", fontWeight:"900"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="width:200px; height:100px; position:absolute; too:10px; left:10px; border: 1px solid black">
    <p>click me</p>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, fontWeight:"keywords | number"}]});
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
      value = "900";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "normal";
      checkValue = 0;
    }

    j2e("#trasitionButton").animate({role:[{duration: 1, fontWeight:value}]});
  }
});
</pre>

<br />

* #### 결과
<div id="demo_contain2" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="width:200px; height:100px; position:absolute; top:10px; left:10px; border: 1px solid black">
    <span>click me</span>
  </div>
</div>
