const player = document.querySelector('.player');
const video = player.querySelector('.video_player');
const toggle = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const videoFilled = player.querySelector('.video_filled');
const playSlider = player.querySelectorAll('.playSlider');
const rewindFoward = player.querySelectorAll('[data-skip]');
const videoTime = player.querySelector('.video_time');
const fullscreenButton = player.querySelector('.full_screen');

//functions

//função play/pause
function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

//mudar o botão quando vídeo é tocado ou pausado
function updateButton(){
    const icon = this.paused ? '▶' : '𝗜𝗜';
    console.log(icon);
    toggle.textContent = icon;
    //console.log(video.currentTime);
}

//preenchimento da barra de progreso
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    videoFilled.style.flexBasis = `${percent}%`;
    intervalTimer = setInterval(updateTimer, 100);
}

//seleção de trecho do vídeo através da barra de progresso
function mouseType(e){
    const mouseTypeTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = mouseTypeTime;
}

function rateUpdate(){
    video[this.name] = this.value;
}
// botão -10s e + 10s
function tenSecond(){
    video.currentTime += parseFloat(this.dataset.skip);
}

//event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

let mousedown = false
progress.addEventListener('click', mouseType);
progress.addEventListener('mousemove', (e) => mousedown && mouseType(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

playSlider.forEach(range => range.addEventListener('change', rateUpdate));
playSlider.forEach(range => range.addEventListener('mousemove', rateUpdate));

rewindFoward.forEach(button => button.addEventListener('click', tenSecond));
fullscreenButton.addEventListener('click', toggleFullscreen);
player.addEventListener('dblclick', toggleFullscreen);

// contador de tempo decorrido e tempo total
function updateTimer(){
    hour = Math.floor(video.duration / 3600);
    min = Math.floor(video.duration / 60);
    seg = Math.floor(((video.duration / 60) % 1)*60);

    currentHour = Math.floor(video.currentTime / 3600);
    currentMinute = Math.floor(video.currentTime / 60);
    currentSecond = Math.floor(((video.currentTime /60)% 1) * 60); 
    
    videoTime.innerHTML = converteTier(currentHour, currentMinute, currentSecond) + ' / ' + converteTier(hour, min, seg);
}

// conversão de tempo em formato hh/mm/ss
function converteTier(horas, minutos, segundos){
    if(horas < 10 && horas > 0){
        horas = '0' + String(horas) + ":";
    }else{
        horas = '00:';
    }
    if(minutos < 10){
        minutos = '0' + String(minutos);
    }else if(minutos > 59){
        minutos = minutos - (Math.floor(minutos / 60)*60);
    }
    if(segundos < 10){
        segundos = '0' + String(segundos);
    }

    return String(horas) + String(minutos) + ':' + String(segundos);
}


//entrar em modo fullscreen
function toggleFullscreen(){
    if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement){
        
        if(player.requestFullscreen){
            player.requestFullscreen(toggleFullscreen);
        }      
        else if(player.msRequestFullscreen){
            player.msRequestFullscreen(toggleFullscreen);
        }
        else if(player.mozRequestFullScreen){
            player.mozRequestFullScreen(toggleFullscreen);
        }
        else if(player.webkitRequestFullscreen){
            player.webkitRequestFullscreen(toggleFullscreen);
        }

    }
//sair do modo fullscreen
        else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }else if(document.msExitFullscreen){
            document.ExitFullscreen();}
        else if(document.mozCancelFullScreen){
            document.CancelFullScreen();}
        else if(document.webkitExitFullscreen){
                document.ExitFullscreen();}      
        }
}