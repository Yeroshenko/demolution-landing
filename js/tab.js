function tab(elem) {

    checkTabActive = true;

    elem.closest('._tab-list').querySelectorAll('._tab-link').forEach(element => {
        element.classList.remove('_active');
    })

    elem.classList.add('_active');

    const tabLink = elem;

    let tabBlock, tabBlockActive, tabBlockParent;

    tabBlock = document.querySelector(tabLink.getAttribute('href'));
    
    try {
        tabBlock = document.querySelector(tabLink.getAttribute('href'));
        tabBlockParent = tabBlock.parentNode;
        
        if(tabBlock.classList.contains('_active')) {
            checkTabActive = false;
            return false;
        }

        tabBlockActive = tabBlockParent.querySelector('._tab-block._active');
    } catch {
        return false;
    }

    const tabBlockList      = tabBlockParent.querySelectorAll('._tab-block');

    tabBlockParent.style.minHeight = tabBlockActive.offsetHeight + 'px';
    
    tabBlockActive.classList.add('_fade-out');

    setTimeout(function() {

        tabBlockList.forEach(element => {
            element.classList.remove('_active');
            element.classList.remove('_fade-out');
            element.classList.remove('_fade-in');
        });

        tabBlock.classList.add('_active');

    },300);

    setTimeout(function() {
        tabBlock.classList.add('_fade-in');
        
        
        tabBlockParent.style.minHeight = '0px';

        checkTabActive = false;

    },500);

}