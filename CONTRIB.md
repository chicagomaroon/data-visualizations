# Contributors Guide

Interested in writing a story with the Maroon Data Team? Follow the steps below.

1. If you are new, please complete all the [getting started](#from-the-very-beginning) steps.
2. Claim a story on the pitch document (see Slack channel for pitch list) or pitch a new story. To pitch a new story, fill out Data Team Story Outline (TK) and send to a Data Editor for review.
3. Research, write, and create necessary visuals for your story. Feel free to create draft visuals using any program or language that you would like. Published visuals will need to be created by following the [build process](#build-process-for-a-visualization). Any visuals that do not follow the build process must be approved by a data editor. Visuals must follow the Maroon's Data [Style Guide](#style-guide).

## Getting Started

### Setup

This section walks through the necessary software you need to understand and install to participate in our team. We don't expect you to know or already have installed any of this, but **even if you do, please read everything to avoid missing something important that is specific to us**.

1. Learn about the Terminal, running commands, and navigating your file system.

    - What is the Terminal?
        - The Terminal is a built-in program on your computer designed to let you interact with files, code, programs, and more at a low level. You do all of this by running commands. Thus, the Terminal is an example of a Command Line Interface (CLI).
        - Warning: The Terminal may have a different name if you're using Windows, and the more complex commands may be different.
    - How do I run commands?
        - To run a command, type it into the Terminal and hit "Enter/Return".
        - Each operating system (Mac, Windows, Linux, etc.) has its own language for built-in commands, but the basics are generally the same.
        - The Terminal works within your computer's file system. Your Terminal always displays a current location ("working directory", or "WD" for short) on the same line where you type your commands. Any commands you run are in the context of your WD. For example, if you run the command `ls` ("list"), the Terminal will list the contents of your WD.
        - **When we ask you to "run `[command]` in `[location]`", we are asking you to go to `[location]` in your Terminal, type `[command]` into the prompt line, and hit "Enter".**
    - Try running the following commands to get a feel for navigating your computer's file system through the Terminal:
        - `pwd` ("print working directory"): Prints a path from the root of your file system to your current WD
        - `ls` ("list"): Prints a list of the contents of your current WD
        - `cd ..` ("change directory"):  Moves you from your current WD to its parent directory
        - `cd [child directory]`: Moves you from your current WD to the specified child directory
            - For example, if I am currently located in my `Documents` folder and there is a sub-folder called `Maroon`, I can move to `Maroon` via `cd Maroon`
    - Another tip: When you're typing a command in the Terminal, you can hit `Tab` and it will try to auto-fill what it thinks you're typing. This is very useful when navigating to folders with long names.
    - The Terminal's built-in language has much more vocabulary and grammar that allows you to do a number of complex things, but for our purposes, you just need to know the basics. Software like Git and Node add their own commands we will discuss later.

2. Download Git, make a Github account, and learn about version control.

    - What is Git?
        - Git is the most widely used version management software. 
        - Once you download Git, you can set up a "Git repository" (or "Git repo" for short) in one of your existing folders. 
        - In a Git repo, you can run Terminal commands to track your changes to the folder's contents, create and switch between different versions of your code (called "branches"), and cleanly combine changes made on different branches. 
        - For more detailed information on Git, see [this book](https://git-scm.com/book/en/v2).
    - Download Git [here](https://git-scm.com/downloads).
    - What is GitHub?
        - [GitHub](https://github.com/) is a widely used system that extends Git to allow collaboration on a Git repo. Our team hosts its code in a collection of public repos found [here](https://github.com/chicagomaroon).
        - Vocabulary: Through GitHub, you can
            - "clone" (download) a "remote" repository into a folder on your computer, creating a "local" version,
            - "push" (upload) any changes you make,
            - "pull" others' changes to the remote repo into your local repo,
            - "push" your own changes to the remote repo for others to "pull",
            - create "branches" (alternate versions of the repo) for yourself and others to see/edit,
            - create "pull requests" to open a conversation asking to merge a branch into the main repository version,
            - and much more!
    - Make an account with GitHub if you do not have one: https://github.com/join.
        - Warning: Be aware that if you only link your UChicago email address, your GitHub account will likely disappear after you graduate. We recommend creating your account with your personal email address and then linking your UChicago address as a secondary address.
    - Send the Lead Developer(s) your GitHub username so we can add you as a contributor to our repository.
    - What is GitHub Desktop?
        - Although you can interact with Git and GitHub entirely through the Terminal, we do not recommend using them that way.
        - If you want a cleaner, more intuitive interface, download [GitHub Desktop](https://desktop.github.com/), which will allow you to manage repositories on your computer using a graphical user interface (GUI), and work with any code environments on your computer (e.g. VSCode, WebStorm, etc.).
    - There are lots of resources to learn more about version control using Github. Below are a few we recommend but we encourage you to exploring other online resources as needed.
        - Version Control by [The Missing Semester from MIT](https://missing.csail.mit.edu/2020/version-control/)
        - [CAPP Camp Git I and Git II](https://uchicago-capp30121-aut-2022.github.io/capp-camp/s2-git-i/)
        - [GitHub Feature Branches](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
        - [GitHub Pull Requests](https://www.atlassian.com/git/tutorials/making-a-pull-request)

3. Clone the `data-visualizations` repo from [here](https://github.com/chicagomaroon/data-visualizations).

    - You can do this through either Terminal commands or GitHub Desktop. 
    - Learn more about cloning [here](https://uchicago-capp30121-aut-2022.github.io/capp-camp/s3-git-ii/1-working-from-multiple-locations.html#using-git-clone).

4. Download a code editor.

    - Code editors are applications that allow you to open a text file and edit its contents, like Microsoft Word but for any basic text file type. This includes code files (ending in `.js`, `.py`, `.r`, etc.), data files (`.csv`, `.json`, etc.), and text/markdown files (`.txt`, `.html`, `.md`, etc.).
    - If you do not have a strong opinion about which code editor to use, download [Visual Studio Code](https://code.visualstudio.com/) (often just called VS Code).
        - Learn more about code editors generally [here](https://missing.csail.mit.edu/2020/editors/)
        - Learn more about VS Code [here](https://uchicago-capp30121-aut-2022.github.io/capp-camp/s1-linux/2-vs-code-layout.html)
    - If you want a more specialized web development environment, try [Webstorm](https://www.jetbrains.com/webstorm/), a powerful JavaScript IDE (Integrated Development Environment). This software is not free, but as a UChicago student, you should be able to get a [free license](https://www.jetbrains.com/community/education/#students).
    - In general, feel free to use whichever code editor you prefer as long as it allows you to edit HTML, CSS, and JavaScript files. 

5. Download Node, a piece of software that will allow you to run Javascript, the programming language we use to write our visualizations in.

    - Download here: [node.js](https://nodejs.org/en) `v20.9.0`
        - To install the correct version, open the terminal and run:
            1. Install [Node Version Manager](https://github.com/nvm-sh/nvm) with `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash` . If you are getting error "should not accept aliases with slashes" (likely if you are on Windows) try using `nvm-setup.exe` from the [Windows release site](https://github.com/coreybutler/nvm-windows/releases).
            2. Install the correct version of Node `nvm install v20.9.0`. If you are getting error of nvm not recognized, run `source ~/.nvm/nvm.sh` and then run above again.
            3. Set this version as the default by running `nvm alias default 20.9.0` and `nvm use 20.9.0`.
            4. Confirm the correct version is installed by running `node -v`. This should return `v20.9.0`.

6. After you have cloned the repo and downloaded Node, go to the base folder of your local copy of the `data-visualizations` repository and run the command `npm ci` to install all package dependencies. You will only need to do this once

7. Check your undestanding and make sure that everything is set up properly.

    - Terminal: Try navigating from one folder on your computer to another in the Terminal using `pwd`, `ls`, and `cd`.
    - Code editor: Whichever code editor you installed, make sure you can find it as an app on your computer.
    - Version checks: If any of the following commands gives you an error message, please reach out to us for assistance.
        - Git: Run `git --version`. (It doesn't matter what your current WD is)
        - Node: Run `node --version`. This should print `v20.9.0`.
        - NPM: Run `npm --version`.
    - If you installed GitHub Desktop, make sure you can find it as an app on your computer.
    - Find your local version of the `data-visualizations` repository as a folder on your computer.

### Tools and Skills to Review

Programming is a skill that you learn by doing. There is no expectation that someone fully understands a programming language or package before they can start creating things. Much of the process is about learning as you go and building a muscle of problem solving and debugging as you go.

With that being said, use the resources below as a starting place and reference source. Aim to learn just enough to jump into a project and learn the rest as you go.

-   We primarily use [`HighCharts`](https://www.highcharts.com/), a JavaScript library, to build visualizations. Each HighChart graphic is embedded on a simple HTML page that is linked in its parent story.
    -   The best place to start is to find a previously created visual from the Maroon Team by opening [https://chicagomaroon.github.io/data-visualizations/example-graphs](./example-graphs.html) from your local repository. This will have example charts and links to the accompanying code to review. When creating a data visualization, finding a chart similar to what you’re trying to develop and working off the existing JavaScript code linked.
    -   If there is not an example similar to what you want to create, review the [`Demos` tab](https://www.highcharts.com/demo/) on the Highcharts website and review the code. You can find the code for that specific visual under the `View Code` or `Copy JS code` tabs under the visualization.
    -   Continue to [Build Process for a Visualization](#build-process-for-a-visualization)
-   Other tools include:
    -   Google Sheets: Often the best tool to work with csv's or any tabular data is Google Sheets. You can review, filter, and pivot the data as well as make draft visuals
    -   R and Python: For more data-intensive projects, you may want to consider using R or Python. See examples in the [data-analysis](https://github.com/chicagomaroon/data-visualizations/tree/main/data-analysis) folder.
    -   For mapping, we have used [Leaflet](https://leafletjs.com/), an open-source JavaScript library, for mobile-friendly interactive maps. You can also use GeoJSON.io to draw on a map and get the coordinates as a .geojson file.
    -   For more customizable, interactive visualizations, [D3.js](https://observablehq.com/@d3/gallery?utm_source=d3js-org&utm_medium=nav&utm_campaign=try-observable) has become a popular package. There is a steep learning curve for this tool but gives you total control over your visuals. Austin developed a [D3 training](https://observablehq.com/d/c93d3eee860282c0) based on James Turk's Data Visualization course. Recommended prerequisites include HTML/CSS.
    -   You may be interested in creating more accessible visuals for a broad audience. One option is to start with this short [introduction to accessibility on the web](https://github.com/notkarenyi/accessibility-demo).

See the [resources][resources/] folder for additional material.

## Build Process for a Visualization

1. Go to the base folder of the `data-visualizations` repository and ensure your local repo is up to date with the remote repo by running `git checkout main` and `git pull`
1. Create a branch for your story by running `git checkout -b '[kebab-case-story-name]'`. Replace the values in brackets with the relevant names. Read more about kebab-case [here](https://www.freecodecamp.org/news/programming-naming-conventions-explained#what-is-kebab-case).
1. In the terminal run `npm run create-visual --year=[year] --story=[kebab-case-story-name]` This will create a folder with all the necessary files to create your visual.
    - If it is the year `2024` and your story is called `Example Visual` then run the command `npm run create-visual --year=2023 --story=example-visual` using the year `2024` and your story's name `example-visual` in kebab-case.
    - For the error `The syntax of the command is incorrect`, use ChatGPT to edit the command for your terminal. For example, Git Bash requires line breaks. You may also have to manually set environment variables with `npm_config_year=` and `npm_config_story=`.
    - In your `./[year]/[story-name]/` folder, there will be a file called `main.js`. This is where you’ll write the JavaScript logic for your visual.
1. Start creating your visual that will be housed in the `./[year]/[story-name]/` folder.
    - If you'd like to see previously created example visuals, open [example-graphs.html](./example-graphs.html) from your local repository.
    - If you are using Highcharts, here is a lot of helpful documentation on the [options for creating charts](https://api.highcharts.com/highmaps/).
1. Update the `meta_data.json` in your story's folder, which will look something like this:
    ```json
    {
        "title": "Example Visual",
        "description": "Describe your visual"
    }
    ```
    - Make sure the title you write in the `meta_data.json` file is the same as the title you give your visual in `main.js` and in `index.html`'s `<title>` tag.

1. Run `npm run format` and make the changes that the output recommends. Also ensure the title, subtitle, and captions follow the requirements in the [Contribution Standards section](#titles-subtitles-and-captions). Ensure the chart and annotations still look correct at a width of ~700px. This is the width of the charts when online.
1. Go to the base folder of the `data-visualizations` repository and run the command `npm run process-visual --year=[year] --story=[kebab-case-story-name]`
    - Example: `npm run process-visual --year=2023 --story=example-visual`
1. Create a Pull Request to have your visual reviewed by committing and pushing your changes.
    - In your pull request, include a screenshot of the visual. Ensure the visual is ~700px.  
    - You can run `git status` to see which files in red have not been added. Then run `git add [file-name]` for each file to add them. Next run `git commit -m '[commit message]'` to commit your changes. Then run `git push` to push your changes. If this is your first commit, github may ask you to run a different command, which you should. Ex `git push --set-upstream origin [branch-name]`


## The Chicago Maroon’s Data Contribution and Style Guide

### Contribution Standards

#### Pull Request Titles

They should be written in the present imperative tense. Examples of that tense are:
"Fix issue in the dispatcher where…", "Improve our handling of…", etc."

#### Pull Request Information

All pull requests should contain a still of the image and be linted, minified, contain no more imports than needed, and approved by at least one of the Lead Developers.

### Style Standards

Examples for external style guides for inspiration.

-   [Urban Institute](https://urbaninstitute.github.io/graphics-styleguide/)
-   [BBC](https://bbc.github.io/rcookbook/)
-   [Other organizations](https://docs.google.com/spreadsheets/d/1F1gm5QLXh3USC8ZFx_M9TXYxmD-X5JLDD0oJATRTuIE/edit?gid=1679646668#gid=1679646668)

#### Font

The font is set via the [`main.css`](./static/main.css) file. The default font, and the one used on the rest of _The Chicago Maroon_, is [Georgia, serif font](https://www.cssfontstack.com/Georgia).

#### Plot Titles, Subtitles, and Captions

- Plot `title`: A few words describing what the plot is about (can be a phrase or a question, not a full statement).
- Plot `subtitle` (optional): A short sentence summarizing the main takeaway from the data; this should end with a period.
- Plot `caption` (optional): Any asterisk-style note that adds important clarifying context to part of the plot (ex: if data for one year is incomplete, put an asterisk on that year and make an asterisk-prefixed note in the caption).
- HTML caption (Adding in SNO): One or more longer sentences explaining findings and tying the plot to the story and a link to the data source (on a new line).

In addition, titles and subtitles should meet the following constraints:

-   They should ideally not take up more than one line each.
-   They should be centered, not left or right-justified.
-   Links should be added using [anchor tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).

#### Colors

Color palettes are based off the [UChicago style guide](https://news.uchicago.edu/sites/default/files/attachments/_uchicago.identity.guidelines.pdf). Our template for new HighCharts visuals already has the appropriate color scheme.

<img src="static/primary-colors.png" alt="UChicago primary colors."/>

<img src="static/secondary-colors.png" alt="UChicago secondary colors."/>
