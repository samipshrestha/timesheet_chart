;(function($) {
    'use-strict';

/**
 * [drawLineGraph description]
 * @param  {[type]} ctx  [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
    $.fn.drawLineGraph = function(ctx, data) {
        var dataLength = 0,
        fullMonths = [ "January", "February", "March", "April", "May", "June", 
               "July", "August", "September", "October", "November", "December" ];

        $.each(data, function() {
            dataLength++;
        });

        // Draw horizontal line
        for (var i = 0; i < 1; i++) {
            ctx.beginPath();
            ctx.moveTo(0, (i+1)*1);
            ctx.lineTo(1220, (i+1)*1);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
        };

        // Draw vertical line
        for(var i=0; i<=data.months.length; i++){
            ctx.setLineDash([1, 10]); // Make Dashed line (line length, space length)
            ctx.beginPath();
            ctx.moveTo((i)*(100), 1);
            ctx.lineTo((i)*(100), 500);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#B4ADAD';
            ctx.stroke();
        }
        
        // Make line with no dash
        ctx.setLineDash([1, 0]);
        
        //fill month on every 100 point horizontally
        var months = $.makeArray(data.months);//converts object to array
        $.each(months, function(index, value) {
            ctx.beginPath();
            ctx.font = "20px Calibri";
            ctx.fillStyle = '#E7EBEB';
            ctx.fillText(value, (index * 100)+40, 20);
        });

        // Start plotting line
          ctx.globalAlpha = 1 ;
        for (var i = 1; i < dataLength; i++) {
            // debugger;
            var category = data['topic'+i];
            if(category.start < 1 || category.start > 12 ){
                ctx.font = "20px Calibri";
                ctx.fillText(category.title + ' (Invalid start date) ', 50, (i*80)-20 );
            }

            else if(category.end < 1 || category.end > 12 ){
                ctx.font = "20px Calibri";
                ctx.fillText( category.title + ' (Invalid end date) ', 50, (i*80)-20 );
            }

            else{
                ctx.beginPath();
                ctx.moveTo( (category.start-1)*100+5, i*80);
                ctx.lineTo( (category.end)*100-5, i*80);
                ctx.lineWidth = 10;
                ctx.strokeStyle = pastelColors(80); //provide value from 0-255
                ctx.lineCap = 'round';
                ctx.stroke();

                ctx.fillStyle = '#E7EBEB';
                ctx.fillText( category.title + ' ( ' + months[category.start-1] + ' - ' + months[category.end-1] + ' )', (category.start-1)*100 + (category.end-category.start)*40, (i*80)-20);

            }
        };

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
* @param  {[type]} options [description]
* @return {[type]}         [description]
*/
    $.fn.heading = function(options) {
        var settings = $.extend({
            text: 'Hello, World!',
            color: null,
            fontStyle: null,
            //complete: null
        }, options);

        return this.each(function() {
            $(this).text(settings.text);

            if (settings.color) {
                $(this).css('color', settings.color);
            }

            if (settings.fontStyle) {
                $(this).css('font-style', settings.fontStyle);
            }
        });
    }

}(jQuery));