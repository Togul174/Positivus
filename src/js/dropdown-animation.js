document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const content = dropdown.querySelector('.dropdown__content');
        
        if (dropdown.open) {
            content.classList.add('is-open');
        }
        
        dropdown.addEventListener('toggle', function() {
            if (this.open) {
                content.classList.add('is-open');
            } else {
                content.classList.remove('is-open');
            }
        });
    });
});