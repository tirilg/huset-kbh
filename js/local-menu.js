  fetch("http://tkgcreate.com/kea/m2/wp/wp-json/wp/v2/categories?categories=7,8")
      .then(e => e.json())
      .then(localMenu)


  function localMenu(build) {
      let menuElement = document.querySelector(".local-nav ul");
      build.forEach(object => {
          console.log(object);
          if (object.count > 0 && object.parent === 24) {
              let list = document.createElement("li");
              let ahref = document.createElement("a");
              ahref.textContent = object.name;
              ahref.href = "index.html?category=" + object.id;

              list.appendChild(ahref);
              menuElement.appendChild(list);

          }
      })



  }
