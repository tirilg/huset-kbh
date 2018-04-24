// url

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
console.log("get article " + id)


fetch("http://tkgcreate.com/kea/m2/wp/wp-json/wp/v2/events/" + id)
    .then(e => e.json())
    .then(showSinglePost)

function showSinglePost(aPost) {
    console.log(aPost);
    document.querySelector("#singleEvent h1").textContent = aPost.title.rendered;
    document.querySelector("#singleEvent span").textContent = aPost.acf.event_price;



    //show eventsection

    document.querySelector("#singleEvent").classList.add("slideInEvent")
}
