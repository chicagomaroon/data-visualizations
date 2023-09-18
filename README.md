# The Chicago Maroon’s Data Visualizations
Feature stories by The Chicago Maroon grouped by year into corresponding folders.

## The Visuals are served via this URL template
URL Template: `http://chicagomaroon.github.io/data-visualizations/[PATH TO FILE]`

URL Example: `http://chicagomaroon.github.io/data-visualizations/2023/thifting-growth/thifting-growth.min.html`

## GitHub Concepts and Processes To Know
- [GitHub Feature Branches](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- [GitHub Pull Requests](https://www.atlassian.com/git/tutorials/making-a-pull-request)

## Technical Necessities
1. [npm](https://www.npmjs.com/) v7.20.3

## Libraries To Read When Creating Visuals
1. `node-htmlprocessor`: [Link](https://github.com/dciccale/node-htmlprocessor)
2. `HighCharts`: [Link](https://www.highcharts.com/)
   - We are currently using the non-profit license that requires that the `HighCharts` logo be displayed on the chart.
   - We are using version `11.0.0`, which is hosted externally.

## Build Process for a Visualization
1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the [repository](https://github.com/chicagomaroon/data-visualizations) from GitHub if you have not already.
2. Go to the base folder of the `data-visualizations` repository and run the command `npm install`
3. Create the HTML file that will serve as the basis for your visualization inside its respective year and story folder via the `npm run create-visual` command.
    - If it is the year `2023` and your story is called `Example Visual` then go to the year folder `2023` and your story's folder `example-visual` in [kebab-case](https://www.freecodecamp.org/news/programming-naming-conventions-explained#what-is-kebab-case).
    - Example command: `npm run create-visual --year=2023 --story=example-visual`
4. Start creating your visual that will be housed in the `./$year/$story/` folder.
   - Look to the documentation [here](https://github.com/dciccale/grunt-processhtml#readme) for how to write your processed HTML.
   - Note that any external files, things not stored within this repository, should not be included in the `<build>` tags.
5. Update the `meta_data.json` in your story's folder, which will look something like this:
   ```json
   {
     "title": "Example Visual",
     "description": "Describe your visual"
   }
   ```
6. Run `npm run lint` and make the changes that the output recommends.
7. Go to the base folder of the `data-visualizations` repository and run the command `npm run process-visual --year=[year] --story=[kebab-case-story-name]`
   - Example: `npm run process-visual --year=2023 --story=example-visual`

## Commands
- `npm run lint`: Runs the formatter and linter in the repository and will let you know if any JavaScript faux pas were made in your code
- `npm run create-visual --year=[year] --story=[kebab-case-story-name]`: Creates a copy of the files in `./template_visual` in the `/$year/$story` folder, which will serve as the basis of your new Chicago Maroon visual
- `npm run process-visual --year=[year] --story=[kebab-case-story-name]`: Runs `node-htmlprocessor` on the `index.html` file in the `/$year/$story` folder and outputs the processed version as `$story.min.html`

## HTML Segment Using the iframe
Here is the template to for putting minified HTML files into the WordPress site using an iframe:
```html
<iframe style="height: 425px; width: 100%; border: none;" src="[PATH TO MINIFIED HTML FILE]"></iframe>
<div style="font-size: 14px !important; margin-bottom: 20px;" align="center">[DESCRIPTION OF CHART] (Chart: [AUTHOR OF CHART])</div>
```
