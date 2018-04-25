// url

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
console.log("get article " + id)


fetch("http://tkgcreate.com/kea/m2/wp/wp-json/wp/v2/events/" + id)
    .then(e => e.json())
    .then(showSinglePost)

function showSinglePost(aPost) {
    console.log(aPost);

    //get title
    document.querySelector("#singleEvent h1").textContent = aPost.title.rendered;

    //get description
    document.querySelector(".event-descript").innerHTML = aPost.content.rendered;

    //get price
    if (aPost.acf.event_price > 0) {
        document.querySelector(".event-price span").textContent = aPost.acf.event_price;
        document.querySelector(".event-free").style.display = "none";
    } else {
        document.querySelector(".event-price").style.display = "none";
    }


    //show eventsection

    document.querySelector("#singleEvent").classList.add("slideInEvent")


}
