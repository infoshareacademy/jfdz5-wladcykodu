/**
 * Translation of elements which have data-lang attribute with other language text
 */
function translatePage() {
    $('[data-lang]').each(function() {
        var oldValue = this.innerText;
        this.innerText = this.getAttribute('data-lang');
        this.setAttribute('data-lang', oldValue);
    });
    $('.language-toggle').each(function() {
        var oldSrc = this.getAttribute('src');
        var oldAlt = this.getAttribute('alt');
        this.setAttribute('src', this.getAttribute('data-flag'));
        this.setAttribute('alt', this.getAttribute('data-alt'));
        this.setAttribute('title', this.getAttribute('data-alt'));
        this.setAttribute('data-flag', oldSrc);
        this.setAttribute('data-alt', oldAlt);
    });
};