
mezzanine.jQuery(function() {

    mezzanine.jQuery('.keywords-field').css(window.__grappelli_installed ?
                            {margin: '5px 0 0 130px', width: '700px'} :
                            {margin: '5px 0 0 75px', width: '620px'} );

    // Add click functionality to each keyword so that it toggles
    // the keyword's existance in the associated input box.
    mezzanine.jQuery('.keywords-field a').click(function() {
        var field = mezzanine.jQuery(this).parent().prev('input[type=text]');
        var keywords = mezzanine.jQuery.map(field.attr('value').split(','), function(keyword) {
            return mezzanine.jQuery.trim(keyword);
        });
        var keywords = mezzanine.jQuery.grep(keywords, function(keyword) {
            return keyword.length > 0;
        });
        var op, keyword = mezzanine.jQuery(this).text().substr(1);
        if (mezzanine.jQuery.inArray(keyword, keywords) >= 0) {
            keywords = mezzanine.jQuery.grep(keywords, function(keep) {
                return keep != keyword;
            });
            op = '+';
        } else {
            keywords[keywords.length] = keyword;
            op = '-';
        }
        field.attr('value', keywords.join(', '))
        mezzanine.jQuery(this).text(op + keyword);
        return false;
    });

    // When submitting the form, go through each of the keywords
    // fields and post their keywords via AJAX, to retrieve a list of
    // keyword IDs for storing in each of the associated hidden fields.
    var keywordsSaved = false;
    mezzanine.jQuery('input[type=submit]').click(function() {
        if (keywordsSaved) {
            return true;
        }
        var button = mezzanine.jQuery(this);
        var fields = mezzanine.jQuery.makeArray(mezzanine.jQuery('.keywords-field').prev('input[type=text]'));
        var submitKeywords = function() {
            var field = fields.shift();
            var keywords = {text_keywords: field.value};
            mezzanine.jQuery.post(window.__admin_keywords_submit_url, keywords, function(data) {
                var ids = data.split("|")[0].split(',');
                field.value = data.split("|")[1];
                mezzanine.jQuery(field).prev('input').attr('value', ids);
                if (fields.length > 0) {
                    submitKeywords();
                } else {
                    keywordsSaved = true;
                    button.click();
                }
            });
        };
        submitKeywords();
        return false;
    });

});
