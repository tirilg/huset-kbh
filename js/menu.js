  fetch("http://tkgcreate.com/kea/m2/wp/wp-json/wp/v2/categories")
      .then(e => e.json())
      .then(buildMenu)

  function buildMenu(data) {
      let parentElement = document.querySelector(".menu ul");
      data.forEach(item => {
          console.log(item);
          let li = document.createElement("li");
          let a = document.createElement("a");
          a.textContent = item.name;
          a.href = "index.html?category=" + item.id;

          li.appendChild(a);
          parentElement.appendChild(li);


      })
  }
