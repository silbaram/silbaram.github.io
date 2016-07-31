---
layout: j2e-layout
title:  "perspectiveOrigin"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-27 18:11:58 +0900
lastmod: 2016-07-30 17:02:35 +0900
---

> # **perspectiveOrigin**
> CSS perspective-origin 속성에 애니메이션 적용

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
perspectiveOrigin: keyword | length | percentage [keyword | length | percentage]
```

| 속 성 | 형 식|
|---|---|
| keyword | perspectiveOrigin : "left [center]" |
| length | perspectiveOrigin : "Xpx [Ypx]" |
| percentage | perspectiveOrigin : "X% [Y%]" |

* keyword : left, center, right

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, perspectiveOrigin:"keyword | length | percentage [keyword | length | percentage]"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

* #### 예제소스
<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: "100", perspectiveOrigin:"10px 50%"}]});

$(document).ready(function(){
  $("#keyframeButton").click(function(){
    j2e("#keyframeButton").setDuration(1).animate({name:"role_1"});
  });
});
</pre>

<br />

* #### 결과
<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeButton" style="position: relative; margin: auto; height: 150px; width: 250px; padding: 10px; border: 0px solid black; -webkit-perspective: 200px; perspective: 200px;">
    <div style="padding: 50px; position: absolute; border: 1px solid black; background-color: red; -webkit-transform: rotateX(45deg); transform: rotateX(45deg);">click me </div>
  </div>
</div>





<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, perspectiveOrigin:"keyword | length | percentage [keyword | length | percentage]"}]});
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
      value = "10px 50%";
      checkValue = 1;
    } else if (checkValue == 1) {
      value = "50% 50%";
      checkValue = 0;
    }

    j2e("#trasitionButton").animate({role:[{duration: 1, perspectiveOrigin:value}]});
  }
});
</pre>

<br />

* #### 결과
<div id="demo_contain2" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionButton" style="position: relative; margin: auto; height: 150px; width: 250px; padding: 10px; border: 0px solid black; -webkit-perspective: 200px; perspective: 200px;">
    <div style="padding: 50px; position: absolute; border: 1px solid black; background-color: red; -webkit-transform: rotateX(45deg); transform: rotateX(45deg);">click me </div>
  </div>
</div>
