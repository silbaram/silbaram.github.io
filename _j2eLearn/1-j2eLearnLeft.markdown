---
layout: j2e-layout
title:  "left"
categories: j2eLearn
pageType: j2eLearn
---

> # **left**
> 애니메이션 효과를 주기 위해 선택된 element를  현 지점을 기준으로 +면 오른쪽으로 -면 왼쪽으로 이동 시킵니다.

-----------------------------------

<br />
<br />
<br />

> ### **keyFrame Type Syntax**

```.javascript
j2e.addRole({name:"role_1", role:[{share: 0, left:"시작점"}, {share: 100, left:"종착점"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
```
* j2e(elements) 부분에서 효과를 주고싶은 element선택합니다.  
  방법은 jQuery와 같습니다.  

  ###### 예) id로 할경우 j2e("#elementID"), class로 할경우 j2e(".elementClass")
* j2e.addRole 부분은 신규 role을 추가
* animate({name:"role name"}) 부분에서 name은 사용 할려는 role name을 작성

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeLeftButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

```.javascript
j2e(elements).animate({role:[{duration: 1, left:”종착점”}]});
```
* j2e(elements) 부분에서 효과를 주고싶은 element선택합니다.  
  방법은 jQuery와 같습니다.  

  ###### 예) id로 할경우 j2e("#elementID"), class로 할경우 j2e(".elementClass")

<br />

> ### **Example**

<div id="demo_contain2" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionLeftButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>
