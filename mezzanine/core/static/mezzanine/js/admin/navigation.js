mezzanine.jQuery(function() {
    // Empty out the breadcrumbs div and add the menu into it.
    mezzanine.jQuery('.breadcrumbs').html('')
                     .append(mezzanine.jQuery('.dropdown-menu').show())
                     .css({display: 'inline-block'});

    // Set the hrefs for the primary menu items to the href of their first
    // child (unless the primary menu item already has an href).
    mezzanine.jQuery('.dropdown-menu a').each(function() {
       if ( mezzanine.jQuery(this).attr('href') == '#' ) {
         mezzanine.jQuery(this).attr('href', mezzanine.jQuery(this).parent().find('.dropdown-menu-menu a:first').attr('href'));
       }
    });

    // Provides link to site.
    mezzanine.jQuery('#user-tools li:last').before('<li>' + window.__home_link + '</li>');

    // Fixes issue #594 but is incomplete, see #677

    // function contentMargin() {
    //     // Set margin on main content area so it clears all the fixed-position elements above it
    //     var clearedHeight = 21;
    //     mezzanine.jQuery('#content').prevAll().each(function() {
    //         clearedHeight += mezzanine.jQuery(this).height();
    //     });

    //     mezzanine.jQuery('#content').css('margin-top', clearedHeight);
    // }

    // // Check that content clears menus on both load and resize
    // contentMargin();
    // mezzanine.jQuery(window).resize(contentMargin);

});

// Remove extraneous ``template`` forms from inline formsets since
// mezzanine.jQuery has its own method of dynamic inlines.
mezzanine.jQuery(function() {
    var removeRows = {};
    mezzanine.jQuery.each(mezzanine.jQuery('*[name*=__prefix__]'), function(i, e) {
        var row = mezzanine.jQuery(e).parent();
        if (!row.attr('id')) {
            row.attr('id', 'remove__prefix__' + i);
        }
        removeRows[row.attr('id')] = true;
    });
    for (var rowID in removeRows) {
        mezzanine.jQuery('#' + rowID).remove();
    }
});
