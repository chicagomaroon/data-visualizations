# Guide for Lead Developer

## The Visuals are served via this URL template

URL Template: `https://chicagomaroon.github.io/data-visualizations/[PATH TO FILE]`

URL Example: `https://chicagomaroon.github.io/data-visualizations/2023/thifting-growth/thifting-growth.min.html`

## Commands

-   `npm run format`: Runs the formatter in the repository and will let you know if any JavaScript faux pas were made in your code
-   `npm run create-visual --year=[year] --story=[kebab-case-story-name]`: Creates a copy of the HighCharts files in `./template_visual/highcharts` to the `/$year/$story` folder, which will serve as the basis of your new Chicago Maroon visual
-   `npm run create-visual-d3 --year=[year] --story=[kebab-case-story-name]`: Creates a copy of the D3 files in `./template_visual/d3plus` to the `/$year/$story` folder, which will serve as the basis of your new Chicago Maroon visual
-   `npm run process-visual --year=[year] --story=[kebab-case-story-name]`: Runs `node-htmlprocessor` on the `index.html` file in the `/$year/$story` folder and outputs the processed version as `$story.min.html`

## HTML Segment to Embed iframe

Here is the template to for putting minified HTML files into the WordPress site using an iframe. Paste in using the `Text` option on the top right in SNO:

```html
<div class="iframe-container">
    <iframe
        class="data-viz-container"
        src="https://chicagomaroon.github.io/data-visualizations/[PATH TO MINIFIED HTML FILE]"
    ></iframe>
</div>
<div class="data-viz-description-container">
    <div class="data-viz-credit">
        <a href="https://chicagomaroon.com/staff_name/[FIRST NAME]-[LAST NAME]/"
            >[AUTHOR OF CHART]</a
        >
    </div>
    <div class="data-viz-description">[DESCRIPTION OF CHART]</div>
</div>
```

## Crediting Authors and Contributors

Anyone who contributed to writing the story should be credited as a "Writer" through SNO. Anyone who contributed a data 
visualization but did not write should be credited through the "Video/Embed" widget on the right-hand-side of the SNO 
editing window. Click "Add Video or Embed Code", and set “Location” to “Do Not Display on Story Page” and set 
“Embed/Video Credit Line” to the name of the developer to be credited. This will make the story show up on their bio
page on the Maroon's website without adding them to the byline. 
