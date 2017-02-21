$(window).load(function() {
        //绘制图标自适应设备
        (function () {
            var myCanvas = document.createElement("canvas");
            myCanvas.setAttribute("width", screen.availWidth);
            myCanvas.setAttribute("height", 300);
            myCanvas.setAttribute("id", "barChartCanvas");
            document.getElementById("canvas-form").appendChild(myCanvas);
        })();
		var barChartData = {
			labels : ["北京","上海","March","April","May","June","July"],
			datasets : [
//				{
//					fillColor : "rgba(220,220,220,0.5)",
//					strokeColor : "rgba(220,220,220,1)",
//					data : [65,59,90,81,56,55,40]
//				},
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					data : [280,48,40,19,96,27,100]
				}
			]
			
		};
		
				
		var globalGraphSettings = {animation : Modernizr.canvas};
		showBarChart();
//		function showLineChart(){
//			var ctx = document.getElementById("lineChartCanvas").getContext("2d");
//			new Chart(ctx).Line(lineChartData,globalGraphSettings);
//		};
		function showBarChart(){
			var ctx = document.getElementById("barChartCanvas").getContext("2d");
			new Chart(ctx).Bar(barChartData,globalGraphSettings);
		};
    
		var graphInitDelay = 300;
		
		//Set up each of the inview events here.
		$("#lineChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showLineChart,graphInitDelay);
		});
		$("#barChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showBarChart,graphInitDelay);
		});
		
		$("#radarChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showRadarChart,graphInitDelay);			
		});
		$("#pieChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showPieChart,graphInitDelay);			
		});
		$("#polarAreaChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showPolarAreaChart,graphInitDelay);			
		});
		$("#doughnutChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showDoughnutChart,graphInitDelay);			
		});
		
	});
	
	/**
	 * author Christopher Blum
	 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
	 *    - forked from http://github.com/zuk/jquery.inview/
	 */
	(function ($) {
	  var inviewObjects = {}, viewportSize, viewportOffset,
	      d = document, w = window, documentElement = d.documentElement, expando = $.expando;
	
	  $.event.special.inview = {
	    add: function(data) {
	      inviewObjects[data.guid + "-" + this[expando]] = { data: data, $element: $(this) };
	    },
	
	    remove: function(data) {
	      try { delete inviewObjects[data.guid + "-" + this[expando]]; } catch(e) {}
	    }
	  };
	
	  function getViewportSize() {
	    var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };
	
	    // if this is correct then return it. iPad has compat Mode, so will
	    // go into check clientHeight/clientWidth (which has the wrong value).
	    if (!size.height) {
	      mode = d.compatMode;
	      if (mode || !$.support.boxModel) { // IE, Gecko
	        domObject = mode === 'CSS1Compat' ?
	          documentElement : // Standards
	          d.body; // Quirks
	        size = {
	          height: domObject.clientHeight,
	          width:  domObject.clientWidth
	        };
	      }
	    }
	
	    return size;
	  }
	
	  function getViewportOffset() {
	    return {
	      top:  w.pageYOffset || documentElement.scrollTop   || d.body.scrollTop,
	      left: w.pageXOffset || documentElement.scrollLeft  || d.body.scrollLeft
	    };
	  }
	
	  function checkInView() {
	    var $elements = $(), elementsLength, i = 0;
	
	    $.each(inviewObjects, function(i, inviewObject) {
	      var selector  = inviewObject.data.selector,
	          $element  = inviewObject.$element;
	      $elements = $elements.add(selector ? $element.find(selector) : $element);
	    });
	
	    elementsLength = $elements.length;
	    if (elementsLength) {
	      viewportSize   = viewportSize   || getViewportSize();
	      viewportOffset = viewportOffset || getViewportOffset();
	
	      for (; i<elementsLength; i++) {
	        // Ignore elements that are not in the DOM tree
	        if (!$.contains(documentElement, $elements[i])) {
	          continue;
	        }
	
	        var $element      = $($elements[i]),
	            elementSize   = { height: $element.height(), width: $element.width() },
	            elementOffset = $element.offset(),
	            inView        = $element.data('inview'),
	            visiblePartX,
	            visiblePartY,
	            visiblePartsMerged;
	        
	        // Don't ask me why because I haven't figured out yet:
	        // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
	        // Even though it sounds weird:
	        // It seems that the execution of this function is interferred by the onresize/onscroll event
	        // where viewportOffset and viewportSize are unset
	        if (!viewportOffset || !viewportSize) {
	          return;
	        }
	        
	        if (elementOffset.top + elementSize.height > viewportOffset.top &&
	            elementOffset.top < viewportOffset.top + viewportSize.height &&
	            elementOffset.left + elementSize.width > viewportOffset.left &&
	            elementOffset.left < viewportOffset.left + viewportSize.width) {
	          visiblePartX = (viewportOffset.left > elementOffset.left ?
	            'right' : (viewportOffset.left + viewportSize.width) < (elementOffset.left + elementSize.width) ?
	            'left' : 'both');
	          visiblePartY = (viewportOffset.top > elementOffset.top ?
	            'bottom' : (viewportOffset.top + viewportSize.height) < (elementOffset.top + elementSize.height) ?
	            'top' : 'both');
	          visiblePartsMerged = visiblePartX + "-" + visiblePartY;
	          if (!inView || inView !== visiblePartsMerged) {
	            $element.data('inview', visiblePartsMerged).trigger('inview', [true, visiblePartX, visiblePartY]);
	          }
	        } else if (inView) {
	          $element.data('inview', false).trigger('inview', [false]);
	        }
	      }
	    }
	  }
	
	  $(w).bind("scroll resize", function() {
	    viewportSize = viewportOffset = null;
	  });
	  
	  // IE < 9 scrolls to focused elements without firing the "scroll" event
	  if (!documentElement.addEventListener && documentElement.attachEvent) {
	    documentElement.attachEvent("onfocusin", function() {
	      viewportOffset = null;
	    });
	  }
	
	  // Use setInterval in order to also make sure this captures elements within
	  // "overflow:scroll" elements or elements that appeared in the dom tree due to
	  // dom manipulation and reflow
	  // old: $(window).scroll(checkInView);
	  //
	  // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
	  // intervals while the user scrolls. Therefore the inview event might fire a bit late there
	  setInterval(checkInView, 250);
	})(jQuery);	