---
layout: j2e-layout
title:  "borderColor"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-26 10:08:08 +0900
lastmod: 2016-07-28 16:14:18 +0900
---

> # **borderColor**
> CSS border-color 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
borderColor: top-color right-color bottom-color left-color
```

| 속 성 | 형 식|
|---|---|
| color | red |
| color | #000000 |
| color | rgb(255,255,255) |

* color : top & bottom & right & left
* color color : (top & bottom) (right & left)
* color color color : top (right & left) bottom
* color color color color : top right bottom left

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, borderColor:"top-color right-color bottom-color left-color"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", borderColor:"red green blue yellow"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5; border:15px solid black;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, borderBottomWidth:"top-color right-color bottom-color left-color"}]});
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
      value = "red green blue yellow";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "black";
      checkValue = 0;
    }

    j2e("#trasitionButton").animate({role:[{duration: 1, borderColor:value}]});
  }
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5; border:15px solid black;">
    <span>click me</span>
    </div>
</div>
