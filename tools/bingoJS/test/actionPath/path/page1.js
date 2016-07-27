(function (bingo) {
    'use strict';

    bingo.action('path/page1', function ($view, $var) {
        console.log('path/page1', $view, $var);

        $view.onReady(function () {
            $view.$getNode().css('visibility', 'visible');
        });

    }); //end action

})(bingo);
