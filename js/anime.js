(function() {
    window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
        canvas.style.position= 'absolute';

    var curves = new Array();
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        var randomY = canvas.height / 2 - Math.random() * 20;
        var aCurve = new Curve(canvas.width/2,canvas.height / 2,canvas.width/2,canvas.height / 2, canvas.width, randomY, randomY);

        drawCurve(aCurve);
        setTimeout(function() {
    var startTime = (new Date()).getTime();
    animate(aCurve, canvas, context, startTime);
}, 1000);
    }
    resizeCanvas();

    function Curve(cp1x,cp1y,cp2x,cp2y,x,y,posDep){
        this.cp1x = cp1x;
        this.cp1y = cp1y;
        this.cp2x = cp2x;
        this.cp2y = cp2y;
        this.x = x;
        this.y = y;
        this.posDep = posDep;

    }

    function drawCurve(curve){
        context.beginPath();
        context.moveTo(0, curve.posDep);
        context.bezierCurveTo(curve.cp1x,curve.cp1y,curve.cp2x,curve.cp2y,curve.x,curve.y);
        context.lineWidth = 1;
        context.strokeStyle = 'rgba(255,255,255,0.5)';
        context.fillStyle = 'rgba(255,255,255,0.2)';
        context.stroke();
        context.fill();
        context.restore();

    }

    function drawStar(curve){
        var style = 'width: ' + size + 'px; height: ' + size + 'px; left: ' + posX + 'px; top: ' + posY + 'px;' + randomAnimDuration + '-webkit-border-radius:'+ size + 'px; -moz-border-radius: ' + size + 'px; border-radius:' +size + 'px;';

    curve.append('<div class="star" style="' + style + '"></div>');
    }

    function animate(curves, canvas, context, startTime){

        var time = (new Date()).getTime() - startTime;
        var amplitude = 30;
        var period = 1500;
        var centerY = canvas.height / 2;
        var nextY2 = amplitude * Math.sin(time * 2 * Math.PI / (period *9)) + centerY;
        var nextY1 = amplitude * Math.sin(time * 2 * Math.PI / (period *8)) + centerY;
        curves.posDep = (amplitude / 3) * Math.sin(time * 2 * Math.PI / (period *12)) + centerY;
        curves.cp2y = nextY2;
        curves.cp1y = nextY1;
        curves.y = -amplitude * Math.sin(time * 2 * Math.PI / (period *12)) + centerY;

        var curves3 = new Curve(canvas.width/2,canvas.height / 2,canvas.width/2,canvas.height / 2, canvas.width, canvas.height / 2, canvas.height / 2 );
        curves3.posDep = -(amplitude / 3) * Math.cos(time * 2 * Math.PI / (period *5)) + centerY;
        curves3.cp2y = -amplitude * Math.sin(time * 2 * Math.PI / (period *8)) + centerY;
        curves3.cp1y = -amplitude * Math.sin(time * 2 * Math.PI / (period *7)) + centerY;
        curves3.y = amplitude * Math.sin(time * 2 * Math.PI / (period *9)) + centerY;
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);
        var lcurves= new Array();

        for(var i = 0; i < 4; i++){
            var cPos= i*10*1.5;
            var randomY = canvas.height / 2 - Math.random() * 50;
            var aCurve2 = new Curve(canvas.width/2,canvas.height / 2,canvas.width/2,canvas.height / 2, canvas.width, randomY, randomY + cPos);
            aCurve2.posDep = amplitude * Math.sin(time * 2 * Math.PI / (period *11)) + centerY+cPos*0.5;
            aCurve2.cp2y =  0.5*cPos+amplitude * Math.sin(time * 2 * Math.PI / (period *10))+ ( centerY+cPos);
            aCurve2.cp1y = 0.5*cPos+amplitude * Math.cos(time * 2 * Math.PI / (period *8))+ ( centerY+cPos);
            aCurve2.y = (amplitude) * Math.sin(time * 2 * Math.PI / (period *10))+ ( centerY+cPos*0.5);
            lcurves.push(aCurve2);
        }
        // draw

      for(var i = 0; i < lcurves.length; i++){
          var aCurve = lcurves[i];
          drawCurve(aCurve, context);
      }
      drawCurve(curves, context);
      //drawCurve(curves3, context);

        //new frame request
        requestAnimFrame(function() {
            animate(curves, canvas, context, startTime);
        });
    }

})();
