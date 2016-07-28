---
layout: j2e-layout
title:  "borderSpacing"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-26 11:47:08 +0900
lastmod: 2016-07-28 16:45:34 +0900
---

> # **borderSpacing**
> CSS border-spacing 속성에 애니메이션 적용 (부트스트랩과 충돌로 안되고 있음)

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
borderSpacing: length [length]
```

| 속 성 | 형 식|
|---|---|
| length [length] | borderSpacing: "Xpx [Ypx]" |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, borderSpacing:"length [length]"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", borderSpacing:"15px 15px"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">

  <table id="keyframeButton" style="border: 1px solid black; width:50%;">
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
  </table>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, borderSpacing:"length [length]"}]});
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
      value = "15";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "0";
      checkValue = 0;
    }

    j2e("#trasitionButton").animate({role:[{duration: 1, borderSpacing:value}]});
  }
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <table id="trasitionButton" style="border: 1px solid black; width:50%;">
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
  </table>
</div>
