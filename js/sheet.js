;(function($) {
    'use-strict';

/**
 * [drawLineGraph draws TimeSheet]
 * @param  {[type]} ctx  [canvas in DOM]
 * @param  {[type]} data [data of events]
 */
    $.fn.drawLineGraph = function(data, headingOptions){
        var _this = this,
        dataLength = 0,
        startX,startY,stopX,stopY,lineWidth,color,font,text,lineStyle
        daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        date = new Date(),
        currentYear = date.getFullYear(),
        ctx = $(_this).get(0).getContext("2d");

        $.each(data, function() {
            dataLength++;
        });

        canvasHeight = dataLength*70;
        console.log(dataLength);
        $(_this).attr('height', canvasHeight);
        
        // Display heading
        heading(headingOptions);

        // Draw a single horizontal line
        startX = 0;
        startY = 0;
        stopX = $('#myCanvas').width();
        stopY = 0;
        drawLineFunction(ctx,startX,startY,stopX,stopY);

        // Draw vertical line
        drawSeperatorLines();

        //fill months
        fillLableforMonths();

        // Start plotting graph
          // ctx.globalAlpha = 1 ; // opacity of canvas line
        plotTimeLine();



        /**
        * [heading creates heading tag]
        * @param  {[type]} options [set of options in array]
        */
        function heading(options) {
            var settings = $.extend({
                text: 'TIMESHEET CHART',
                color: null,
                fontStyle: null,
                year: currentYear
            }, options);

            // Append a new h2 tag to canvas parent
            jQuery('<h2/>', {
                id: 'chartHeading'
            }).prependTo( $(_this).parent() );

            $('#chartHeading').text(settings.text + ' ' + settings.year);

            if (settings.color) {
                $('#chartHeading').css('color', settings.color);
            }

            if (settings.fontStyle) {
                $('#chartHeading').css('font-style', settings.fontStyle);
            }
        }

        /**
         * [drawSeperatorLines draws dashhed seperator line]
         */
        function drawSeperatorLines (){
            // debugger;
            for(var i=0; i<=data.months.length; i++){
                startX = (i)*(100);
                startY = 1;
                stopX = (i)*(100);
                stopY = $(_this).height();
                color = '#B4ADAD';
                ctx.setLineDash([1, 10]); // Make Dashed line (line length, space length)
                drawLineFunction(ctx,startX,startY,stopX,stopY,color);
            }

            // Make line with no dash
            ctx.setLineDash([1, 0]);
        }
        
        /**
         * [fillLableforMonths fills month text for each column]
         */
        function fillLableforMonths() {
            var months = $.makeArray(data.months);//converts object to array
            $.each(months, function(index, value) {
                text = value;
                startX = (index * 100)+40;
                startY = 20;
                fillTextFunction(ctx, text, startX, startY );
            });
        }

        /**
         * [plotTimeLine draws line graph for each event]
         */
        function plotTimeLine(){
            for (var i = 1; i < dataLength; i++) {
                var category = data['event'+i],

                startDay = category.startDate.split('/'); // startday[] = [ start Day, start Month, start Year]
                endDay = category.endDate.split('/'); // endday[] = [ end Day, end Month, end Year]

                // Check if end month and start month are valid or not
                if( startDay[1] < 1 || startDay[1] > 12 ){
                    text = category.title + ' (Invalid start month) ';
                    startX = 50;
                    startY = (i*80)-20;
                    fillTextFunction(ctx, text, startX, startY);
                }

                else if( endDay[1] < 1 || endDay[1] > 12 ){
                    text = category.title + ' (Invalid end month) ';
                    startX = 50;
                    startY = (i*80)-20;
                    fillTextFunction(ctx, text, startX, startY);
                }

                if( startDay[0] < 1 || startDay[0] > daysInMonth[startDay[1]-1] ){
                    text = category.title + ' (Invalid start date for ' + data.months[startDay[1]-1] + ' )';
                    startX = 50;
                    startY = (i*80)-20;
                    fillTextFunction(ctx, text, startX, startY);
                }

                else if( endDay[0] < 1 || endDay[0] > daysInMonth[endDay[1]-1] ){
                    text = category.title + ' (Invalid end date for ' + data.months[endDay[1]-1] + ' )';
                    startX = 50;
                    startY = (i*80)-20;
                    fillTextFunction(ctx, text, startX, startY);
                }

                else{
                    if( currentYear >= startDay[2] && currentYear <= endDay[2] ){
                        // Draw Line Graph
                        if(startDay[2] == currentYear){
                            startX = (startDay[1]-1)*100+2+(startDay[0]/daysInMonth[startDay[1]-1]*100);
                        }
                        else{
                            startX = 2;
                        }

                        if(endDay[2] == currentYear){
                            stopX = (endDay[1]-1)*100-4+(endDay[0 ]/daysInMonth[endDay[1]-1]*100);
                        }
                        else{
                            stopX = 100*12;
                        }

                        startY = i*70;
                        stopY = i*70;
                        color = pastelColors(80);
                        lineWidth = 10;
                        lineStyle = 'round';
                        drawLineFunction(ctx, startX, startY, stopX, stopY, color, lineWidth, lineStyle);
                        
                        // Fill event text
                        text = category.title + ' ( ' + startDay[0] +' ' + data.months[startDay[1]-1] + ' - ' + endDay[0] +' '  + data.months[endDay[1]-1] + ' )';
                        startX = (startDay[1]-1)*100 + (endDay[1]-startDay[1])*40;
                        startY = (i*70)-20;
                        font = "16px Calibri";
                        fillTextFunction(ctx, text, startX, startY, font, color);
                    }   
                }
            };
        }        
    }

    /**
    * [pastelColors generates random color]
    * @param  {[type]} brightness [brightness level of color 0-255]
    * @return {[type]}            [hash value of color]
    */
    function pastelColors(brightness){
        function randomChannel(brightness){
            var r = 255-brightness;
            var n = 0|((Math.random() * r) + brightness);
            var s = n.toString(16);
            return (s.length==1) ? '0'+s : s;
          }
      return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
    }

    /**
     * [drawLineFunction draws a line in canvas]
     * @param  {[type]} ctx       [canvas in DOM]
     * @param  {[type]} startX    [starting x-point for line]
     * @param  {[type]} startY    [starting y-point for line]
     * @param  {[type]} stopX     [stoping x-point for line]
     * @param  {[type]} stopY     [stoping x-point for line]
     * @param  {[type]} color     [color of line]
     * @param  {[type]} lineWidth [width of the line]
     * @param  {[type]} lineStyle [butt= rectangle, round = curved corner, square = non-curved corner]
     * @return {[type]}           [line in canvas]
     */
    function drawLineFunction(ctx, startX, startY, stopX, stopY, color, lineWidth, lineStyle){
        // debugger;
        lineWidth = typeof lineWidth !== 'undefined' ? lineWidth : 1;
        color = typeof color !== 'undefined' ? color : '#fff';
        lineStyle = typeof lineStyle !== 'undefined' ? lineStyle : 'butt';

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(stopX, stopY);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = lineStyle;
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    /**
     * [fillTextFunction draws text on canvas]
     * @param  {[type]} ctx    [canvas in DOM]
     * @param  {[type]} text   [text to be drawn]
     * @param  {[type]} startX [start x-position for text]
     * @param  {[type]} startY [start y-position for text]
     * @param  {[type]} font   [font style and family]
     * @param  {[type]} color  [color of font]
     * @return {[type]}        [text in canvas]
     */
    function fillTextFunction(ctx, text, startX, startY, font, color){
        font = typeof font !== 'undefined' ? font : "20px Calibri";
        color = typeof color !== 'undefined' ? color : '#E7EBEB';

        ctx.beginPath();
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(text, startX, startY);
    }

}(jQuery));