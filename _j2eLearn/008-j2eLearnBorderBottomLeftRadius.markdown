---
layout: j2e-layout
title:  "borderBottomLeftRadius"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-26 10:07:08 +0900
lastmod: 2016-07-25 15:24:08 +0900
---

> # **borderBottomLeftRadius**
> CSS border-bottom-left-radius 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
borderBottomLeftRadius: length [length|percentage] | percentage [length|percentage]
```

| 속 성 | 형 식|
|---|---|
| length [length \| percentage] | borderBottomLeftRadius: "Xpx [Ypx \| Y%]" |
| percentage [length\|percentage] | borderBottomLeftRadius: "X% [Ypx \| Y%]" |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, borderBottomLeftRadius:"length [length|percentage] | percentage [length|percentage]"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", borderBottomLeftRadius:"50"}]});

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
j2e(elements).animate({role:[{duration: 1, borderBottomLeftRadius:"length [length|percentage] | percentage [length|percentage]"}]});
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
      value = "50";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "0";
      checkValue = 0;
    }

    j2e("#trasitionButton").animate({role:[{duration: 1, borderBottomLeftRadius:value}]});
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
