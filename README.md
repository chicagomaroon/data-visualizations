# chicagomaroon.github.io

Feature stories by The Chicago Maroon grouped by year into corresponding folders.

## Tools needed
1. [npm](https://www.npmjs.com/) v7.20.3

## Libraries to read when creating visuals
1. `node-htmlprocessor`: https://github.com/dciccale/node-htmlprocessor
2. `amCharts`: https://www.amcharts.com/
   - We are currently using the non-profit license that requires that the `amCharts` logo be displayed on the chart.
   - If any questions come from the `amCharts` or `UChicago` legal department regarding this license, please reference this `amCharts` support request number: `75825`

## Build process for a visualization

1. Go into the main directory `./chicagomaroon.github.io` and run the command `npm install`
2. Create your HTML with the visualization inside its respective year and feature folder.
    - If it is the year `2023` and your story is called `Example Visual` then go to the folder `2023` and your story's folder `example-visual`.
    - If either of those folders do not exist yet, please create them. Please use [kebab](https://www.freecodecamp.org/news/programming-naming-conventions-explained#what-is-kebab-case) case when creating folder names.
3. Create your visual in a file called `index.html`.
   - Look to the documentation [here](https://github.com/dciccale/grunt-processhtml#readme) for how to write your processed HTML.
   - Note that any external files, things not stored within this repository, should not be included in the `<build>` tags.
4. Run `npm run lint` and `npm run format` and make the changes that the output of those commands recommend, if they recommend anything.
5. Go to the base directory of the `chicagomaroon.github.io` repository and run the command `npm run process-html --dir=[/story/directory]`
   - Example: `npm run process-visual --dir=/2023/example-visual`
6. After you have run the command you should see a file named `index.min.html` in your specified directory which can be passed into the website storage bin and used within an [iframe](https://www.w3schools.com/tags/tag_iframe.ASP) to display your story.
   - This process allows you to editorial an HTML file contains all the data necessary for the display of an interactive visual.

## Commands
- `npm run format`: This will format the JavaScript inside the repository
- `npm run lint`: Runs the linter in the repository and will let you know if any JavaScript faux pas were made in your code
- `npm run process-visual --dir=/year/story-name`: Runs `node-htmlprocessor` on the `index.html` file in the `/year/story-name` directory and outputs the processed version as `index.min.html`

