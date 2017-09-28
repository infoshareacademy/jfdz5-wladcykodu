/**
 * Translation of elements which have data-lang attribute with other language text
 */
function translatePage() {

    // Find all elements to translate

    let $items = $('[data-lang]')

    // Find all elements with value and translate values

    let $itemsWithValue = $items.filter('input[type=button], input[type=submit]')

    $itemsWithValue.each(function() {
        let oldValue = $(this).val();
        $(this).val($(this).attr('data-lang'))
        $(this).attr('data-lang', oldValue);
    });

    // Find all elements with placeholder and translate placeholder

    let $itemsWithPlaceholder = $items.filter('[placeholder]')

    $itemsWithPlaceholder.each(function() {
        let oldValue = $(this).attr('placeholder');
        $(this).attr('placeholder', $(this).attr('data-lang'));
        $(this).attr('data-lang', oldValue);
    });

    // Find all elements with text and translate texts

    let $itemsWithText = $items.filter(':not(input)')

    $itemsWithText.each(function() {
        let oldValue = $(this).text();
        $(this).text($(this).attr('data-lang'))
        $(this).attr('data-lang', oldValue);
    });

    // Switch flag

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
