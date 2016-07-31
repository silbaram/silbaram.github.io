---
layout: j2e-layout
title:  "textIndent"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-27 18:14:58 +0900
lastmod: 2016-07-30 17:09:35 +0900
---

> # **textIndent**
> CSS text-indent 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
textIndent: length | percentage
```

| 속 성 | 형 식|
|---|---|
| length \| percentage | right: "Xpx \| X%" |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, textIndent:"length | percentage"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", textIndent:"50%"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="keyframeButton" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, textIndent:"length | percentage"}]});
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
      value = "50%";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "0%";
      checkValue = 0;
    }

    j2e("#trasitionButton").animate({role:[{duration: 1, textIndent:value}]});
  }
});
</pre>

<br />

* #### 결과
<div id="trasitionButton" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me click me
</div>
