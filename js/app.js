const SECRET_KEY = "mywedding1234";


/* =========================
   DYNAMIC GALLERY
========================= */


/* =========================
   HIDE / SHOW GALLERY
========================= */

let galleryVisible = false;

function toggleGallery(){

    const gallery =
        document.getElementById("galleryWrapper");

    const button =
        document.querySelector(".toggle-btn");

    galleryVisible = !galleryVisible;

    if(galleryVisible){

        gallery.classList.remove("hide");

        button.innerText = "Hide Gallery";
    }
    else{

        gallery.classList.add("hide");

        button.innerText = "Show Gallery";
    }
}

const galleryImages = [

    "/images/DSC_0802.JPG",
     "/images/DSC_0746.JPG",
    "/images/DSC_0814.JPG",
    "/images/WhatsApp Image 2026-05-27 at 00.57.48 (1).jpeg",
    "/images/WhatsApp Image 2026-05-27 at 00.57.48 (2).jpeg",
    "/images/WhatsApp Image 2026-05-27 at 00.57.48 (3).jpeg",
    "/images/WhatsApp Image 2026-05-27 at 00.57.48 (4).jpeg",
    "/images/WhatsApp Image 2026-05-27 at 00.57.48 (5).jpeg",
    "/images/WhatsApp Image 2026-05-27 at 00.57.48 (6).jpeg",
    "/images/WhatsApp Image 2026-05-27 at 00.57.48 (7).jpeg",

];

/* LOAD GALLERY */

function loadGallery(){

    const slides =
        document.getElementById("slides");

    const sideGrid =
        document.getElementById("sideGrid");

    if(!slides || !sideGrid) return;

    slides.innerHTML = "";

    sideGrid.innerHTML = "";

    galleryImages.forEach((image,index)=>{

        const img = new Image();

        img.src = image;

        img.onload = ()=>{

            /* SLIDER IMAGE */

            const slideImg =
                document.createElement("img");

            slideImg.src = image;

            slides.appendChild(slideImg);

            /* GRID IMAGE */

            const gridImg =
                document.createElement("img");

            gridImg.src = image;

            gridImg.onclick = ()=>{

                currentSlide = index;

                updateSlider();
            };

            sideGrid.appendChild(gridImg);
        };

    });

    startSlider();
}

/* SLIDER */

let currentSlide = 0;

function updateSlider(){

    const slides =
        document.getElementById("slides");

    slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;
}

function startSlider(){

    setInterval(()=>{

        currentSlide++;

        if(currentSlide >= galleryImages.length){

            currentSlide = 0;
        }

        updateSlider();

    },3000);

}

/* LOAD AFTER COMPONENTS */

const originalLoadComponents = loadComponents;

loadComponents = async function(){

    await originalLoadComponents();

    loadGallery();
};

function checkPassword(){

    const password =
        document.getElementById("password").value;

    const error =
        document.getElementById("error");

    if(password === SECRET_KEY){

        document.getElementById("loginPage").style.display = "none";

        document.getElementById("mainWebsite").style.display = "block";

        loadComponents();

    }
    else{

        error.style.display = "block";

    }
}

/* LOAD COMPONENTS */

async function loadComponent(id, file){

    const response = await fetch(file);

    const data = await response.text();

    document.getElementById(id).innerHTML = data;
}

async function loadComponents(){

    await loadComponent("header","components/header.html");

    await loadComponent("about","components/about.html");

    await loadComponent("personal","components/personal.html");

    await loadComponent("education","components/education.html");

    await loadComponent("family","components/family.html");
    

    await loadComponent("gallery","components/gallery.html");

    await loadComponent("contact","components/contact.html");

    await loadComponent("footer","components/footer.html");


}


function flipCard(card){

    // toggle flip
    card.classList.add("flipped");

    // auto flip back after 10 seconds
    setTimeout(() => {
        card.classList.remove("flipped");
    }, 5000);
}


let isTelugu = false;

function toggleLanguage(){

    isTelugu = !isTelugu;

    let combo = document.querySelector(".goog-te-combo");

    if(!combo){
        console.warn("Google Translate not loaded");
        return;
    }

    combo.value = isTelugu ? "te" : "en";
    combo.dispatchEvent(new Event("change"));

    // optional UI change
    document.querySelector(".lang-btn").innerText =
        isTelugu ? "🌐 తెలుగు / English" : "🌐 English / తెలుగు";
}
