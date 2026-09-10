const cl = console.log;


const addFormBtn = document.getElementById('addFormBtn')
const backDrop = document.getElementById('backDrop')
const formClose = document.querySelectorAll('.formClose')
const movieForm = document.getElementById('movieForm')

const movieName = document.getElementById('movieName')
const movieImage = document.getElementById('movieImage')
const movieDescription = document.getElementById('movieDescription')
const movieRating = document.getElementById('movieRating')
const movieContainer = document.getElementById('movieContainer')
const addMovie = document.getElementById('addMovie')
const updateMovieBtn = document.getElementById('updateMovieBtn')



let movieArr = [
    {
        movieId: "1",
        movieName: "RRR",
        movieImg: "https://www.impawards.com/intl/india/2022/posters/rrr.jpg",
        defaultImg: 'https://i.pinimg.com/564x/00/81/b6/0081b6169b11a806603d770b179f974a.jpg',
        movieRating: 3.4,
        movieDescription: "RRR is an epic action drama about two revolutionaries who come together to fight against British rule. Their friendship and courage form the heart of this powerful story."
    },

    {
        movieId: "2",
        movieName: "Kantara",
        movieImg: "https://www.impawards.com/intl/india/2022/posters/kantara.jpg",
        defaultImg: 'https://i.pinimg.com/564x/00/81/b6/0081b6169b11a806603d770b179f974a.jpg',
        movieRating: 6.8,
        movieDescription: "Kantara is a gripping story about a village, its traditions, and the deep connection between its people and the land. ."
    },

    {
        movieId: "3",
        movieName: "Vikram",
        movieImg: "https://www.impawards.com/intl/india/2022/posters/vikram.jpg",
        defaultImg: 'https://i.pinimg.com/564x/00/81/b6/0081b6169b11a806603d770b179f974a.jpg',
        movieRating: 5.4,
        movieDescription: "A mysterious investigation leads a special team into the dangerous world of drugs and organized crime. As the investigation continues, hidden identities and secrets begin to surface."
    },

    {
        movieId: "4",
        movieName: "Sita Ramam",
        movieImg: "https://www.impawards.com/intl/india/2022/posters/sita_ramam.jpg",
        defaultImg: 'https://i.pinimg.com/564x/00/81/b6/0081b6169b11a806603d770b179f974a.jpg',
        movieRating: 2.7,
        movieDescription: "Sita Ramam is a beautiful romantic drama about Lieutenant Ram, an army officer who receives an unexpected letter from a woman named Sita. ."
    },

    {
        movieId: "5",
        movieName: "KGF: Chapter 1",
        movieImg: "https://www.impawards.com/intl/india/2018/posters/kgf.jpg",
        defaultImg: 'https://i.pinimg.com/564x/00/81/b6/0081b6169b11a806603d770b179f974a.jpg',
        movieRating: 4.7,
        movieDescription: "Rocky is a young man who grows up in poverty but dreams of becoming the most powerful person in the world. His journey takes him into the dangerous Kolar Gold Fields, where he challenges a powerful criminal empire. With determination and courage, Rocky begins building his own reputation and fighting against the people who control the mines."
    },

    {
        movieId: "6",
        movieName: "Baahubali: The Beginning",
        movieImg: "https://www.impawards.com/intl/india/2015/posters/baahubali_the_beginning.jpg",
        defaultImg: 'https://i.pinimg.com/564x/00/81/b6/0081b6169b11a806603d770b179f974a.jpg',
        movieRating: 8.0,
        movieDescription: "Baahubali follows Shivudu, a young man who grows up unaware of his royal heritage. After discovering the truth about his family"
    }
];



// localStorage.setItem('southMovieArr', JSON.stringify(movieArr))


//by default Array for movie card

let data = localStorage.getItem('southMovieArr')
let southMovieArr;
if (data) {
    southMovieArr = JSON.parse(data)
} else {
    southMovieArr = movieArr
    localStorage.setItem('southMovieArr', JSON.stringify(southMovieArr))
}

//shortcut function for showing/set data in local storage

function showDataInLS() {
    localStorage.setItem('southMovieArr', JSON.stringify(southMovieArr))
}

//Function for badge color using ratig

function setRating(rating) {
    if (rating >= 6) {
        return 'badge-success'
    } else if (rating >= 3 && rating <= 6) {
        return 'badge-warning'
    } else {
        return 'badge-danger'
    }
}

//function for snackbar

function snackbar(msg, icon) {
    Swal.fire({
        title: msg,
        icon: icon,
        timer: 3000
    })
}


//function for form and backdrop hide/show

function onToggleBtn() {
    backDrop.classList.toggle('active')
    movieForm.classList.toggle('active')
}
addFormBtn.addEventListener('click', onToggleBtn)
formClose.forEach(e => e.addEventListener('click', onToggleBtn))


//default Image for movieCard

let defaultImg = 'https://i.pinimg.com/564x/00/81/b6/0081b6169b11a806603d770b179f974a.jpg'


//Templating

function onCreateMovieCard(arr) {
    let res = '';
    arr.forEach(ele => {
        res += `<div class="col-3" id="${ele.movieId}">
                <div class="card sec-btn movieCard mt-5">
                    <div class="card-header d-flex justify-content-between ml-0">
                        <div class="col-8 m-0 p-0">
                            <h4 class="m-0 p-0 text-left">${ele.movieName}</h4>
                        </div>

                        <div class="col-2 offset-1 text-left m-0">
                            <h5><span class="badge ${setRating(ele.movieRating)}">${ele.movieRating}</span></h5>
                        </div>

                    </div>
                    <div class="card-body p-0 px-2">
                        <figure class="p-0 py-0">
                            <img src="${ele.movieImg || defaultImg}"
                                alt="${ele.movieName}">

                            <figcaption>
                                <h3 class="m-0">${ele.movieName}</h3>
                                <p>${ele.movieDescription}
                                </p>
                            </figcaption>
                        </figure>

                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <button onclick="onEdit(this)" type="button" class="btn-sm sec-btn">Edit</button>
                        <button onclick="onDelete(this)" type="button" class="btn-sm pri-btn">Remove</button>
                    </div>

                </div>
            </div>`
    })

    movieContainer.innerHTML = res;
}

onCreateMovieCard(southMovieArr)

function onSubmit(eve) {
    eve.preventDefault();

    let newCard = {
        movieId: Date.now().toString(),
        movieName: movieName.value,
        movieImg: movieImage.value,
        movieDescription: movieDescription.value,
        movieRating: movieRating.value
    }

    movieForm.reset();
    southMovieArr.push(newCard)
    showDataInLS()

    let newMcard = document.createElement('div')
    newMcard.className = 'col-3'
    newMcard.id = newCard.movieId
    newMcard.innerHTML = `<div class="card sec-btn movieCard mt-5">
                    <div class="card-header d-flex justify-content-between ml-0">
                        <div class="col-8 m-0 p-0">
                            <h4 class="m-0 p-0 text-left">${newCard.movieName}</h4>
                        </div>

                        <div class="col-2 offset-1 text-left m-0">
                            <h5><span class="badge ${setRating(newCard.movieRating)}">${newCard.movieRating}</span></h5>
                        </div>

                    </div>
                    <div class="card-body p-0 px-2">
                        <figure class="p-0 py-0">
                            <img src="${newCard.movieImg || defaultImg}"
                                alt="${newCard.movieName}">

                            <figcaption>
                                <h3 class="m-0">${newCard.movieName}</h3>
                                <p>${newCard.movieDescription}
                                </p>
                            </figcaption>
                        </figure>

                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <button onclick="onEdit(this)" type="button" class="btn-sm sec-btn">Edit</button>
                        <button onclick="onDelete(this)"  type="button" class="btn-sm pri-btn">Remove</button>
                    </div>

                </div>`
    movieContainer.append(newMcard)
    snackbar('New Movie Card created successfully', 'success')

}

function onEdit(ele) {
    let editId = ele.closest('.col-3').id;
    // cl(editId)

    localStorage.setItem('updateid', editId)

    let editObj = southMovieArr.find(e => e.movieId === editId)
    // cl(editObj)


    movieName.value = editObj.movieName,
        movieImage.value = editObj.movieImg,
        movieDescription.value = editObj.movieDescription,
        movieRating.value = editObj.movieRating

    onToggleBtn()

    addMovie.classList.add('d-none')
    updateMovieBtn.classList.remove('d-none')

}

function onUpdate() {
    let updateId = localStorage.getItem('updateid')
    // cl(updateId)

    let updateMovie = {
        movieId: updateId,
        movieName: movieName.value,
        movieImg: movieImage.value,
        movieDescription: movieDescription.value,
        movieRating: movieRating.value
    }

    movieForm.reset();

    let getIndex = southMovieArr.findIndex(e => e.movieId === updateId)
    // cl(getIndex)
    southMovieArr[getIndex] = updateMovie

    // let rating = movieRating.value
    // if(rating >= 1 && rating <= 10){
    //     alert('rating must between 1 to 10')
    //     return
    // }

    showDataInLS()
    onToggleBtn()

    let movieCard = document.getElementById(updateId)
    movieCard.innerHTML = `
                <div class="card sec-btn movieCard mt-5">
                    <div class="card-header d-flex justify-content-between ml-0">
                        <div class="col-8 m-0 p-0">
                            <h4 class="m-0 p-0 text-left">${updateMovie.movieName}</h4>
                        </div>

                        <div class="col-2 offset-1 text-left m-0">
                            <h5><span class="badge ${setRating(updateMovie.movieRating)}">${updateMovie.movieRating}</span></h5>
                        </div>

                    </div>
                    <div class="card-body p-0 px-2">
                        <figure class="p-0 py-0">
                            <img src="${updateMovie.movieImg || defaultImg}"
                                alt="${updateMovie.movieName}">

                            <figcaption>
                                <h3 class="m-0">${updateMovie.movieName}</h3>
                                <p>${updateMovie.movieDescription}
                                </p>
                            </figcaption>
                        </figure>

                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <button onclick="onEdit(this)" type="button" class="btn-sm sec-btn">Edit</button>
                        <button onclick="onDelete(this)" type="button" class="btn-sm pri-btn">Remove</button>
                    </div>
                </div>`
    addMovie.classList.remove('d-none')
    updateMovieBtn.classList.add('d-none')
    snackbar('Movie Card updated successfully', 'success')


}

function onDelete(ele) {
    let deleteId = ele.closest('.col-3').id;
    // cl(deleteId)

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        let getIndex = southMovieArr.findIndex(e => e.movieId === deleteId)
        // cl(getIndex)
        southMovieArr.splice(getIndex, 1)

        showDataInLS()

        ele.closest('.col-3').remove()
        snackbar('Movie Card deleted successfully', 'success')

    });
}


movieForm.addEventListener('submit', onSubmit)
updateMovieBtn.addEventListener('click', onUpdate)