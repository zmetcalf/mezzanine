mezzanine.jQuery(document).ready(function(){
    
    /// FIELDSETS
    mezzanine.jQuery('fieldset[class*="collapse-closed"]').each(function() {
        mezzanine.jQuery(this).addClass("collapsed");
        mezzanine.jQuery(this).find('h2:first').addClass("collapse-toggle");
    });
    mezzanine.jQuery('fieldset[class*="collapse-open"]').each(function() {
        mezzanine.jQuery(this).find('h2:first').addClass("collapse-toggle");
    });
    mezzanine.jQuery('h2.collapse-toggle').bind("click", function(e){
        mezzanine.jQuery(this).parent().toggleClass('collapsed');
        mezzanine.jQuery(this).parent().toggleClass('collapse-closed');
        mezzanine.jQuery(this).parent().toggleClass('collapse-open');
    });
    
    /// OPEN FIELDSETS WITH ERRORS
    mezzanine.jQuery('fieldset[class*="collapse-closed"]').children('div[class*="errors"]').each(function(i) {
        mezzanine.jQuery(this).parent().toggleClass("collapsed");
        mezzanine.jQuery(this).parent().toggleClass('collapse-closed');
        mezzanine.jQuery(this).parent().toggleClass('collapse-open');
    });
    
});
