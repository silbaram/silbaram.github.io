---
layout: j2e-layout
title:  "borderSpacing"
categories: j2eLearn
pageType: j2eLearn
date: 2016-07-26 11:47:08 +0900
lastmod: 2016-07-26 11:47:08 +0900
---

> # **borderSpacing**
> CSS border-spacing 속성에 애니메이션 적용 (부트스트랩과 충돌로 안되고 있음)

-----------------------------------

<br />
<br />
<br />

> ### **role Syntax**


```
borderSpacing: length [length]
```

| 속 성 | 형 식|
|---|---|
| length [length] | Xpx |
| length [length] | Xpx Ypx |

<br />
<br />

> ### **keyFrame Type Syntax**

<pre class="prettyprint linenums:1">
j2e.addRole({name:"role_1", role:[{share: 100, borderSpacing:"변경값"}]});
j2e(elements).setDuration(t).animate({name:"role_1"});
</pre>

* j2e.addRole 생성 시 share:0 생략 가능

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">

  <table id="keyframeButton" style="border: 1px solid black; width:50%;">
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
  </table>
</div>

<br />
<br />
<br />

> ### **trasition Type Syntax**

<pre class="prettyprint linenums:1">
j2e(elements).animate({role:[{duration: 1, borderSpacing:"변경값"}]});
</pre>

<br />

> ### **Example**

<div id="demo_contain" style="height:200px; width:100%; background-color:#FFFFFF; border:0.5px solid black; margin:10px; position:relative; padding:10px; box-shadow: 2px 2px 1px grey;">
  <table id="trasitionButton" style="border: 1px solid black; width:50%;">
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
    <tr style="border: 1px solid black;">
      <th style="border: 1px solid black;">1</th>
      <th style="border: 1px solid black;">2</th>
    </tr>
  </table>
</div>
