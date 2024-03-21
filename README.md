# The Chicago Maroon’s Data Visualizations
Feature stories by The Chicago Maroon are grouped by year into corresponding folders.

For information on contribution and style standards, please visit [this document](CONTRIB.md).

## [For the Lead Developer] The Visuals are served via this URL template
URL Template: `https://chicagomaroon.github.io/data-visualizations/[PATH TO FILE]`

URL Example: `https://chicagomaroon.github.io/data-visualizations/2023/thifting-growth/thifting-growth.min.html`

## GitHub Concepts and Processes To Know
The following articles introduce some basic Github features we will use:
- [GitHub Feature Branches](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- [GitHub Pull Requests](https://www.atlassian.com/git/tutorials/making-a-pull-request)

## Technical Necessities
If you don’t have a code environment on your computer already, download one:
 - [Webstorm](https://www.jetbrains.com/webstorm/?var=1): A luxury tier JavaScript IDE. This will offer all sorts of configuration options as well as thorough documentation for any and all relevant features. You also get a free student license to IDEs from this company, JetBrains, as [a student at UChicago](https://www.jetbrains.com/community/education/#students).
 - [Visual Studio Code](https://code.visualstudio.com/download) (VSCode): An IDE that requires more technical savvy to fully benefit from, but can give you all the benefits of an IDE like WebStorm. It is also free, and is applicable to all coding languages.

Download these software that will allow you to run Javascript, which we write our visualizations in:
 - [node.js](https://nodejs.org/en) `v20.9.0`
   - To manage the versions of node.js I use on my computer, I use the Node Version Manager program: [Link](https://github.com/nvm-sh/nvm)

Download [GitHub Desktop](https://desktop.github.com/), which will allow you to manage repositories on your computer using a graphical user interface, and work with any code environments on your computer (e.g. VSCode, WebStorm, etc.)

## Libraries To Read When Creating Visuals
1. `node-htmlprocessor`: [Link](https://github.com/dciccale/node-htmlprocessor)
2. `HighCharts`: [Link](https://www.highcharts.com/)
   - We are currently using the non-profit license that requires that the `HighCharts` logo be displayed on the chart.
   - We are using version `11.0.0`, which is hosted externally.
   - Under the `Demos` tab on the Highcharts website, there are visualization templates of various kinds. When creating a data visualization, finding a template from Highcharts similar to what you’re trying to develop and working off the existing JavaScript code from the Highcharts template can be beneficial. You can find the code for that specific visual under the `View Code` or `Copy JS code` tabs under the visualization.

## Build Process for a Visualization
1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the [repository](https://github.com/chicagomaroon/data-visualizations) from GitHub if you have not already.
2. Go to the base folder of the `data-visualizations` repository and run the command `npm ci`
3. Create the HTML file that will serve as the basis for your visualization inside its respective year and story folder via the `npm run create-visual` command.  This will create a folder with all the necessary files to create your visual.
    - If it is the year `2023` and your story is called `Example Visual` then go to the year folder `2023` and your story's folder `example-visual` in [kebab-case](https://www.freecodecamp.org/news/programming-naming-conventions-explained#what-is-kebab-case).
    - Example command: `npm run create-visual --year=2023 --story=example-visual`
      - If you would rather use the [D3](https://d3js.org/) library, [d3plus](https://github.com/d3plus/d3plus), use this command: `npm run create-visual-d3 --year=2023 --story=example-visual`
4. Start creating your visual that will be housed in the `./$year/$story/` folder.
    - In your `./$year/$story/` folder, there will be a file called `main.js`. This is where you’ll write the JavaScript logic for your visual.
    - If you are using Highcharts, [this site](https://api.highcharts.com/highmaps/) gives a lot of helpful documentation on the options for creating charts.
    - Note that any external files, things not stored within this repository, should not be included in the `<build>` tags.
5. Update the `meta_data.json` in your story's folder, which will look something like this:
   ```json
   {
     "title": "Example Visual",
     "description": "Describe your visual"
   }
   ```
    - Make sure the title you write in the `meta_data.json` file is the same as the title you give your visual in `main.js` and in `index.html`'s `<title>` tag.
6. Run `npm run lint` and make the changes that the output recommends.
7. Go to the base folder of the `data-visualizations` repository and run the command `npm run process-visual --year=[year] --story=[kebab-case-story-name]`
   - Example: `npm run process-visual --year=2023 --story=example-visual`

## Commands
- `npm run lint`: Runs the formatter and linter in the repository and will let you know if any JavaScript faux pas were made in your code
- `npm run create-visual --year=[year] --story=[kebab-case-story-name]`: Creates a copy of the HighCharts files in `./template_visual/highcharts` to the `/$year/$story` folder, which will serve as the basis of your new Chicago Maroon visual
- `npm run create-visual-d3 --year=[year] --story=[kebab-case-story-name]`: Creates a copy of the D3 files in `./template_visual/d3plus` to the `/$year/$story` folder, which will serve as the basis of your new Chicago Maroon visual
- `npm run process-visual --year=[year] --story=[kebab-case-story-name]`: Runs `node-htmlprocessor` on the `index.html` file in the `/$year/$story` folder and outputs the processed version as `$story.min.html`

## HTML Segment Using the iframe
Here is the template to for putting minified HTML files into the WordPress site using an iframe:
```html
<div class="iframe-container">
   <iframe class="data-viz-container" src="https://chicagomaroon.github.io/data-visualizations/[PATH TO MINIFIED HTML FILE]"></iframe>
</div>
<div class="data-viz-description-container">
   <div class="data-viz-credit">
      <a href="https://chicagomaroon.com/staff_name/[FIRST NAME]-[LAST NAME]/">[AUTHOR OF CHART]</a>
   </div>
   <div class="data-viz-description">[DESCRIPTION OF CHART]</div>
</div>
```
