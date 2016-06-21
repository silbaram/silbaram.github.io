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

> ### **Syntax**

```{.javascript}
j2m(elements).move({left:100, 1});
```
* j2m(elements) 부분에서 효과를 주고싶은 element선택합니다.  
  방법은 jQuery와 같습니다.  

  ###### 예) id로 할경우 j2m("#elementID"), class로 할경우 j2m(".elementClass")

* move({left:100, 1}) 부분에서 left:100은 선택한 element를 오른쪽으로 100px만큼 이동 뒤에 1은 1초동안 입니다.

<br />
<br />
<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="demo_object" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;"></div>

  <input type="button" value="left" id="leftButton" style="position:absolute;top:150px;">
</div>


<br />
<br />
<br />
