function loadReviews() {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "http://localhost:3000/reviews", true);
    xhr.send(); 
    xhr.onload = function() {
        let output = "";
        if (this.status == 200) {
            let data = JSON.parse(this.responseText);
            data.forEach(review => {
                const Rating = 5 - review.rating;
                const stars = generateStars(Rating); 
                output += `
                    <div class="review" id="review-${review.id}">
                        <h3>${review.bookTitle}</h3>
                        <p><strong>Reviewed by:</strong> ${review.name}</p>
                        <p>${review.reviewText}</p>
                        <p><strong>Rating:</strong> ${stars}</p> <!-- Display stars -->
                        <button onclick="deleteReview(${review.id})">Delete Review</button>
                        <button onclick="editReview(${review.id})">Edit Review</button>
                    </div>`;
            });
            document.getElementById("reviews-container").innerHTML = output;
        } else {
            document.getElementById('errorMessage').innerHTML = 'Error loading reviews. Please try again later.';
        }
    }
}


function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '<span class="star">&#9734;</span>'; 
    }
    for (let i = rating; i < 5; i++) {
        stars += '<span class="star">&#9733;</span>';
    }
    return stars;
}


function addReview() {
    const name = document.getElementById('name').value;
    const bookTitle = document.getElementById('bookTitle').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.innerHTML = '';
    if (!name || !bookTitle || !reviewText || !rating) {
        errorMessage.innerHTML = 'Please fill out all fields and select a rating.';
        return;
    }

    const review = { name, bookTitle, reviewText, rating };
    let xhr = new XMLHttpRequest();
    xhr.open("post", "http://localhost:3000/reviews", true); 
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(review));

    xhr.onload = function() {
        if (this.status == 201) { 
            loadReviews(); 
            document.getElementById('reviewForm').reset();
        } else {
            errorMessage.innerHTML = 'Error submitting review. Please try again.';
        }
    }
}



function deleteReview(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("delete", "http://localhost:3000/reviews/" + id, true);
    xhr.send();
    xhr.onload = function() {
        if (this.status == 200) {
            alert("Review deleted");
            loadReviews(); 
        } else {
            alert(this.responseText);
        }
    }
}


function editReview(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "http://localhost:3000/reviews/" + id, true);
    xhr.send();
    xhr.onload = function() {
        if (this.status == 200) {
            const review = JSON.parse(this.responseText);
            
          
            document.getElementById('name').value = review.name;
            document.getElementById('bookTitle').value = review.bookTitle;
            document.getElementById('reviewText').value = review.reviewText;
            document.querySelector(`input[name="rating"][value="${review.rating}"]`).checked = true;
            
         
            document.getElementById('reviewId').value = id;
            
            
            document.getElementById('submitReviewButton').innerText = 'Update Review';
        }
    }
}


function updateReview() {
    const id = document.getElementById('reviewId').value;
    const name = document.getElementById('name').value;
    const bookTitle = document.getElementById('bookTitle').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;

    if (!name || !bookTitle || !reviewText || !rating) {
        document.getElementById('errorMessage').innerHTML = 'Please fill out all fields and select a rating.';
        return;
    }

    const updatedReview = { name, bookTitle, reviewText, rating };
    let xhr = new XMLHttpRequest();
    xhr.open("put", "http://localhost:3000/reviews/" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(updatedReview));

    xhr.onload = function() {
        if (this.status == 200) {
            loadReviews();
            document.getElementById('reviewForm').reset();
            document.getElementById('submitReviewButton').innerText = 'Add Review';
        } else {
            document.getElementById('errorMessage').innerHTML = 'Error updating review. Please try again.';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    document.getElementById('reviewForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addReview();
    });
});

function toggleAccordion(element) {
   
    var panel = element.nextElementSibling;
    
    
    if (panel.style.display === "block") {
        panel.style.display = "none";
        
        element.querySelector('i').classList.remove('bx-minus');
        element.querySelector('i').classList.add('bx-plus');
    } else {
       
        var allPanels = document.querySelectorAll('.panel');
        allPanels.forEach(function(p) {
            p.style.display = 'none';
            
            p.previousElementSibling.querySelector('i').classList.remove('bx-minus');
            p.previousElementSibling.querySelector('i').classList.add('bx-plus');
        });
        
        panel.style.display = "block";
        
        element.querySelector('i').classList.remove('bx-plus');
        element.querySelector('i').classList.add('bx-minus');
    }
}
