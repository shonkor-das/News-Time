
const loadCeagoti = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res => res.json())
    .then(data => cetagoriName(data.data.news_category))
    .catch(error => console.log(error))
    
  }
  
  // cetagori name show
  const cetagoriName = (cetagoris) => {
    
    const cetagoriName = document.getElementById('cetagori')
    cetagoris.forEach(cetagori => {
    console.log(cetagori)
    const cetagoriLi = document.createElement('li')
    cetagoriLi .innerHTML = `
    <li onclick=(loadData('${cetagori.category_id}')) class="breadcrumb-item ms-5"><a href="#" class="text-decoration-none fw-bold text-black">${cetagori.category_name}</a></li>
    `;
    cetagoriName.appendChild(cetagoriLi)
  
    })
  }

  const loadData = (category_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => newsDisplay(data.data))
    .catch(error => console.log(error))
    toggolSpiner(true)
  }

  const newsDisplay = newses => {
  
    // news total count
    
    const totalNews = document.getElementById('total-news-count')
    totalNews.value = '';
    if( newses.length === 0){
      totalNews.value = "news not found"
      toggolSpiner(true)
    }
    else{
      totalNews.value =   `${newses.length} news find this catagoris`
    }
  
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ``;
  
    newses.sort((a, b) => {
      return b.total_view - a.total_view;
      });
    newses.forEach( news => {
      console.log(news)
      const newsDiv = document.createElement('div')
      newsDiv.innerHTML = `
      
    <div   onclick="newsDetails('${news._id}')"  class="card mb-3" style="max-width: 100%;"  data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
    <div  class="row g-0">
      <div class="col-md-4 ">
        <img src="${news.thumbnail_url}" class="img-fluid rounded-start p-4" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.details.slice(0, 350) + '...'}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>

          <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center" style:"">
              
              <img class="img-thumbnail img-fluid w-25 rounded-circle" src="${news.author.img}" style="height: 80px;" alt="">
              
            <div class="p-2">
              <p >Name: ${news.author.name ? news.author.name : 'No Author name'}</p>
            <p> ${news.author.published_date ? news.author.published_date : 'No found date'}</p>
            </div>
            
          </div>
          <div class="d-flex ">
             <span class="me-2"><i class="fa-regular fa-eye"></i></span>
             <span>${news.total_view ? news.total_view : "No view"}</span>
          </div>
        
        </div>
        </div>
      </div>
    </div>
  </div>
   

    ` ;
 
    newsContainer.appendChild(newsDiv)
    
  });

  toggolSpiner(false)
}

const newsDetails = (_id) =>{
  const url = `https://openapi.programming-hero.com/api/news/${_id}`
  fetch(url)
  .then(res => res.json())
  .then(data => newsDetailsDisplay(data.data[0]))
  
}


 const newsDetailsDisplay = (modal) => {
  const newsDetails = document.getElementById('newsDetailsModalLabel');
  newsDetails.innerText = modal.title;

  const modalDetails = document.getElementById('modal-details-body')
  modalDetails.innerHTML = `
  <p>${modal.details}</p>
  <p><span><i class="fa-regular fa-eye"></i> ${modal.total_view ? modal.total_view : 'No view'}</span></p>
  `
  

 }


 const toggolSpiner = isLoading => {
  const toggleSpiner = document.getElementById('spinner');
  if(isLoading === true){
    toggleSpiner.classList.remove('d-none');
  }
  else{
    toggleSpiner.classList.add('d-none');
  }
 }

  const blogDetails = () => {
    const blogItems = document.getElementById('nav-blog')
    const  blogItemsDiv = document.createElement('div')
    blogItemsDiv.innerHTML = `
    <li class="nav-item">
                          <a class="nav-link fw-bold" href="#"  data-bs-toggle="modal" data-bs-target="#blogModal">Blog</a>
                      </li>
                      <div class="modal fade" id="blogModal" tabindex="-1" aria-labelledby="blogModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="blogModalLabel"> Answer Of 4 Question </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <p><span class="fw-bold">Difference between var, const and const :</span> In JavaScript, users can declare a variable using 3 keywords that are var, const, and const. In this article, we will see the differences between the var, const, and const keywords. We will discuss the scope and other required concepts about each keyword.</p>

                            <p><span class="fw-bold">Difference between regular functions and arrow 
                            functions :</span>This article discusses the major differences between the regular functions and the arrow functions.

                            Arrow functions – a new feature introduced in ES6 – enable writing concise functions in JavaScript. While both regular and arrow functions work in a similar manner, yet there are certain interesting differences between them, as discussed below</p>

                            <p><span class="fw-bold">Why we use Template strings :</span> Template strings are a powerful feature of modern JavaScript released in ES6. It consts us insert/interpolate variables and expressions into strings without needing to concatenate like in older versions of JavaScript. It allows us to create strings that are complex and contain dynamic elements. Another great thing that comes with template strings are tags. Tags are functions that take a string and the decomposed parts of the string as parameters and are great for converting strings to different entities.</p>

                            <p><span class="fw-bold">Difference of .map, .forEach, .filter, .find :</span>Many posts discuss how to use .forEach(), .map(), .filter(), .reduce() and .find() on arrays in JavaScript. I thought it would be useful to provide an explanation of when to use the common array methods.
                            </p>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          
                          </div>
                        </div>
                      </div>
                    </div>    
    `;
    blogItems.appendChild(blogItemsDiv);
  }


  blogDetails()

loadData('01');
loadCeagoti();