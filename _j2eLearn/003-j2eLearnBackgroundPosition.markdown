---
layout: j2e-layout
title:  "backgroundPosition"
categories: j2eLearn
pageType: j2eLearn
---

> # **backgroundPosition**
> CSS background-position 속성에 애니메이션 적용

-----------------------------------


<br />
<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, backgroundPosition:"변경값"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e(elements) 부분에서 효과를 주고싶은 element선택합니다.  
  방법은 jQuery와 같습니다.  

  ###### 예) id로 할경우 j2e("#elementID"), class로 할경우 j2e(".elementClass")

* j2e.addRole 부분은 신규 role을 추가
* animate({name:"role_1"}) 부분에서 name은 사용 할려는 role name을 사용
* CSS background-position 값을 명시 하지 않을 경우 올바른 동작 안될 수 있음

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-position: top left; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
    <span>click me</span>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, backgroundColor:"변경값"}]});
</pre>
* j2e(elements) 부분에서 효과를 주고싶은 element선택합니다.  
  방법은 jQuery와 같습니다.  

  ###### 예) id로 할경우 j2e("#elementID"), class로 할경우 j2e(".elementClass")

* CSS background-position 값을 명시 하지 않을 경우 올바른 동작 안될 수 있음

<br />

> ### **Example**

<div id="demo_contain2" style="height:200px; width:100%; background-position: top left; background-repeat: no-repeat; background-image: url('/images/example/icon.png'); background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <span>click me</span>
</div>
