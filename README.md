# The Chicago Maroon's Data Visualizations

Feature stories by The Chicago Maroon grouped by year into corresponding folders.

## GitHub concepts and processes to know
- [GitHub Feature Branches](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- [GitHub Pull Requests](https://www.atlassian.com/git/tutorials/making-a-pull-request)

## Technical necessities
1. [npm](https://www.npmjs.com/) v7.20.3
2. The environment variables `CHICAGO_MAROON_USER_NAME` and `CHICAGO_MAROON_PASSWORD` variables need to be saved in your [.env](https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj) file.
   - An example of a `.env` file can be found in the `.env_template` file, please follow the directions there.
   - The two variables should contain the credentials you use to sign on to the Maroon's WordPress site.
   - ```
     CHICAGO_MAROON_USER_NAME=your_user_name@uchicago.edu
     CHICAGO_MAROON_PASSWORD=your_password
     ```

## Libraries to read when creating visuals
1. `node-htmlprocessor`: [Link](https://github.com/dciccale/node-htmlprocessor)
2. `amCharts`: [Link](https://www.amcharts.com/)
   - We are currently using the non-profit license that requires that the `amCharts` logo be displayed on the chart.
   - We are using version `5.3.8`, which is hosted externally.
   - If any questions come from the `amCharts` or `UChicago` legal department regarding this license, please reference this `amCharts` support request number: `75825`

## Build process for a visualization
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
     "caption": "Here is some information about the visual.",
     "description": "Describe your visual"
   }
   ```
6. Run `npm run lint` and `npm run format` and make the changes that the output of those commands recommend, if they recommend anything.
7. Go to the base folder of the `data-visualizations` repository and run the command `npm run process-visual --year=[year] --story=[kebab-case-story-name]`
   - Example: `npm run process-visual --year=2023 --story=example-visual`
8. You should now have a file named `[story].min.html` in your story's folder. Run the command `npm run wordpress-upload --year=[year] --story=[kebab-case-story-name]` and your `[story].min.html` file will be uploaded to the `media` folder on the Chicago Maroon WordPress site.
   - Example: `npm run wordpress-upload --year=2023 --story=example-visual`

## Commands
- `npm run format`: This will format the JavaScript inside the repository
- `npm run lint`: Runs the linter in the repository and will let you know if any JavaScript faux pas were made in your code
- `npm run create-visual --year=[year] --story=[kebab-case-story-name]`: Creates a copy of the files in `./template_visual` in the `/$year/$story` folder, which will serve as the basis of your new Chicago Maroon visual
- `npm run process-visual --year=[year] --story=[kebab-case-story-name]`: Runs `node-htmlprocessor` on the `index.html` file in the `/$year/$story` folder and outputs the processed version as `$story.min.html`
- `npm run wordpress-upload --year=[year] --story=[kebab-case-story-name]`: Runs a JavaScript file that exports the `$story.min.html` file to the WordPress `media` folder 
