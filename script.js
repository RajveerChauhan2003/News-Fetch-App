const apiKey = 'a2f342ccd3624d3285ffab110a45ea64'

const blogcontainer = document.getElementById('blog-container')

const searchfield = document.getElementById('search-field')
const searchbutton = document.getElementById('search-button')

searchbutton.addEventListener('click',async ()=>{
    const query = searchfield.value.trim()
    if(query!==""){
        try{
            const articles = await fetchnewsquery(query)
            displayblogs(articles)
        }
        catch(error){
            console.log("Error fetching query news",error)
        }
    }
})

async function fetchnewsquery(query){
    try{
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`
        const response = await fetch(apiurl)
        const data = await response.json()
        console.log(data)
        return data.articles;
    }
    catch(error){
        console.log("Error fetching random news",error);
        return [];
    }
}

async function getRandomNews(){
    try{
        const apiurl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apiKey}`
        const response = await fetch(apiurl)
        const data = await response.json()
        console.log(data)
        return data.articles;
    }
    catch(error){
        console.log("Error fetching random news",error);
        return [];
    }
}

function displayblogs(articles){
    blogcontainer.innerHTML="";
    articles.forEach((article) => {
        const blogcard = document.createElement('div')
        blogcard.classList.add('blog-card')
        const img = document.createElement("img")
        img.src=article.urlToImage
        const title = document.createElement('h3')
        title.textContent=article.title
        const description = document.createElement('p')
        description.textContent=article.description
        
        blogcard.appendChild(img)
        blogcard.appendChild(title)
        blogcard.appendChild(description)
        blogcard.addEventListener('click',(e)=>{
            window.open(article.url,"_blank")
        })
        blogcontainer.appendChild(blogcard)
    });
}

(async ()=>{
    try{
        const articles = await getRandomNews();
        displayblogs(articles);
    }
    catch(error){
        console.log("Error fetching random news",error);
    }
})();