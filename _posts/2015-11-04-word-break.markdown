---
layout:     post
title:      "word-break和word-wrap的基友关系"
subtitle:   " \"细说强制换行\""
date:       2015-11-04 23:00:00
author:     "ZWW"
header-img: "img/post-bg-digital-native.jpg"
tags:
    - 强制换行
---

> **“英文单词中换行的差异”**

word-break和word-wrap都是表示单词换行，这其中藏有什么奥秘呢，其实对于中文来说对没有什么卵用，区别不明显，这样才对，因为本身就两个css属性就是针对英文单词呀，写过css的都知道单词太长制定大小的容器放不下时要写一个word-wrap:break-word;word-break:break-all;这样的东西来强制断句，实现的效果都是强制换行， 然而它们还有有那么一点差异的。

mdn牌权威指南对他的解释是这样的：

`The word-wrap property is used to specify whether or not the browser may break lines within words in order to prevent overflow when an otherwise unbreakable string is too long to fit in its containing box.`

我的理解是这样的：如果一个单词太多一行放不下就新给这个单词新开一行，强制换行

    <p class="word-wrap">
        this is just a simple test for word-wrap,blablablablabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala
    </p>
    
        .word-wrap{
            width: 200px;
            background: red;
            word-wrap: break-word;
        }

因为blabla...这个单词太长了，所以他会新开一行现实，特别注意新开一行而不积压前面的空白。
所以效果是这样的

![word-wrap](/img/post-img/word-break.png)	


他还有个属性是normal，如果指定`word-wrap:normal;`表示只在允许的断字点换行（浏览器保持默认处理）。

作为对比如果我们把上面的样式改一下

        .word-wrap{
            width: 200px;
            background: red;
            word-break: break-all;
        }

效果明显就变了

![word-break](/img/post-img/break-all.png)	

来看看官方的解释

`The word-break CSS property is used to specify whether to break lines within words.`

`属性Values`

normal

Use the default line break rule.

break-all

Word breaks may be inserted between any character for non-CJK (Chinese/Japanese/Korean) text.

keep-all

Don't allow word breaks for CJK text.  Non-CJK text behavior is the same as for normal.

翻译过来是允许在单词内换行。这样说起来都没区别，事实上，`word-wrap:break-word与word-break:break-all共同点是都能把长单词强行断句，不同点是word-wrap:break-word会首先起一个新行来放置长单词，新的行还是放不下这个长单词则会对长单词进行强制断句；而word-break:break-all则不会把长单词放在一个新行里，当这一行放不下的时候就直接强制断句了。`这也就不难理解上面短行的差异了！


说到这两个的基友关系，我不禁想到了对换行和空白的一个处理，最常用的用来处理元素内的空白`white-space`

	white-space:nowrap;
	用于处理元素内的空白，只在一行内显示。
	

然后他的兄弟属性比较多

`normal	默认。空白会被浏览器忽略。`

`pre空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。`

`nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。`

`pre-wrap	保留空白符序列，但是正常地进行换行。`

`pre-line	合并空白符序列，但是保留换行符。`

`inherit	规定应该从父元素继承 white-space 属性的值`

就想到这么了，睡觉了
