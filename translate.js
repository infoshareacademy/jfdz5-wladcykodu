/**
 * Translation of elements which have data-lang attribute with other language text
 */
function translatePage() {
    $('[data-lang]').each(function() {
        var oldValue = this.nodeName === "INPUT" ? $(this).val() : $(this).text();
        if ( this.nodeName === "INPUT" ) {
            $(this).val($(this).attr('data-lang'))
        } else {
            $(this).text($(this).attr('data-lang'))
        }
        $(this).attr('data-lang', oldValue);   
    });
    $('.language-toggle').each(function() {
        var oldSrc = $(this).attr('src');
        var oldAlt = $(this).attr('alt');
        $(this).attr('src', $(this).attr('data-flag'));
        $(this).attr('alt', $(this).attr('data-alt'));
        $(this).attr('title', $(this).attr('data-alt'));
        $(this).attr('data-flag', oldSrc);
        $(this).attr('data-alt', oldAlt);
    });
};