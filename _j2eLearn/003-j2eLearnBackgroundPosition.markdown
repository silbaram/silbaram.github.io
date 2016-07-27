---
layout: j2e-layout
title:  "backgroundPosition"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-25 14:46:00 +0900
lastmod: 2016-07-27 23:07:00 +0900
---

> # **backgroundPosition**
> CSS background-position 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **role Syntax**


```
backgroundPosition: value
```

| 속 성 | 형 식|
|---|---|
| value | backgroundPosition: "left [top]" |
| value | backgroundPosition: "left [center]" |
| value | backgroundPosition: "left [bottom]" |
| value | backgroundPosition: "right [top]" |
| value | backgroundPosition: "right [center]" |
| value | backgroundPosition: "right [bottom]" |
| value | backgroundPosition: "center [top]" |
| value | backgroundPosition: "center [center]" |
| value | backgroundPosition: "center [bottom]" |
| value | backgroundPosition: "X% [Y%]" |
| value | backgroundPosition: "Xpx [Ypx]" |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, backgroundPosition:"value"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", backgroundPosition:"center"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="keyframeButton" style="height:200px; width:100%; background-position: top left; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
    <span>click me</span>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, backgroundPosition:"value"}]});
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
      value = "center";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "top left";
      checkValue = 0;
    }
    j2e("#trasitionButton").animate({role:[{duration: 1, backgroundPosition:value}]});
  });
});
</pre>

<br />

* #### 결과
<div id="trasitionButton" style="height:200px; width:100%; background-position: top left; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <span>click me</span>
</div>
