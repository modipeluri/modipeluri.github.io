---
layout: post
title: More flexible UI-component patterns
---

I'm currently the only developer working with CSS for the application we develope. This has given me the chance to architect the code as I best see fit. Writing some 8000+ lines of SCSS has taught me a lot, and I'd like to share one epiphany with you.
 
This web application uses the same design pattern over and over again. I'm not sure what exactly this pattern is called, but I'll just call it scrollbox for a lack of a better name. 

!(https://github.com/modipeluri/modipeluri.github.io/raw/master/images/scrollbox.png "Logo Title Text 1")
The scrollbox component consists of a header, body and footer. 


The header contains the title, possible a dropdown-menu icon and a search box. Depending on the component, the header can be quite tall, or very short. I think currently it ranges from 24 to 80px.

The body is a list of items which needs to span from bottom of header, to top of footer. The body should also fill the available space whether there is one or a hundred items.

The footer contains buttons and has always the same height, or does not exist at all.

The component is placed in a variable size container. The container size depends on the view, screen resolution, browser width etc.

## Lets get to the code

We place the header inside the containing div, and give it a height of 40px which is enough to fit our title, and a search box under one another.

```.component-header {
	height: 40px;
}
```

To get the component body to span from the bottom of the header to the top of the footer, we need to absolute position it like this:

```.component-body {
	position: absolute;
	top: 40px;
	bottom: 40px;
	left: 0;
	right: 0;
}
```

We also need to absolute position our components footer, to get it to stay at the bottom of the component.

```.component-footer {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 40px;
}
```

The above described pattern repeats quite a few times in the application, but with pretty big differences in appearance. For example, the same structure is used in a modal, as well as in a dropdown component for browsing documents.

This pattern bugged me a lot, because I couldn't come up with a flexible enough solution to make the CSS re-usable, robust, and sane-to-read.

## First solution

My first idea was to go with modifier classes on the element.

.component-header.component-header-md

This would however require all three, header, body and footer to have their own modifier classes. Alternatively I could add the modifier class to the containing element. However this solution is pretty ugly because it forces you to nest your header, body and footer inside a containing class in your SCSS.

As the number of variants increases, so does the number of your modifiers, making for ugly nested CSS with lots of repetition:

.component-container {
	.component-header {
		/* regular styles */
	}

	.component-body {
		/* regular styles */
	}

	.component-footer {
		/* regular styles */
	}

	&.component-container-md {
		.component-header {
			/* medium height styles */
		}

		.component-body {
			/* medium height styles */
		}

		.component-footer {
			/* medium height styles */
		}
	}
}

Look at this mess, three levels of nesting. At this point the specificity of our .component-body inside of the modifier class is already three. And that is two too many.


## Final solution

A solution which I used separates the layout and appearance of the component. I don't know if "height" is really a layout rule, or an appearance rule, but in this case it's more of a appearance rule.

The separation of concerns becomes easy:

.component-header, .component-body, .component-footer {
	position: absolute;
	left: 0;
	right: 0;
}

.component-header {
	top: 0; /* not necessary but makes reading code easier */
}

.component-footer {
	bottom: 0;
}

we then give the appearance, including height, in a per component rule set, for example

```
$lb-header-height: 60px;
$lb-footer-height: 50px;

.list-browser-header {
	height: $lb-header-height;
	background: linear-gradient(to bottom, 0% #fff, 100% #f5f5f5);
	border-bottom: 1px solid #ccc;
}

.list-browser-body {
	top: $lb-header-height;
	bottom: $lb-footer-height;
	background: #fff;
}

.list-browser-footer {
	height: $lb-header-height;
	background: #eee;
	border-top: 1px solid #ccc;
}
```

With this, we have achieved a couple of benefits. First, we avoid all nesting in our SCSS. 

Second, we now have one class name strictly for layout, and another strictly for appearance. This means we can use .list-browser-header in any of our components that needs the same appearance. Also in those ones that require the header to be `position: relative;`

Third, we've saved ourselves from carpal tunnel because of all the SCSS we don't have to write for each scrollable box from now on.





