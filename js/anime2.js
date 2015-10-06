(function() {
    window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

    var canvas = document.getElementById('canvas'), //getcanvas
        context = canvas.getContext('2d'); //get context
        canvas.style.position= 'absolute';
    var lcurves= new Array();
    var stars = new Array();
    var inter=10000;
    var change = false;
    var aStart = (new Date()).getTime(); //var startTime stars
    // resize the canvas to fill browser window dynamically
    var W=window.innerWidth, H=window.innerHeight;
    // window.addEventListener('resize', resizeCanvas, true);
    function resizeCanvas() {
        canvas.width = W;
        canvas.height = H;
        canvas.style.opacity='1'; //opacity begin canvas
        var randomY = canvas.height / 2 - Math.random() * 20;
        var _count = 3;
        var stars_count = 56;

        if(lcurves[0]==null){
          for(var i=0; i<_count;i++)
            lcurves.push(new Curve(H*0.074, 2*W/3, Math.PI/2, 0, 2 * Math.PI));}
        if(stars[0]==null)
          {for(var s=0; s<stars_count;s++)
            stars.push(new Star());}

        setTimeout(function() {
            var startTime = (new Date()).getTime();
            animate(canvas, context, startTime);
        }, 5000); //time start delay animation
    }
    resizeCanvas();
// position,
    function Curve(radX,radY,rotation,startAngle,endAngle){
      this.Init = {rad: (radX)-Math.random()*(radX-20), rotation: 10*(Math.PI/21)+Math.random()*2*(Math.PI/41.16), y:H/2};
      this.position = { x:W/2, y:(H/2+20)-Math.random()*40 };
      this.radX = this.Init.rad;
      this.radY= radY;
      this.rotation = this.Init.rotation;
      this.startAngle = startAngle;
      this.endAngle = endAngle;
      this.speed=((10+7*Math.random()))*400;


    }


    setTimeout(function(){canvas.style.animation= 'transparence 2s linear reverse forwards'},5000);

    function drawCurve(curve, context){
        context.beginPath();
        if(navigator.userAgent.indexOf("Chrome") != -1 )
        context.ellipse(curve.position.x, curve.position.y, curve.radX, curve.radY,curve.rotation,curve.startAngle, curve.endAngle);
        context.lineWidth = 2;
        // var gradient = context.createLinearGradient(0, curve.position.y+10, 0,curve.position.y-10);
  			// gradient.addColorStop(0, "rgba(180,180,180,0.1)");
  			// gradient.addColorStop(0.5, "rgba(0,0,0,1)");
  			// gradient.addColorStop(1, "rgba(255,255,255, 0.1)");
        // context.strokeStyle = gradient;
        context.strokeStyle = 'rgba(180,180,180,0.14)';

        context.fillStyle = 'rgba(255,255,255,0.03)';
        // context.fillStyle = gradient;
        context.stroke();
        context.fill();
        context.restore();
    }
    function Star(){
      this.opacity = 0;
      this.Init = {x: 50+Math.random()*(W-100), y: (H/2-40)+Math.random()*70};
      this.position = {x: this.Init.x , y: this.Init.y};
      this.speed = 10+20*Math.random()*50;
      this.change = function(){this.Init.x= 50+Math.random()*(W-100); this.Init.y=(H/2-40)+Math.random()*70}
    }

    function drawStar(star){
      context.beginPath();
      // var gradient = context.createRadialGradient(star.position.x, star.position.y, Math.PI*2, 0, 0, Math.PI/2);
      // gradient.addColorStop(0, "rgba(255,255,255,0.5)");
      // gradient.addColorStop(0.5, "rgba(255,255,255,.2)");
      // gradient.addColorStop(1, "rgba(255,255,255, 0.06)");
      context.arc(star.position.x, star.position.y, 1, Math.PI*2, false);
      context.fillStyle = 'rgba(255,255,255,'+star.opacity+')';
      context.fill();
    }

    this.start = function(){ //change rotation curve every 1m
      var a = setInterval(function(){
          change=true;
          // console.log("run");
          var b = setInterval(function(){
            for(var i =0; i<3; i++){
              var aCurve = lcurves[i];
              aCurve.Init.y = (aCurve.position.y + Math.sin(5*(Math.PI/2)/(aCurve.speed)*0.07)*40);
              aCurve.rotation = (2*(Math.PI/41.16))* Math.sin((Math.PI/2)/(aCurve.speed)*0.7)+aCurve.Init.rotation;
          }
        },70); setTimeout(function(){clearInterval(b)}, 7000)
      },60000
         );
         setTimeout(function(){ clearInterval(a); change = false},60000)
       }

    function animate(canvas, context, startTime){
      var soust= (new Date()).getTime() - aStart;
        var time = (new Date()).getTime() - startTime;
        var centerY = canvas.height/2;
        // context.globalCompositeOperation = "lighter";
        // clear
        context.clearRect(0, 0, W, H);
        //dessine les stars
        for(var s = 0; s<stars.length; s++){
          var star = stars[s];
          star.position.x = star.Init.x + 2*Math.PI*Math.cos(time * (Math.PI/2)/450+star.speed);
          star.position.y = star.Init.y+ 2*Math.PI*Math.sin(time * (Math.PI/2)/450+star.speed);
          star.opacity = Math.sin(time*(Math.PI/2)/380+star.speed);
          if(star.opacity<=0){ //change position lorsque star disparait
            star.change();
          }
          drawStar(star);
        }
        //dessine les courbes
        for(var i = 0; i < 3; i++){
          var aCurve = lcurves[i];
          var periode = aCurve.speed;

          if(soust >= inter){

            this.start();
            aStart = (new Date()).getTime()
          }
            //aCurves.radX = nextY * (i+1)*0.3;
            //set position
            // var cPos= i*1.5;
            // var randomY = canvas.height / 2 - Math.random() * 50;
            //  var rotation = 0.04*Math.sin(time*2* (Math.PI) / (period*26*(i+1)*0.08))+ Math.PI/2;
            //  var nextY = 50 * Math.sin(time * 1/2 * Math.PI / (period*(i+1)*0.3))+H*0.1;
            if(!change)
              aCurve.radX = aCurve.Init.rad+ Math.sin(time * (Math.PI/2)/periode)*(aCurve.Init.rad*0.3);
            //  draw curve

            drawCurve(aCurve, context);
        }

        // draw

        //new frame request
        requestAnimFrame(function() {
            animate(canvas, context, startTime);
        });
    }

})();
