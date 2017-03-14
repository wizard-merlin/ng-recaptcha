---
layout: example
title: Preloaded reCAPTCHA API Example
permalink: /preload-api
feature: preload-api
backlink: example-preload-api
headextras: |
    <script src="https://www.google.com/recaptcha/api.js?render=explicit&amp;onload=onloadCallback"></script>
    <script>
        // bootstrap the application as soon as the reCAPTCHA api has loaded 
        function onloadCallback() {
            System.import('examples/preload-api.main')
                .catch(function(err) { console.error(err); });
        }
    </script>
---

HTML snippet:
<pre class="prettyprint lang-html">{{ page.headextras | escape }}</pre>
