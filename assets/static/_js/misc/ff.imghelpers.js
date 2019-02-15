/*jslint browser:true */
/*global angular */

/*
 * angular-imghelpers
 * https://github.com/bryanchow/angular-imghelpers
 */

var ffImghelpers = (function(angular) {

    // Return true if high density imaging support is available
    function has2x() {
        return window.devicePixelRatio && window.devicePixelRatio > 1;
    }

    // Return true if high density images should be displayed
    function shouldUse2x() {
        return has2x() && window.screen.width > 320;
    }

    // Given a URL, return its 2x density equivalent
    function make2xUrl(url) {
        var dotIndex = url.lastIndexOf(".");
        var name = url.substr(0, dotIndex);
        var ext = url.substr(dotIndex + 1);
        return name + "@2x." + ext;
    }

    // Given a URL, return its 2x density equivalent if client support is
    // available; otherwise return the original URL
    function make2x(url) {
        return shouldUse2x() ? make2xUrl(url) : url;
    }

    // Returns true if any part of the element is horizontally within the
    // viewport
    function isInXView(el, padding) {
        padding = padding || 0;
        var bounds = el.getBoundingClientRect();
        return (
            bounds.right >= -padding &&
            bounds.left <= window.innerWidth + padding
        );
    }

    // Returns true if any part of the element is vertically within the
    // viewport
    function isInYView(el, padding) {
        padding = padding || 0;
        var bounds = el.getBoundingClientRect();
        return (
            (bounds.top < window.innerHeight + padding) &&
            bounds.bottom >= -padding
        );
    }

    // Returns true if any part of the element is within the viewport
    function isInView(el, padding) {
        padding = padding || 0;
        return isInXView(el, padding) && isInYView(el, padding);
    }

    var module = angular.module('ff.imghelpers', []);

    // Lazily load the background image for an element
    // <div ff-bg="imagePath"></div>
    // Automatically generate @2x image src
    // <div ff-bg="imagePath" has2x="1"></div>
    // Call success function after image loaded
    // <div ff-bg="imagePath" ff-bg-loaded="success"></div>
    // Wait until the element is scrolled into view before loading
    // <div ff-bg="imagePath" scroll="1"></div>
    // Set refresh attribute to observe changes to src variables:
    // <div ff-bg="[[ var ]]" refresh="1"></div>
    module.directive('ffBg', [
        '$timeout',
        function($timeout) {
            return {
                link: function(scope, el, attrs) {
                    var isLoaded, width, height;
                    var loadedClass = "loaded";
                    var shouldLoad = attrs.scroll ? function() {
                        return isInView(el[0]);
                    } : function() {
                        return true;
                    };
                    function render() {
                        if (shouldLoad() && !isLoaded) {
                            isLoaded = true;
                            var src;
                            if (attrs.ffBg2x && shouldUse2x()) {
                                src = attrs.ffBg2x;
                            }
                            else if (attrs.has2x && shouldUse2x()) {
                                src = make2xUrl(attrs.ffBg);
                            }
                            else {
                                src = attrs.ffBg;
                            }
                            var css = {
                                'background-image': ""
                            };
                            if (src) {
                                if (width) {
                                    css.width = scope.$eval(width) + "px";
                                }
                                if (height) {
                                    css.height = scope.$eval(height) + "px";
                                }
                            }
                            el.removeClass(loadedClass);
                            el.css(css);
                            var img = new Image();
                            img.onload = function() {
                                css['background-image'] = "url(" + src + ")";
                                el.css(css);
                                el.addClass(loadedClass);
                                if (attrs.ffBgLoaded) {
                                    scope.$apply(
                                        scope.$eval(attrs.ffBgLoaded)
                                    );
                                }
                            };
                            img.src = src;
                        }
                    }
                    if (attrs.scroll) {
                        angular.element(window).bind('scroll', function() {
                            render();
                        });
                    }
                    // Render the image
                    width = attrs.width;
                    height = attrs.height;
                    render();
                    // If refresh specified, watch for changes
                    if (attrs.refresh) {
                        attrs.$observe('width', function(val) {
                            width = val;
                        });
                        attrs.$observe('height', function(val) {
                            height = val;
                        });
                        attrs.$observe('ffBg', function(val) {
                            isLoaded = false;
                            render();
                        });
                    }
                }
            };
        }
    ]);

    return {
        has2x: has2x,
        shouldUse2x: shouldUse2x,
        make2xUrl: make2xUrl,
        make2x: make2x,
        isInXView: isInXView,
        isInYView: isInYView,
        isInView: isInView,
        module: module
    };

}(angular));
