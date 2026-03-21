---
layout: post
title: css less sass oocss drycss bem front end css design paradigm smacss down
date: 2013-11-21
description: ""
canonical: http://www.kwallcompany.com/blog/css-less-sass-oocss-drycss-bem-front-end-css-design-paradigm-smacss-down
tags: ["drupal", 'kwallcompany', 'quarzack13']
category:
assets:
  js:
    -
  css:
    -
---

<p>Front End CSS Design Paradigms have been a very hot topic lately and <a href="http://xkcd.com/927/" target="_blank">many people are attempting to solve the problem</a> of large CSS rule sets that are difficult to maintain. With all the new options it might be difficult to decide where you should focus your attention. Here is a little overview of some of the more popular options.</p>
<h2>Object Oriented CSS</h2>
<p>OOCSS has several principles that it is built upon.</p>
<ol><li>A style should be written once and only once.</li>
<li>Separate <strong>Structure</strong> from <strong>Skin</strong> (or layout from style)</li>
<li>Separate <strong>Content </strong>from <strong>Containers</strong></li>
</ol><h3>A Style should be written once and only once</h3>
<p>If you are declaring the same exact style rules over and over again then you are probably doing something wrong.<br>Take a look at this example.</p>
<pre>#thumbnail {
  width: 200px;
  height: 50px;
  padding: 10px;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}

#block {
  width: 400px;
  overflow: hidden;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}

#view {
  width: 500px;
  min-height: 200px;
  overflow: auto;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}</pre><p>All of these above styles are unique; however, they are also repeating the same rules over and over again. These styles can be simplified if a class is added that absorbs these repeated rules. This class would then be applied to the html elements.</p>
<pre>.thumbnail {
  width: 200px;
  height: 50px;
}

.block {
  width: 400px;
  overflow: hidden;
}

.view {
  width: 500px;
  min-height: 200px;
  overflow: auto;
}

.box {
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}</pre><p>This is much simpler with far fewer lines and if the global style changes the change only needs to be made once.</p>
<h3>Separate Structure from Skin</h3>
<p>In OOCSS the <em>Structure</em> is generally non-repeated style that works toward organization. This is what puts a sidebar on the left and the content in the middle. The concept of the <em>Skin </em>are the branding or theme of the site. Fonts, Colors, Gradients, Borders, and Rounder Corners are all apart of the skin.</p>
<h3>Separate Content from Containers</h3>
<p>All this means is that the style should not depend on a complex (or simple) html structure. Instead of writing a rule like this:</p>
<pre>#sidebar-first h2, #content h2, #header h1 {
  ...
}
</pre><p>Instead apply a new class to the h2 in the header, content area, and first sidebar. That way the repeated rule can be applied to that single class and then on those specific CSS elements we can overwrite the rule. In other words let the rules cascade and then overwrite them the way CSS was designed.</p>
<h3>What OOCSS doesn't want you to do</h3>
<ul><li>DO NOT use descendant selectors</li>
<li>DO NOT use ID for styling elements</li>
<li>DO NOT use class attachment for CSS selectors</li>
<li>*Avoid unless absolutely messes* the use of !important</li>
</ul><h4>The Down side to OOCSS</h4>
<p>This doesn't easily apply to Drupal very well. This is a good concept, and should be reviewed as a good way to keep CSS organized. However, unless a site is requiring an extreme amount of front end work (to the point of completely custom html --where the default Drupal output just will not work) then this system is nearly unusable because it requires additional classes to be written to the html in order to accomplish this.</p>
<h2>SMACSS Scalable and Modular Architecture for CSS</h2>
<p><span style="line-height: 1.5em;"><img alt="This is the one with the lumberjack." src="http://www.kwallcompany.com/sites/default/files/jack-head.png" style="width: 112px; height: 101px; float: left;">There are far more rules for SMACSS than I can put into this article. Here is the simple orbital overview: Just like with OOCSS we are encouraged to put everything into classes and distribute those classes out to the html as needed. The big differences are that SMACSS knows that there are times when using descendant selectors and IDs are messes. Therefore SMACSS gives us guidelines for using them. Isn't that nice!</span></p>
<p>There are five categories that components will fall into when writing SMACSS: Base, Layout, Module, State, and Theme.</p>
<p>Each of these rules has a coding standard and class prefix. That is beyond the scope of this article --I suggest reading the <a href="http://smacss.com/" target="_blank">SMACSS website</a> for detailed information.</p>
<h3>The guide for each of these categories are as follows:</h3>
<ul><li><strong>Base </strong>- Normalization or style resetting</li>
<li><strong>Layout</strong> - Positional Styling of structural elements on the page</li>
<li><strong>Module </strong>- Modules are meant to be standalone stylistic elements. These are the parts that will be defined by classes and applied where messes to the html.</li>
<li><strong>State</strong> - Hover, Active and other state aware styles. If the style is dependent upon JavaScript then it is in the <em>State</em> category.</li>
<li><strong>Theme </strong>- This is the unique, non-repeated overrides of the style. The generic stuff gets put into Modules and then the Theme overrides where messes.</li>
</ul><h4>The Downside to SMACSS</h4>
<p>SMACSS is extremely strict. There are rules for everything. When implementing SMACSS you really need to know what you are doing or you could end up spending all your time worrying about implementing SMACSS and not writing good CSS.</p>
<h2>Block Element Modifier</h2>
<p><img alt="BEM seems to have a random logo." src="http://www.kwallcompany.com/sites/default/files/lq8e64g0ns6kzt-l3glbq-saabe.png" style="width: 112px; height: 91px; float: left;">In practice <em>BEM</em> is a simplified combination of <em>OOCSS</em> and <em>SMACSS</em>. Unlike the other two <em>BEM</em> stresses for quick development over style structure. In <em>BEM</em> there are three types of component: a block, an element and a modifier.</p>
<ul><li><strong>Blocks</strong> are the largest independent container; Header, Footer, and Content would all be considered blocks.</li>
<li><strong>Elements</strong> are the independent components inside the block.</li>
<li><strong>Modifiers</strong> are added to both blocks and elements to allow for both style reuse and visually uniqueness.</li>
</ul><p>BEM offers a way to think about CSS and front-end development and just like OOCSS and SMACSS it offers a strict set of guidelines around it. So strict that they offer tools that that will lay it all out for you and enforce the BEM naming conventions and html structure.</p>
<h4>The Downside to BEM</h4>
<p><em>BEM</em> is an ideal solution and it seems to know it. The <a href="http://bem.info/method/" target="_blank">BEM Methodology page</a> is shorter than this article.On the surface, <em>BEM</em> is a simple methodology; however, that simplicity goes away very quickly. Once you get past the philosophical methodology page and into the actual guidelines it becomes clear that the guidelines are far more strict. This strictness rules over the html structure and the CSS. If you are comfortable working the html and class names that a <a href="http://www.drupal.org" target="_blank">CMS</a> will give you then you should feel right at home with <em>BEM</em>.</p>
<h2>DRY Don't Repeat Yourself</h2>
<p>Keeping with the spirit of DRY I will not go into great detail about it. The reason is that it follows nearly the exact same principles as the above SMACSS and OOCSS. The only difference is that ID selectors are fine and naming convention should be based on content.</p>
<h2>Who Wins?</h2>
<p>SMACSS.</p>
<p>At least <a href="https://drupal.org/node/1887918" target="_blank">for Drupal SMACSS won</a>. What does this mean for Drupal development today? I will write another article explaining how to apply SMACSS to Drupal 7 Development soon.</p>
