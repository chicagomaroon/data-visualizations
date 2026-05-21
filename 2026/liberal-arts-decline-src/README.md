# chicago_majors

This is a repository for the Maroon article on major composition at UChicago and other schools. 

## Data

See the data folder for data. There are three sub folders

1. `data/chicago_specific` which contains the 2024-2025 convocation program, data on changes in program requirements, enrollment numbers for intro econ classes, and student outcome data.
2. `data/classifications` which contains the National Academy of Arts and Sciences classification of cip codes as well as the classification I use for analysis `data/classifications/final_classifications.xlsx`.
3. `data/ipeds` which contains raw and cleaned IPEDS completion files.

## Scripts

See the scripts folder for R code that cleans the data and preforms the analysis.

The primary cleaning script is `scripts/cleaning/clean_ipeds.R`, which cleans the raw IPEDS completion data and restrict to the annalytical sample.

The primary analysis scripts are:

* `scripts/analysis/analyze_ipeds.R` performs the Ivy Plus level analysis
* `scripts/analysis/analyze_uchicago.R` performs the Chicago specific major shares analysis
* `scripts/analysis/student_outcomes_chicago.R` creates the student outcomes plot
* `scripts/analysis/change_humanities_arts.R` analyzes the change for individual humanities and arts majors
* `scripts/analysis/requirement_changes.R` summarises the change in requirements

## Output

See the output folder for the plots and figures.
