const API_KEY = "AIzaSyAIKmitpBhRIa9u0xsHC1rcnqnzcoY-K9U";
const BASE_URL = "https://www.googleapis.com/youtube/v3" ;
const searchBtn = document.getElementById("searchBtn")
const searchInput = document.getElementById("searchInput")
const videoContainer = document.getElementById("videoContainer")
const themeSwitcher = document.getElementById("switchTheme");

function getSearchData(searchQuery) {
    
    fetch(`${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&type=video&maxResults=20&part=snippet`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        displayVideo(data.items);
    } 
    )
}


function displayVideo(videos) {
    videoContainer.innerHTML ="";
     videos.map((video,i)=>{
        
        videoContainer.innerHTML += `
            <a href="/youtube_clone_updated/video.html?videoId=${video.id.videoId}">
                <li>
                    <img src="${video.snippet.thumbnails.high.url}" alt="">
                    <p>${video.snippet.title}</p>
                </li>
            </a>
            
        `
     })
}

searchBtn.addEventListener("click", ()=>{
    getSearchData(searchInput.value);
    
})




