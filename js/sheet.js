;(function($) {
    'use-strict';

    var date = new Date(),
    currentYear = date.getFullYear();

/**
 * [drawLineGraph draws TimeSheet]
 * @param  {[type]} ctx  [canvas in DOM]
 * @param  {[type]} data [data of events]
 */
    $.fn.drawLineGraph = function(canvas, ctx, data) {
        var dataLength = 0,
        startX,startY,stopX,stopY,lineWidth,color,font,text,lineStyle
        daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        $.each(data, function() {
            dataLength++;
        });

        canvasHeight = dataLength*70;
        console.log(dataLength);
        $('#myCanvas').attr('height', canvasHeight);

        // Draw horizontal line
        startX = 0;
        startY = 0;
        stopX = canvas.width;
        stopY = 0;
        drawLineFunction(ctx,startX,startY,stopX,stopY);

        // Draw vertical line
        for(var i=0; i<=data.months.length; i++){
            startX = (i)*(100);
            startY = 1;
            stopX = (i)*(100);
            stopY = canvas.height;
            color = '#B4ADAD';
            ctx.setLineDash([1, 10]); // Make Dashed line (line length, space length)
            drawLineFunction(ctx,startX,startY,stopX,stopY,color);
        }
        
        // Make line with no dash
        ctx.setLineDash([1, 0]);
        
        //plot months
        var months = $.makeArray(data.months);//converts object to array
        $.each(months, function(index, value) {
            text = value;
            startX = (index * 100)+40;
            startY = 20;
            fillTextFunction(ctx, text, startX, startY );
        });

        // Start plotting line
          // ctx.globalAlpha = 1 ; // opacity of canvas line
        for (var i = 1; i < dataLength; i++) {
            var category = data['event'+i],

            startDay = category.startDate.split('/');
            endDay = category.endDate.split('/');

            if(startDay[1] < 1 || startDay[1] > 12 ){
                text = category.title + ' (Invalid start month) ';
                startX = 50;
                startY = (i*80)-20;
                fillTextFunction(ctx, text, startX, startY);
            }

            else if(endDay[1] < 1 || endDay[1] > 12 ){
                text = category.title + ' (Invalid start month) ';
                startX = 50;
                startY = (i*80)-20;
                fillTextFunction(ctx, text, startX, startY);
            }

            else{
                // debugger;
                if( currentYear >= startDay[2] && currentYear <= endDay[2] ){
                    // Draw Line Graph
                    if(startDay[2] == currentYear){
                        startX = (startDay[1]-1)*100+2+(startDay[0]/daysInMonth[startDay[1]-1]*100);
                    }

                    else{
                        startX = 2;
                    }

                    if(endDay[2] == currentYear){
                        stopX = (endDay[1]-1)*100-4+(endDay[0]/daysInMonth[endDay[1]-1]*100);
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
                    text = category.title + ' ( ' + startDay[0] +' ' + months[startDay[1]-1] + ' - ' + endDay[0] +' '  + months[endDay[1]-1] + ' )';
                    startX = (startDay[1]-1)*100 + (endDay[1]-startDay[1])*40;
                    startY = (i*70)-20;
                    font = "16px Calibri";
                    fillTextFunction(ctx, text, startX, startY, font, color);
                }   
            }
        };

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
    }

/**
* [heading creates heading tag]
* @param  {[type]} options [set of options in array]
*/
    $.fn.heading = function(options) {
        var settings = $.extend({
            text: 'Hello, World!',
            color: null,
            fontStyle: null,
            year: date.getFullYear()
        }, options);

        return this.each(function() {
            $(this).text(settings.text + ' ' + settings.year);

            if (settings.color) {
                $(this).css('color', settings.color);
            }

            if (settings.fontStyle) {
                $(this).css('font-style', settings.fontStyle);
            }
        });
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