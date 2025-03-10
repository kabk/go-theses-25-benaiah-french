


// we make sure the JavaScript file loads after our HTML by using a function test if the HTML is loaded

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}   

document.addEventListener("DOMContentLoaded", function () {
  const videos = [
      "assets/images/MOV007.mp4",
      "assets/images/beaverboy.mp4",
      "assets/images/molen.mp4",
      "assets/images/molen1.mp4"
  ];

  const videoElement = document.querySelector(".background-video");
  const videoSource = document.getElementById("videoSource");

  if (!videoElement || !videoSource) {
      console.error("Video element or source not found");
      return;
  }

  // Select a random video
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  videoSource.src = randomVideo;
  videoElement.load();

  // Ensure the video plays after it's fully loaded
  videoElement.addEventListener("canplaythrough", () => {
      videoElement.play().catch(error => {
          console.log("Autoplay blocked, waiting for user interaction.");
      });
  });
});


docReady(function() {

	// functions
	// go
	// here
    

    /* DEZE KUN JE AANPASSEN ALS DINGEN TEVEEL VERSPRINGEN OF TEVEEL VERTRAGING VERTOORZAKEN */
    const maxRetries = 100;        // HOE LAGER, HOE LICHTER VOOR DE COMPUTER
    const maxHeightDifference = 5; // HOE HOGER, HOE LICHTER VOOR DE COMPUTER
    const retryDelay = 1;          // HOE HOGER, HOE LICHTER VOOR DE COMPUTER

    function resizeTextSection( section, numTries ) {
      let textBlock = section.querySelector(".text-block");
      let textBlockHeight = textBlock.offsetHeight;
      if ( numTries == 0 ) textBlockHeight = 10;

      let riverBlocks = section.querySelectorAll(".river-block");
      riverBlocks.forEach( function( riverBlock ) {
          riverBlock.style.height = textBlockHeight+"px";
      } );

      if ( textBlock.offsetHeight - textBlockHeight  > maxHeightDifference && numTries < maxRetries ) 
        setTimeout( resizeTextSection, retryDelay, section, numTries + 1 );
    }
    
    function resizeTextSections( ) {
      const textSections = document.querySelectorAll( ".text-section" );
      textSections.forEach( section => resizeTextSection( section, 0 ) );
    }

    window.addEventListener( 'resize', resizeTextSections );
    resizeTextSections( );



    document.addEventListener("DOMContentLoaded", function () {
        const navItems = document.querySelectorAll("nav ul li");
      
        navItems.forEach((item) => {
          item.addEventListener("click", function () {
            // Remove active class from all items
            navItems.forEach((el) => el.classList.remove("active"));
      
            // Add active class to clicked item
            this.classList.add("active");
      
            // Stop flashing after 1 second
            setTimeout(() => {
              this.classList.remove("active");
            }, 1000);
          });
        });
      });
});

document.addEventListener("DOMContentLoaded", function () {
  const textBlocks = document.querySelectorAll(".text-block");

  textBlocks.forEach(block => {
      let words = block.innerHTML.split(" ");
      let newText = "";
      let hyphenCount = 0;

      for (let i = 0; i < words.length; i++) {
          if (words[i].includes("-")) {
              hyphenCount++;
              if (hyphenCount > 3) {
                  words[i] = words[i].replace("-", ""); // Remove extra hyphens
              }
          } else {
              hyphenCount = 0; // Reset count when there's no hyphen
          }
          newText += words[i] + " ";
      }

      block.innerHTML = newText.trim();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    // Get the scroll position and max scroll height
    let scrollY = window.scrollY;
    let maxScroll = document.body.scrollHeight - window.innerHeight;

    // Calculate the percentage of scrolling (from 0 to 1)
    let scrollPercentage = Math.min(scrollY / maxScroll, 1);

    // Adjust the blackness of the navbar (from 0% to 100% on the left side)
    let blackWidth = scrollPercentage * 100;

    // Apply the dynamic gradient background
    navbar.style.background = `linear-gradient(to right, rgb(80, 80, 80) ${blackWidth}%, rgb(255, 255, 255) ${blackWidth}%)`;
  });
});
