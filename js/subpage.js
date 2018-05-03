// url

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
console.log("get article " + id)


fetch("http://tkgcreate.com/kea/m2/wp/wp-json/wp/v2/events/" + id + "?_embed")
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

    //get location

    document.querySelector(".event-location").textContent = aPost.acf.event_location;

    //get images

    if (aPost._embedded["wp:featuredmedia"]) { //img is there
        document.querySelector(".event-pic").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { //no img
        document.querySelector(".event-pic").remove();
    }

    //get date
    var year = aPost.acf.event_date.substring(2, 4);
    var month = aPost.acf.event_date.substring(4, 6);
    var day = aPost.acf.event_date.substring(6, 8);

    document.querySelector(".event-date").textContent = day + "." + month + "." + year;

    // get time
    document.querySelector(".event-time").textContent = aPost.acf.event_time;





    //show eventsection

    document.querySelector("#singleEvent").classList.add("slideInEvent")


}
