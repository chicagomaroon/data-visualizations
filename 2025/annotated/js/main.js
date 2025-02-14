document.querySelectorAll('.highlight').forEach((highlight) => {
    highlight.addEventListener('click', (e) => {
        if (highlight.classList.contains('active')) {
            highlight.classList.remove('active');
        } else {
            highlight.classList.add('active');
        }
    });
});
