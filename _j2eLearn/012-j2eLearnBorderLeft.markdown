---
layout: j2e-layout
title:  "borderLeft"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-26 10:17:08 +0900
lastmod: 2016-07-28 16:19:14 +0900
---

> # **borderLeft**
> CSS border-left 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
borderLeft: borderWidth border-style [borderColor]
```

| 속 성 | 형 식|
|---|---|
| borderWidth border-style [borderColor] | borderLeft: "Xpx solid [red]" |
| borderWidth border-style [borderColor] | borderLeft: "Xpx solid []#ff0000]" |
| borderWidth border-style [borderColor] | borderLeft: "Xpx solid [rgb(255,0,0)]" |

* 현재 borderWidth 단위 지정 필수(차후 단위 생략시 기본으로 px단위가 붙도록 계획 중)
* 현재 borderColor는 style에 선언 했다면 생략 가능(차후 borderColor 생략시 기본으로 solid keyword가 붙도록 계획 중)


<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, borderLeft:"borderWidth border-style [borderColor]"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", borderLeft:"15px solid red"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, borderLeft:"borderWidth border-style [borderColor]"}]});
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
      value = "15px solid red";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "0px solid red";
      checkValue = 0;
    }
    j2e("#trasitionButton").animate({role:[{duration: 1, borderLeft:value}]});
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
<div id="trasitionButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;">
  <span>click me</span>
</div>
</div>
