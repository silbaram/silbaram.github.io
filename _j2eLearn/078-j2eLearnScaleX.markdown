---
layout: j2e-layout
title:  "scaleX"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-27 18:31:01 +0900
lastmod: 2016-07-30 17:55:54 +0900
---

> # **scaleX**
> CSS Transform scaleX 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**

```
scaleX: number
```

| 속 성 | 형 식|
|---|---|
| number | scaleX: "0.5" |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, scaleX:"number"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", scaleX:"1.5"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="position:relative; width:100px; height:100px; margin: 0 auto; top: 30px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, scaleX:"number"}]});
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
      value = "1.5";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = 1;
      checkValue = 0;
    }

    j2e("#trasitionButton").animate({role:[{duration: 1, scaleX:value}]});
  }
});
</pre>

<br />

* #### 결과
<div id="demo_contain2" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="position:relative; width:100px; height:100px; margin: 0 auto; top: 30px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>
