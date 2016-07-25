---
layout: j2e-layout
title:  "backgroundSize"
categories: j2eLearn
pageType: j2eLearn
---

> # **backgroundSize**
> CSS background-size 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, backgroundSize:"변경값"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e(elements) 부분에서 효과를 주고싶은 element선택합니다.  
  방법은 jQuery와 같습니다.  

  ###### 예) id로 할경우 j2e("#elementID"), class로 할경우 j2e(".elementClass")

* j2e.addRole 부분은 신규 role을 추가
* j2e.addRole 에서 role에 share:0을 뺄시엔 현제 위치를 share:0로 자동으로 만듬
* animate({name:"role_1"}) 부분에서 name은 사용 할려는 role name을 사용

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-position: center; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
    <span>click me</span>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, backgroundSize:"변경값"}]});
</pre>
* j2e(elements) 부분에서 효과를 주고싶은 element선택합니다.  
  방법은 jQuery와 같습니다.  

  ###### 예) id로 할경우 j2e("#elementID"), class로 할경우 j2e(".elementClass")

* CSS background-size 값을 명시 하지 않을 경우 올바른 동작 안될 수 있음

<br />

> ### **Example**

<div id="demo_contain2" style="height:200px; width:100%; background-size: 14px 14px; background-position: center; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <span>click me</span>
</div>
