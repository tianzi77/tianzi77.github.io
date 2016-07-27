(function (bingo) {
    'use strict';

    bingo.action('path/master', function ($view, $var) {
        console.log('path/master', $view, $var);

        $view.onReady(function () {
            $view.$getNode().css('visibility', 'visible');
        });


    }); //end action

})(bingo);
