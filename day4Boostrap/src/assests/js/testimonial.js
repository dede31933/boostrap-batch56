function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onerror = () => {
      reject("ini erorr!");
    };
    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.send();
  });
}

function generateStars(rating) {
  let starsHTML = '';
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starsHTML += '<i class="fas fa-star" style="color: #FFD700;"></i>';
    } else {
      starsHTML += '<i class="fas fa-star" style="color: #ddd;"></i>';
    }
  }
  return starsHTML;
}

async function allTestimonial() {
  try {
    const testimonial = await fetchUrl("https://api.npoint.io/e2180a9b0f783ee33561");
    if (testimonial.length === 0) {
      document.getElementById("testimonials").innerHTML = "<p>Tidak ada data</p>";
      return;
    }
    const testimonialsHTML = testimonial.map((item) => {
      return `<div class="col-md-4">
  <div class="card testimonial">
    <img src="${item.image}" class="card-img-top" alt="Testimonial Image">
    <div class="card-body">
      <p class="card-text">"${item.quote}"</p>
      <div class="card-title">-${item.author}</div>
      <div class="rating">${generateStars(item.ranting)}</div>
    </div>
  </div>
</div>`;
    });
    document.getElementById("testimonials").innerHTML = testimonialsHTML.join(" ");
  } catch (error) {
    alert(error);
  }
}

async function filterTestimonial(ranting) {
  try {
    const testimonial = await fetchUrl("https://api.npoint.io/e2180a9b0f783ee33561");
    const testimonialFilter = testimonial.filter((item) => item.ranting === ranting);
    if (testimonialFilter.length === 0) {
      document.getElementById("testimonials").innerHTML = "<p>Tidak ada data</p>";
      return;
    }
    const testimonialsHTML = testimonialFilter.map((item) => {
      return `<div class="col-md-4">
          <div class="card testimonial">
            <img src="${item.image}" class="card-img-top" alt="Testimonial Image">
            <div class="card-body">
              <p class="card-text">"${item.quote}"</p>
              <div class="card-title">-${item.author}</div>
              <div class="rating">${generateStars(item.ranting)}</div>
            </div>
          </div>
        </div>`;
    });
    document.getElementById("testimonials").innerHTML = testimonialsHTML.join(" ");
  } catch (error) {
    alert(error);
  }
}

allTestimonial();
