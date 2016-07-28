---
layout: j2e-layout
title:  "backgroundColor"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-25 14:36:21 +0900
lastmod: 2016-07-28 14:54:21 +0900
---

> # **backgroundColor**
> CSS background-color 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **role Syntax**

```
backgroundColor: color_name | hex_number | rgb_number
```

| 속 성 | 형 식|
|---|---|
| color_name | backgroundColor: "red" |
| hex_number | backgroundColor: "#ff0000" |
| rgb_number | backgroundColor: "rgb(255,0,0)" |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, backgroundColor:"color_name | hex_number | rgb_number"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", backgroundColor:"#0054FF"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="keyframeButton" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
    <span>click me</span>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, backgroundColor:"color_name | hex_number | rgb_number"}]});
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
      value = "#0054FF";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "#FFFFFF";
      checkValue = 0;
    }

    j2e("#trasitionButton").animate({role:[{duration: 1, backgroundColor:value}]});
  }
});
</pre>

<br />

* #### 결과
<div id="trasitionButton" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <span>click me</span>
</div>
