let template = document.querySelector("#event-template").content; //load the posts all at once
let eventlist = document.querySelector("#eventlist");
let page = 1;
let lookingForData = false; //do not look for data yet

function fetchEvents() {
    lookingForData = true; //start looking for data

    let urlParams = new URLSearchParams(window.location.search);
    let catid = urlParams.get("category");
    if (catid) {
        fetch("http://tkgcreate.com/kea/m2/wp/wp-json/wp/v2/events?_embed&per_page=10&categories=7,8&order=asc&page=" + page + "&categories=" + catid)
            .then(e => e.json())
            .then(showEvents);

    } else {
        fetch("http://tkgcreate.com/kea/m2/wp/wp-json/wp/v2/events?_embed&per_page=10&categories=7,8&order=asc&page=" + page)
            .then(e => e.json())
            .then(showEvents);
    }

}

function showEvents(data) {
    lookingForData = false; //data already fetched
    console.log(data);
    if (Array.isArray(data)) {
        data.forEach(showSingleEvent);
    } else {
        lookingForData = true;
    }
}

function showSingleEvent(anEvent) {
    let clone = template.cloneNode(true);

    //get title
    clone.querySelector("h1").innerHTML = anEvent.title.rendered;


    //get description / show in subpage instead
    //clone.querySelector(".event-descript").innerHTML = anEvent.content.rendered;


    //get location
    clone.querySelector(".event-location").textContent = anEvent.acf.event_location;


    //get price and "free"
    if (anEvent.acf.event_price > 0) {
        clone.querySelector(".event-price span").textContent = anEvent.acf.event_price;
        clone.querySelector(".event-free").style.display = "none";
    } else {
        clone.querySelector(".event-price").style.display = "none";
    }



    //get date
    var year = anEvent.acf.event_date.substring(2, 4);
    var month = anEvent.acf.event_date.substring(4, 6);
    var day = anEvent.acf.event_date.substring(6, 8);

    clone.querySelector(".event-date").textContent = day + "." + month + "." + year;

    // get time
    clone.querySelector(".event-time").textContent = anEvent.acf.event_time;



    //get tags

    anEvent._embedded["wp:term"][1].forEach(cat => {
        console.log(cat.name);
        let li = document.createElement("li");
        li.textContent = cat.name
        clone.querySelector(".event-category ul").appendChild(li)
    });


    //get images

    if (anEvent._embedded["wp:featuredmedia"]) { //img is there
        clone.querySelector(".event-pic").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { //no img
        clone.querySelector(".event-pic").remove();
    }

    //read more
    clone.querySelector("#read-more").href = "subpage.html?id=" + anEvent.id;

    //buy ticket
    clone.querySelector("#buy-ticket").href = "https://www.ticketmaster.dk/search/?keyword=Huset+KBH.%2C+1.+sal+K%C3%B8benhavn+K"

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
