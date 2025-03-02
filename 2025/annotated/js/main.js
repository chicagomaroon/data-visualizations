//https://www.nytimes.com/interactive/2025/02/13/us/doc-annotation-memo-from-bove.html

let active_highlight = document.querySelector('.highlight.active');
let next_highlight;
let config;

document.querySelectorAll('.highlight').forEach((highlight) => {
    highlight.addEventListener('click', (e) => {
        if (highlight.classList.contains('active')) {
            highlight.classList.remove('active');
        } else {
            highlight.classList.add('active');
        }
    });
});

for (let i = 1; i < 17; i++) {
    new Waypoint({
        element: document.querySelector(`#highlight-${i}`),
        handler: function (direction) {
            if (direction == 'down') {
                if (i != 1) {
                    // make active
                    console.log(`highlight-${i}`);
                    next_highlight = document.querySelector(`#highlight-${i}`);
                    activateNextHighlight(next_highlight);

                    updateAnnotationCard(config[i]);
                }
            } else {
                if (i == 1) {
                    // make active
                    console.log(`highlight-${i}`);
                    next_highlight = document.querySelector(`#highlight-${i}`);
                    activateNextHighlight(next_highlight);
                } else {
                    console.log(`highlight-${i - 1}`);
                    next_highlight = document.querySelector(
                        `#highlight-${i - 1}`
                    );
                    activateNextHighlight(next_highlight);

                    updateAnnotationCard(config[i - 1]);
                }
            }
        },
        offset: '50%'
    });
}

// function to deactive current highlight and active next highlight
function activateNextHighlight(next_highlight) {
    if (active_highlight.classList.contains('active')) {
        active_highlight.classList.remove('active');
    }
    active_highlight = next_highlight;
    active_highlight.classList.add('active');
}

function updateAnnotationCard(newText) {
    const annotationCardElement = document.querySelector('.annotation-card');
    const annotationTextElement = document.querySelector(
        '.annotation-card-text'
    );

    // Add fade-out class to the entire card
    annotationCardElement.classList.add('fade-out');

    // Wait for the fade-out animation to complete
    setTimeout(() => {
        // Update the text content
        annotationTextElement.innerHTML = newText;

        // Remove fade-out class and add fade-in class to the entire card
        annotationCardElement.classList.remove('fade-out');
        annotationCardElement.classList.add('fade-in');

        // Remove fade-in class after the animation completes
        setTimeout(() => {
            annotationCardElement.classList.remove('fade-in');
        }, 200);
    }, 200);
}
function init() {
    config = JSON.parse(sessionStorage.getItem('config'));
    console.log(config);
    document.querySelector('.annotation-card-text').innerHTML = config[1];
}

document.addEventListener('DOMContentLoaded', () => {
    // force scroll to top on refresh
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };
    init();
});
