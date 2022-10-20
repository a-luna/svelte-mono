---
title: 'Functional Programming Techniques in Python: Result Class'
slug: functional-techniques-python-result-class
date: '2020-11-20'
toc: false
draft: true
menu_section: "blog"
categories:
  - Python
summary: '.'
resources:
  - name: cover
    src: cover.jpg
    params:
      credit: "Photo by Marco De Luca on Unsplash"
---

{{< info_box >}}
This is a new, improved version of [a previous post](/blog/error-handling-python-result-class/). I have always thought that the ideas I intended to communicate were not adequately served in that piece. Rather than update the older post, I decided to start from scratch, consider this version 2.0.
{{< /info_box >}}

## Introduction

dlkdlf kjldljadfj dlkjlkadfj ldkf jakdf

```shell
$ npm install --save-dev lunr
```

adslkfj dkfjalkfkk dlkjfdkl af fkladfkadjf

```javascript {linenos=table,linenostart=252,hl_lines=["1-12","29-33"]}
function handleClearSearchButtonClicked() {
	hideSearchResults();
	clearSearchResults();
	document.getElementById('search').value = '';
}

function hideSearchResults() {
	document.getElementById('clear-search-results-sidebar').classList.add('hide-element');
	document.getElementById('site-search').classList.remove('expanded');
	document.querySelector('.search-results').classList.add('hide-element');
	document.querySelector('.primary').classList.remove('hide-element');
}

initSearchIndex();
document.addEventListener('DOMContentLoaded', function () {
	if (document.getElementById('search-form') != null) {
		const searchInput = document.getElementById('search');
		searchInput.addEventListener('focus', () => searchBoxFocused());
		searchInput.addEventListener('keydown', (event) => {
			if (event.keyCode == 13) handleSearchQuery(event);
		});
		document
			.querySelector('.search-error')
			.addEventListener('animationend', removeAnimation);
		document
			.querySelector('.fa-search')
			.addEventListener('click', (event) => handleSearchQuery(event));
	}
	document
		.querySelectorAll('.clear-search-results')
		.forEach((button) => 
			button.addEventListener('click', () => handleClearSearchButtonClicked())
		);
});
```