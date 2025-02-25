//https://www.nytimes.com/interactive/2025/02/13/us/doc-annotation-memo-from-bove.html

let active_highlight;

document.querySelectorAll('.highlight').forEach((highlight) => {
    highlight.addEventListener('click', (e) => {
        if (highlight.classList.contains('active')) {
            highlight.classList.remove('active');
        } else {
            highlight.classList.add('active');
        }
    });
});

new Waypoint({
    element: document.querySelector('#highlight-2'),
    handler: function (direction) {
        if (direction == 'down') {
            // make active
            console.log('highlight-2');
            active_highlight.classList.remove('active');
            active_highlight = document.querySelector('#highlight-2');
            active_highlight.classList.add('active');
            let annotation = document.querySelector('.annotation-card-text');
            annotation.innerHTML = 'this is second annoation';
        }
    },
    offset: '60%'
});
