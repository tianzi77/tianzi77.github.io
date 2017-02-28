/* global Lizard */
//////修改内容请在自己的区域修改防止冲突//////

(function () {
	//var 'templates/' = 'templates/';
	//var 'controllers/' = 'controllers/';
	var baseUrl = (Lizard.webresourceBaseUrl || '/');
	var isDebug = typeof location != 'undefined' && location.search.indexOf('debug=1') != -1;
	var config = {

		paths: {
			MiceUIScrollLayerTpl: baseUrl + '/templates/MiceUIScrollLayerTpl.html',
			MiceUIScrollLayer: baseUrl + '/controllers/MiceUIScrollLayer',
			SuccessCaseLayerTpl: baseUrl + '/templates/SuccessCaseLayerTpl.html',
			ConsultantTeamLayerTpl: baseUrl + '/templates/ConsultantTeamLayerTpl.html'
       }
	};

	if (isDebug) {
		config.urlArgs = Date.now();
	}

	require.config(config);
})();
