//https://www.nytimes.com/interactive/2025/02/13/us/doc-annotation-memo-from-bove.html

document.querySelectorAll('.highlight').forEach((highlight) => {
    highlight.addEventListener('click', (e) => {
        if (highlight.classList.contains('active')) {
            highlight.classList.remove('active');
        } else {
            highlight.classList.add('active');
        }
    });
});
