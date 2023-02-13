# chicagomaroon.github.io

Feature stories by The Chicago Maroon grouped by year into corresponding folders.

## Technical necessities
1. [npm](https://www.npmjs.com/) v7.20.3
2. The environment variables `CHICAGO_MAROON_USER_NAME`, `CHICAGO_MAROON_PASSWORD`, and `FULL_NAME` variables need to be saved in your [.env](https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj) file.
   - An example of a `.env` file can be found in the `.env_template` file, please follow the directions there.
   - The two variables should contain the credentials you use to sign on to the Maroon's WordPress site.
   - ```
     CHICAGO_MAROON_USER_NAME=your_user_name@uchicago.edu
     CHICAGO_MAROON_PASSWORD=your_password
     FULL_NAME="FirstName LastName"
     ```

## Libraries to read when creating visuals
1. `node-htmlprocessor`: [Link](https://github.com/dciccale/node-htmlprocessor)
2. `amCharts`: [Link](https://www.amcharts.com/)
   - We are currently using the non-profit license that requires that the `amCharts` logo be displayed on the chart.
   - If any questions come from the `amCharts` or `UChicago` legal department regarding this license, please reference this `amCharts` support request number: `75825`

## Build process for a visualization
1. Go into the main directory `./chicagomaroon.github.io` and run the command `npm install`
2. Create your HTML with the visualization inside its respective year and feature folder.
    - If it is the year `2023` and your story is called `Example Visual` then go to the year folder `2023` and your story's folder `example-visual`.
    - If either of those folders do not exist yet, please create them. Please use [kebab](https://www.freecodecamp.org/news/programming-naming-conventions-explained#what-is-kebab-case) case when creating folder names.
3. Create your visual in a file called `index.html`.
   - Look to the documentation [here](https://github.com/dciccale/grunt-processhtml#readme) for how to write your processed HTML.
   - Note that any external files, things not stored within this repository, should not be included in the `<build>` tags.
4. Create a `meta_data.json` file similar to the one in the `example-visual` folder.
   ```json
   {
     "title": "Example Visual",
     "caption": "Here is some information about the visual.",
     "description": "Describe your visual"
   }
   ```
5. Run `npm run lint` and `npm run format` and make the changes that the output of those commands recommend, if they recommend anything.
6. Go to the base directory of the `chicagomaroon.github.io` repository and run the command `npm run process-html --year=[year] --story=[kebab-case-story-name]`
   - Example: `npm run process-visual --year=2023 --story=example-visual`
7. You should now have a file named `[story].min.html` in your story's folder. Run the command `npm run wordpress-upload --year=[year] --story=[kebab-case-story-name]` and your `[story].min.html` file will be uploaded to the `media` folder on the Chicago Maroon WordPress site.
   - Example: `npm run wordpress-upload --year=2023 --story=example-visual`

## Commands
- `npm run format`: This will format the JavaScript inside the repository
- `npm run lint`: Runs the linter in the repository and will let you know if any JavaScript faux pas were made in your code
- `npm run process-visual --year=[year] --story=[kebab-case-story-name]`: Runs `node-htmlprocessor` on the `index.html` file in the `/year/story-name` directory and outputs the processed version as `story-name.min.html`
- `npm run wordpress-upload --year=[year] --story=[kebab-case-story-name]`: Runs a JavaScript file that exports the `story-name.min.html` file to the WordPress `media` folder 
