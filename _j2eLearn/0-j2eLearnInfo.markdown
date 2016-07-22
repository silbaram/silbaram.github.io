---
layout: j2e-layout
title:  "소개"
categories: j2eLearn
pageType: j2eLearn
---

> # **j2e 라이브러리 구문 정의**

-----------------------------------

<br />
<br />
<br />

> ## **개  요**

* CSS 기술인 keyframe와 transition을 Javascript로 제어 하여 element에 애니메이션 효과를 쉽게 줄 수 있도록 하기 위한 라이브러리임

<br />
<br />

> ### **keyFrame Type**

* 반복 애니메이션 효과에 적합

<br />

#### 1. **기본 룰 선언 구문**

```
  j2e.addRole({name:”roleName”, role:”모션 규칙 서술”});
```

| 이       름 | 설               명 |
| ---
| name | 룰 고유 이름 |
| role | element에 적용되는 모션 규칙 |

  * 애니메이션 효과를 미리 등록 한 후 사용

<br />

#### 2. **미리 선언된 룰 사용 기분 구문**

```
j2e(element-selecter).setDuration(t).animate({name:”roleName”});
```

| 이       름 | 설               명 |
| ---
| name | 룰 고유 이름 |

<br />

#### 3. **기선언된 룰 사용 없이 바로 애니메이션 사용 기분 구문**

```
  j2e(element-selecter).setDuration(t).animate({name:”roleName”, role:”모션 규칙 서술”});
```

| 이       름 | 설               명 |
| ---
| name | 룰 고유 이름 (룰이 바로 등록됨) |
| role | element에 적용되는 모션 규칙 |

  * 한번 선언되고 난 후 다른 element에서도 사용할 수 있음

<br />
