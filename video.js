const API_KEY = "AIzaSyAIKmitpBhRIa9u0xsHC1rcnqnzcoY-K9U";
const BASE_URL = "https://www.googleapis.com/youtube/v3" ;
const search = window.location.search
const params = new URLSearchParams(search)
const videoId = params.get('videoId')
const channelInfoContainer = document.getElementById("channelInfoContainer")
const commentContainer =  document.getElementById("comment-container")


window.addEventListener("load",()=>{
    // or do it using localstorage
    if (YT) {
        new YT.Player('video-container', {
            height: "500",
            width: "1000",
            videoId: videoId
        });
    }

   

    function displayChannelInfo(infos) {
        channelInfoContainer.innerHTML = "" ;
        infos.map((info,i)=>{
            channelInfoContainer.innerHTML += `
                <h4>${info.snippet.title}</h4>
               <img src="${info.snippet.thumbnails.high.url}" alt="">
               <p>${info.snippet.description}</p>
            `
        })
    } 
    function displayComments(comments) {
        commentContainer.innerHTML = "";
        comments.map((comment,i)=>{                      
            commentContainer.innerHTML += `
                <h4>${comment.snippet.topLevelComment.snippet.
                    authorDisplayName}</h4>
                <p>${comment.snippet.topLevelComment.snippet.textDisplay}</p>
            `
        })
    }

    function channelDetails(channelId) {
        fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&id=${channelId}`)
        .then((res) => res.json())
        .then((data)=>{
            console.log(data)  
            displayChannelInfo(data.items)
        }
        )
    }

    function commentDetails() {
        fetch(`${BASE_URL}/commentThreads?key=${API_KEY}&part=snippet&videoId=${videoId}&maxResults=25`)
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data)
            displayComments(data.items);
        })
    }


    function videoDetails() {
        fetch(`${BASE_URL}/videos?key=${API_KEY}&part=snippet&id=${videoId}`)
        .then((res) => res.json())
        .then((data)=>{
            console.log(data)
            console.log(data.items[0].snippet.channelId)     
            channelDetails(data.items[0].snippet.channelId)     
        }
        ) 
    }

 
    videoDetails()
    commentDetails()
})