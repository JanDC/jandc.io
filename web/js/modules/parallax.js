/*!
 * jQuery lightweight accessible toggle plugin
 * Author: @gijsroge
 * Licensed under the MIT license
 */
(function ($) {

    $.fn.simpleParallax = function (options) {

        let ticking;
        let instance = 0;
        let params = [];

        simpleParallax = this;
        simpleParallax.params = params;

        /**
         * Helper functions
         */
        /**
         * Get scroll percentage
         * @returns {number}
         */
        const getScrollPercent = () => {
            const h = document.documentElement,
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight';
            if((h[sh] || b[sh]) - h.clientHeight == 0){
                return 0;
            }
            return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
        }

        /**
         * Percentage of value
         *
         * @param value
         * @returns {number}
         */
        const pof = (value) => {
            if (value) {
                return value * getScrollPercent() / 100;
            } else {
                return 0;
            }
        }

        /**
         * Check support for css property
         *
         * @param properties
         * @returns {*}
         */
        const getSupportedPropertyName = (properties) => {
            for (let i = 0; i < properties.length; i++) {
                if (typeof document.body.style[properties[i]] != "undefined") {
                    return properties[i];
                }
            }
            return null;
        }

        /*
         * Plugin default options
         */
        const settings = $.extend({
            selector: '.js-parallax'
        }, options);

        const app = {

            getParams: (id) => {
                return params[id];
            },

            destroy: () => {
                document.removeEventListener('scroll', app.tick);
                return 'removed parallax';
            },

            tick: function (element) {
                if (ticking) return;
                window.requestAnimationFrame(() => {
                    app.updatePosition(element)
                });
                ticking = true;
            },

            /**
             * Fetch paralax base values
             *
             * @param element
             * @returns {{}}
             */
            transformValues: (element) => {
                const transforms = {};
                transforms.rotate = element.data('parallax-rotate');
                transforms.translateX = element.data('parallax-translateX');
                transforms.translateY = element.data('parallax-translateY');
                transforms.translateZ = element.data('parallax-translateZ');
                transforms.scale = element.data('parallax-scale');
                transforms.scaleX = element.data('parallax-scaleX');
                transforms.scaleY = element.data('parallax-scaleY');
                return transforms;
            },

            /**
             * Update elements positions
             *
             * @param item
             */
            updatePosition: (item) => {
                const instance = item.data('parallax-instance');
                const transformValues = app.transformValues(item);
                const transformPrefixes = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];

                animate({
                    el: item,
                    delay: 0,
                    duration: 0,
                    rotate: [pof(transformValues.rotate) - 15],
                    translateX: [(pof(transformValues.translateX) - 10) + "%"],
                    translateY: [(pof(transformValues.translateY) - 17) + "%"],
                    easing: "linear"
                });

                ticking = false;
            },
        };

        /**
         * Loop over all instances
         */
        $(this).each(function () {

            // Store instance on element
            $(this).attr('data-parallax-instance', instance);

            // Add class for css callbacks
            $(this).addClass('is-parallaxing');

            /**
             * Keep state, aka settings and values specific to each instant.
             */
            // Create object to push transform values so we can expose them for third party libs
            params.push({
                transforms: {
                    rotate: '0',
                    translateX: '0',
                    translateY: '0'
                }
            });

            // Update parallax position on load
            app.updatePosition($(this));

            // Bind scroll event to parallax element
            document.addEventListener('scroll', () => {
                app.tick($(this));
            });

            // Increase instance
            instance++;


        });
        return [app, this];
    };

}(jQuery));