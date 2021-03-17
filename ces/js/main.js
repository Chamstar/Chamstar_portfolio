window.addEventListener('load',()=>{

  let isIntro=true; // 인트로 체크 변수
  let isWheel=true; // 마우스 휠 체크 변수

  introEffect()
  slideEffect()

  function introEffect(){ // 인트로 스크롤 & 초기설정
  
    const mainWrap=document.querySelector('#main_wrap')
    const elWrap=document.querySelector('#el_wrap')
    
    gsap.set(mainWrap,{height:window.innerHeight})
    gsap.set(elWrap,{height:window.innerHeight})
    gsap.to('body,html',{scrollTop:0, duration:1})
  
    window.addEventListener('mousewheel', introWheel)
  
    function introWheel(e){
      if(e.wheelDelta<=-120 && isIntro==true){
        isIntro=false;
        gsap.to('body,html',{scrollTop:window.innerHeight,duration:1,ease:'power1.out',onComplete:()=>{
          isWheel=false;
        }})
      }
    }
  }


  function slideEffect(){

    // 이미지
    const imgLi=document.querySelectorAll('#img_list>li')
    let imgIndex=0;
    let nextIndex=1;
    let imgWidth=imgLi[imgIndex].offsetWidth
    let imgInitLeft=2100
    let imgReadyLeft=1800
    let imgLength=imgLi.length

    // 원
    const elCircle=document.querySelector('#el_circle')
    const elRotate=document.querySelector('#el_rotate')

    // 컬러배열
    let colorArray=['#ffd951','#feaa2c','#dddddd','#e53b37']

    // 텍스트
    const textWrap=document.querySelector('#text_wrap')
    const textLi=document.querySelectorAll('#text_list>li')
    const elRead=document.querySelector('#el_read')
    const elReadLi=document.querySelectorAll('#el_read>li')
    const kor=document.querySelectorAll('.kor')
    const eng=document.querySelectorAll('.eng')

    // 슬라이드개더
    const gatherLi=document.querySelectorAll('#slide_gather>li')
    const scrollText=document.querySelector('#scroll_text')
  
    init();
    initEvent();
  
    // 초기설정
    function init(){
      gsap.set(imgLi[imgIndex],{left:0, top:0, transform:'rotate(0deg)'})
      gsap.set(imgLi[nextIndex],{left:imgReadyLeft})
      gsap.set(kor,{top:200})
    }
    // 이벤트실행
    function initEvent(){
      textWrap.addEventListener('mouseenter', circleOver)
      textWrap.addEventListener('mouseleave', circleOut)
      window.addEventListener('mousewheel', slideWheel)
    }
  
    // 원 마우스 오버 효과
    function circleOver(){
      gsap.to(eng,{top:-200, opacity:0, duration:0.5})
      gsap.to(kor,{top:0, opacity:1, duration:0.5})
      gsap.to(elRead,{top:0, duration:0.5})
    }
    function circleOut(){
      gsap.to(eng,{top:0, opacity:1, duration:0.5})
      gsap.to(kor,{top:200,opacity:0, duration:0.5})
      gsap.to(elRead,{top:55, duration:0.5})
    }
  
    // 마우스 휠 함수
    function slideWheel(e){
      if(e.wheelDelta<=-120 && isWheel==false && isIntro==false){
        isWheel=true;
        imgSlideNext();
        textSlideNext();
        gatherNext();
        nextCircle();
        scrollTextEffect();
      }else if(e.wheelDelta>-120 && isWheel==false && isIntro==false){
        isWheel=true;
        imgSlidePrev();
        textSlidePrev();
        gatherPrev();
        prevCircle();
        scrollTextEffect();
      }
    }
  
    // 이미지 슬라이드
    function imgSlideNext(){
      gsap.to(imgLi[imgIndex],{left:-imgWidth, top:600,transform:'rotate(-30deg)',duration:1.5,ease:'power1.out',onComplete:()=>{
        gsap.set(imgLi[imgIndex],{left:imgInitLeft, transform:'rotate(30deg)'})
      }})
      gsap.to(imgLi[nextIndex],{left:0,top:0, transform:'rotate(0deg)',duration:1.5,ease:'power1.out',onComplete:()=>{
        gsap.set(imgLi[nextIndex],{zIndex:1})
        imgIndex=nextIndex;
        nextIndex++;
        if(nextIndex>=imgLength){
          nextIndex=0;
        }
        gsap.set(imgLi[nextIndex],{zIndex:2})
        gsap.to(imgLi[nextIndex],{left:imgReadyLeft, duration:0.5, onComplete:()=>{
          isWheel=false
        }})
      }})
    }
    function imgSlidePrev(){
      gsap.set(imgLi[nextIndex],{zIndex:3})
      gsap.to(imgLi[nextIndex],{left:imgInitLeft, duration:0.5, onComplete:()=>{
        gsap.set(imgLi[nextIndex],{zIndex:2})
      }})
      gsap.set(imgLi[imgIndex],{zIndex:2})
      gsap.to(imgLi[imgIndex],{left:imgReadyLeft, top:600, transform:'rotate(30deg)',duration:1.5,ease:'power1.out'})
      nextIndex=imgIndex;
      imgIndex--
      if(imgIndex<0){
        imgIndex=imgLength-1
      }
      gsap.set(imgLi[imgIndex],{left:-imgWidth, zIndex:1, transform:'rotate(-30deg)',duration:1.5,ease:'power1.out'})
      gsap.to(imgLi[imgIndex],{left:0,top:0, transform:'rotate(0deg)',duration:1.5,ease:'power1.out',onComplete:()=>{
        isWheel=false;
      }})
    }
  
    // 텍스트 슬라이드
    function textSlideNext(){
      gsap.to(textLi[imgIndex],{top:-200, opacity:0, duration:0.5, onComplete:()=>{
        gsap.set(textLi[imgIndex],{top:200})
      }})
      gsap.to(textLi[nextIndex],{top:0,opacity:1, duration:0.5})
      gsap.to(elReadLi[imgIndex],{top:-55,opacity:0, duration:0.5, onComplete:()=>{
        gsap.set(elReadLi[imgIndex],{top:55})
      }})
      gsap.to(elReadLi[nextIndex],{top:0,opacity:1, duration:0.5})
    }
    function textSlidePrev(){
      gsap.to(textLi[nextIndex],{top:-200, opacity:0, duration:0.5, onComplete:()=>{
        gsap.set(textLi[nextIndex],{top:200})
      }})
      gsap.to(textLi[imgIndex],{top:0, opacity:1, duration:0.5})
      gsap.to(elReadLi[nextIndex],{top:-55,opacity:0, duration:0.5, onComplete:()=>{
        gsap.set(elReadLi[nextIndex],{top:55})
      }})
      gsap.to(elReadLi[imgIndex],{top:0,opacity:1, duration:0.5})
    }
  
    // 원 회전
    function nextCircle(){
      gsap.to(elCircle,{borderColor:colorArray[nextIndex],duration:1})
      gsap.to(elRotate,{borderColor:colorArray[nextIndex],duration:1})
      elRotate.animate([
        {transform:'rotate('+0+'deg)'},
        {transform:'rotate('+360+'deg)'}
      ],{
        duration:1500,
        fill:'forwards',
        direction:'normal',
        easing:'cubic-bezier(.25, .1, .25, 1)'
      })
    }
    function prevCircle(){
      gsap.to(elCircle,{borderColor:colorArray[imgIndex], duration:1})
      gsap.to(elRotate,{borderColor:colorArray[imgIndex], duration:1})
      elRotate.animate([
        {transform:'rotate('+0+'deg)'},
        {transform:'rotate('+360+'deg)'}
      ],{
        duration:1500,
        fill:'forwards',
        direction:'normal',
        easing:'cubic-bezier(.25, .1, .25, 1)'
      })
    }
  
    // 슬라이드 개더
    function gatherNext(){
      gsap.to(gatherLi,{borderColor:colorArray[nextIndex]})
      gatherLi[imgIndex].classList.remove('selected')
      gatherLi[nextIndex].classList.add('selected')
    }
    function gatherPrev(){
      gsap.to(gatherLi,{borderColor:colorArray[imgIndex]})
      gatherLi[nextIndex].classList.remove('selected')
      gatherLi[imgIndex].classList.add('selected')
    }
  
    function scrollTextEffect(){
      if(scrollText.offsetTop<window.innerHeight){
        gsap.to(scrollText,{bottom:-100, duration:0.5})
      }
    }  
  }
})