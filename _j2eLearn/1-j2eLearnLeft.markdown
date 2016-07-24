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
j2e.addRole({name:"left_1", role:[{share: 0, left:"10"}, {share: 100, left:$("#demo_contain").width()-100}]});
j2e(elements).setDuration(t).animate({name:"role name"});
```
* j2m(elements) 부분에서 효과를 주고싶은 element선택합니다.  
  방법은 jQuery와 같습니다.  

  ###### 예) id로 할경우 j2m("#elementID"), class로 할경우 j2m(".elementClass")
* j2e.addRole 부분은 신규 role을 추가
* animate({name:"role name"}) 부분에서 name은 사용 할려는 role name을 작성

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="demo_object" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;"></div>

  <input type="button" value="left" id="leftButton" style="position:absolute;top:150px;">
</div>


<br />
<br />
<br />
