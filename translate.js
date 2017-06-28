/**
 * Translation of elements which have data-lang attribute with other language text
 */
function translatePage() {
    $('[data-lang]').each(function() {
        var oldValue = this.innerText;
        this.innerText = this.getAttribute('data-lang');
        this.setAttribute('data-lang', oldValue);
    });
};