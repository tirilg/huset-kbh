let template = document.querySelector("#event-template").content; //load the posts all at once
let eventlist = document.querySelector("#eventlist");
let page = 1;
let lookingForData = false; //do not look for data yet

function fetchEvents() {
    lookingForData = true; //start looking for data
    fetch("http://tkgcreate.com/kea/m2/wp/wp-json/wp/v2/huset_kbh?_embed&per_page=2&page=" + page)
        .then(e => e.json())
        .then(showEvents);
}

function showEvents(data) {
    lookingForData = false; //data already fetched
    console.log(data);
    if (Array.isArray(data)) {
        data.forEach(showSingleEvent);
    }
}

function showSingleEvent(anEvent) {
    let clone = template.cloneNode(true);

    //get title
    clone.querySelector("h1").textContent = anEvent.title.rendered;


    //get description
    clone.querySelector(".event-descript").innerHTML = anEvent.content.rendered;


    //get location
    clone.querySelector(".event-location").textContent = anEvent.acf.event_location;


    //get price DOESNT WORK WHY????
    //clone.querySelector(".event-price").textContent = anEvent.acf.event_price;


    //get date
    clone.querySelector(".event-date").textContent = anEvent.acf.event_date;

    // get time
    clone.querySelector(".event-time").textContent = anEvent.acf.event_time;



    //get images

    if (anEvent._embedded["wp:featuredmedia"]) { //img is there
        clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { //no img
        clone.querySelector("img").remove();
    }

    //clone template
    eventlist.appendChild(clone);

}

fetchEvents();



//infinite scrolling

setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        console.log("We've reached rock bottom, fetching articles")
        page++;
        fetchEvents();
    }
}, 1000)

function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}
