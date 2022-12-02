var canvas, ctx
var img_arr = []
var prev_slide = null
var curr_slide = 0

var speed = 'lower'
var dx = -1
var x = 640
var ani, ani_fin = false, ani_stop = false, flag = false

function loadImage(){
    for(let i in images){
        let img = new Image()
        img.src = 'images/'+images[i]
        img.onload=displayImage;
        img_arr[i] = img
    }
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    document.getElementById('myCanvas').addEventListener("mouseover",function(){
        flag = true
    })
    document.getElementById('myCanvas').addEventListener("mouseout",function(){
        ani_stop = false
    })
    document.getElementById('myCanvas').addEventListener("click",function(){
        if(ani_stop){
            ani_stop = false
        }
    })
    ani = requestAnimationFrame(displayImage)
}

function displayImage(){

    if(ani_fin){
        if(flag){
            ani_stop = true
        }
        ani_fin = false
    }

    if(ani_stop){
        return ani = requestAnimationFrame(displayImage)
    }

    ctx.clearRect(0,0,640,380)
    
    let ratio = Math.min(640/img_arr[curr_slide].width,380/img_arr[curr_slide].height)
    let w = img_arr[curr_slide].width*ratio
    let h = img_arr[curr_slide].height*ratio

    
    if(x < 0){

        ani_fin = true

        curr_slide = (curr_slide+1)%images.length
        if(prev_slide == null){
            prev_slide = 0
        }else{
            prev_slide = (prev_slide+1)%images.length
        }

        x = 640

    }
    if(prev_slide != null){
        let ratiop = Math.min(640/img_arr[prev_slide].width,380/img_arr[prev_slide].height)
        let wp = img_arr[prev_slide].width*ratiop
        let hp = img_arr[prev_slide].height*ratiop
        ctx.drawImage(img_arr[prev_slide],0,0,img_arr[prev_slide].width,img_arr[prev_slide].height,640/2-wp/2,380/2-hp/2,wp,hp)
    }
    
    ctx.fillStyle = 'rgba(255, 255, 255, '+(1-x/640)+')'
    ctx.fillRect(x,0,640,380)
    ctx.drawImage(img_arr[curr_slide],0,0,img_arr[curr_slide].width,img_arr[curr_slide].height,x+640/2-w/2,380/2-h/2,w,h)
    x += dx

    ani = requestAnimationFrame(displayImage)
    
}

window.onload=loadImage
