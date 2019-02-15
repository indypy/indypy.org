/*global angular, Modernizr, Instafeed */

var indypy = (function(angular, Modernizr, Instafeed, ffImghelpers) {

    var SCROLL_DURATION = 500;
    var HEADROOM_OFFSET = 84; /* height of header */
    var HEADROOM_PIN_DELAY = 0;
    var HEADROOM_UNPIN_DELAY = 0;
    var INVIEW_CLASS = "in-view";
    var INVIEWED_CLASS = "in-viewed";

    var module = angular.module('indypy', [
        'ngAnimate', 'duScroll', 'duParallax',
        'ff.imghelpers'
    ]);

    module.config([
        '$interpolateProvider', function($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }
    ]);

    module.value('duScrollDuration', SCROLL_DURATION);

    module.directive('inView', [
        '$window', '$timeout',
        function($window, $timeout) {
        return {
            restrict: 'EA',
            link: function(scope, el) {
                var render = function() {
                    if (ffImghelpers.isInView(el[0])) {
                        el.addClass(INVIEWED_CLASS).addClass(INVIEW_CLASS);
                    } else {
                        el.removeClass(INVIEW_CLASS);
                    }
                };
                angular.element($window).bind('scroll', render);
                render();
            }
        };
    }]);

    module.directive('headroom', [
        '$window', '$timeout',
        function($window, $timeout) {
        return {
            restrict: 'EA',
            scope: {
                toleranceUp: '=',
                toleranceDown: '=',
                classes: '=',
                scroller: '@'
            },
            link: function(scope, el) {
                var options = {
                    tolerance: {
                        up: scope.toleranceUp || 0,
                        down: scope.toleranceDown || 0
                    },
                    classes: scope.classes,
                    scroller: scope.scroller,
                    offset: HEADROOM_OFFSET
                };
                if (options.scroller) {
                    options.scroller = angular.element(options.scroller)[0];
                }
                var headroom = new Headroom(el[0], options);
                headroom.init();
                angular.element($window).on('resize', function() {
                    headroom.offset = HEADROOM_OFFSET;
                });
                scope.$on('$destroy', function() {
                    headroom.destroy();
                });
                scope.$on('pin', function() {
                    $timeout(function() {
                        headroom.pin();
                    }, HEADROOM_PIN_DELAY);
                });
                scope.$on('unpin', function() {
                    $timeout(function() {
                        headroom.unpin();
                    }, HEADROOM_UNPIN_DELAY);
                });
            }
        };
    }]);

    function initialize(data) {

        module.controller('Ctrl', [
            '$scope', '$document', '$timeout', '$sce', 'parallaxHelper',
            function($scope, $document, $timeout, $sce, parallaxHelper) {

                $scope.animator = parallaxHelper.createAnimator(-0.3);

                $scope.scrollTo = function(id) {
                    var el = $document[0].getElementById(id);
                    $document.scrollToElement(el, 0, SCROLL_DURATION);
                };

            }
        ]);

    }

    function start(data) {

        initialize(data);

        angular.bootstrap(document.body, [
            'indypy'
        ]);

    }

    return {
        module: module,
        start: start
    };

}(angular, Modernizr, Instafeed, ffImghelpers));
