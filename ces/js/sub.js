window.addEventListener('load',()=>{
  const subMain=document.querySelector('#sub_main')
  const title=document.querySelector('#sub_title_wrap')
  
  const fixedBg=document.querySelector('#contents_background')
  
  const paragraph=document.querySelectorAll('.paragraph_wrap')
  const comment=document.querySelector('#comment')

  const toTop=document.querySelector('#to_top')

  let isIntro;
  let isScrolling=false;

  gsap.set(subMain,{height:window.innerHeight})
  gsap.set(subMain.nextElementSibling,{height:comment.offsetTop+paragraph[0].offsetHeight+120})
  gsap.to('body,html',{scrollTop:0, duration:1, onComplete:()=>{isIntro=true;}})

  let paragraphIndex=0;
  let selectedParagraph=paragraph[paragraphIndex]

  window.addEventListener('scroll', windowScroll)
  toTop.addEventListener('click',reset)
  

  function windowScroll(){
    start()
    paragraphEffect()
  }

  function start(){
    if(isIntro==true && isScrolling==false){
      isIntro=false;
      isScrolling=true;
      gsap.to(title,{top:100+window.innerHeight, duration:1})
      gsap.to('body,html', {scrollTop:window.innerHeight, duration:1, onComplete:()=>{
        gsap.set(fixedBg,{position:'fixed'})
        isScrolling=false;
      }})
    }else if(window.pageYOffset<window.innerHeight){
      reset()
    }
  }
  function reset(){
    if(isIntro==false && isScrolling==false){
      isScrolling=true;
      gsap.set(fixedBg,{position:'absolute'})
      gsap.to(title,{top:440, duration:1})
      gsap.to('body,html',{scrollTop:0, duration:1.1, onComplete:()=>{
        setTimeout(()=>{
          isScrolling=false;
          isIntro=true;
        },100)
      }})
    }
  }

  function paragraphEffect(){
    let currentPosition=window.pageYOffset-500
    if(currentPosition>=paragraph[0].offsetTop && currentPosition<paragraph[1].offsetTop){
      paragraphIndex=0
    }else if(currentPosition>=paragraph[1].offsetTop && currentPosition<paragraph[2].offsetTop){
      paragraphIndex=1
    }else if(paragraph[3]!=null && currentPosition>=paragraph[2].offsetTop && currentPosition<paragraph[3].offsetTop){
      paragraphIndex=2
    }else if(paragraph[4]!=null && currentPosition>=paragraph[3].offsetTop && currentPosition<paragraph[4].offsetTop){
      paragraphIndex=3
    }else if(paragraph[5]!=null && currentPosition>=paragraph[4].offsetTop && currentPosition<paragraph[5].offsetTop){
      paragraphIndex=4
    }else if(paragraph[6]!=null && currentPosition>=paragraph[5].offsetTop && currentPosition<paragraph[6].offsetTop){
      paragraphIndex=5
    }else if(paragraph[7]!=null && currentPosition>=paragraph[6].offsetTop && currentPosition<paragraph[7].offsetTop){
      paragraphIndex=6
    }else if(paragraph[8]!=null && currentPosition>=paragraph[7].offsetTop && currentPosition<paragraph[8].offsetTop){
      paragraphIndex=7
    }else if(paragraph[9]!=null && currentPosition>=paragraph[8].offsetTop && currentPosition<paragraph[9].offsetTop){
      paragraphIndex=8
    }
    paragraphActive(paragraphIndex)
  }

  function paragraphActive(num){
    selectedParagraph.classList.remove('selected')
    selectedParagraph=paragraph[num];
    selectedParagraph.classList.add('selected')
  }


})
