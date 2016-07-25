---
layout: j2e-layout
title:  "top"
categories: j2eLearn
pageType: j2eLearn
---

> # **top**
> 애니메이션 효과를 주기 위해 선택된 element를  현 지점을 기준으로 +면 아래쪽으로 -면 위쪽으로 이동 시킵니다.

-----------------------------------


<br />
<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 0, top:"시작점"}, {share: 100, top:"이동점"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>
* j2e(elements) 부분에서 효과를 주고싶은 element선택합니다.  
  방법은 jQuery와 같습니다.  

###### 예) id로 할경우 j2e("#elementID"), class로 할경우 j2e(".elementClass")
* j2e.addRole 부분은 신규 role을 추가
* j2e.addRole 에서 role에 share:0을 뺄시엔 현제 위치를 share:0로 자동으로 만듬
* animate({name:"role name"}) 부분에서 name은 사용 할려는 role name을 작성

<br />

> ### **Example**

<div id="demo_contain" style="height:600px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="keyframeTopButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, top:"이동점"}]});
</pre>
* j2e(elements) 부분에서 효과를 주고싶은 element선택합니다.  
  방법은 jQuery와 같습니다.  

  ###### 예) id로 할경우 j2e("#elementID"), class로 할경우 j2e(".elementClass")

<br />

> ### **Example**

<div id="demo_contain2" style="height:600px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <div id="trasitionTopButton" style="width:100px; height:100px; position:absolute; top:20px; left:10px; background-color:#D941C5;">
    <span>click me</span>
  </div>
</div>
