function updateSize() {
  let window_width = window.innerWidth;
  const elementHead = document.getElementById("news")
  const elements = document.getElementsByClassName("post");
  const elementsArray = Array.from(elements);
  if (window_width > 768) {
    elementsArray.forEach(element => {
      element.style.float = "none";
    })
    elementHead.style.display = "block";

  } else if (window_width > 600) {
    elementsArray.forEach(element => {
      element.style.float = "inline-start";
    })
    elementHead.style.display = "inline-block";

  } else if (window_width > 300) {
    elementsArray.forEach(element => {
      element.style.float = "inline-start";
    });
    elementHead.style.display = "inline-block";
  }
}

function change_order(selection) {
  const elements = document.getElementsByClassName("post");
  const elementsArray = Array.from(elements);


  if (selection === "newest") {
    elementsArray.forEach(element => {
      element.remove()
    });
    fetch('Posts/posts.json')
        .then(response => response.json())
        .then(newsPosts => {
          const newsFeed = document.getElementById("news");

          newsPosts.forEach(post => {
            const postElement = document.createElement( "div");
            postElement.classList.add("post");
            postElement.style.float = "inline-start";

            // Basic post content
            let postHTML = `
          <h2>${post.title}</h2>
          <p><small>${post.date}</small></p>
          <p>${post.content}</p>
        `;

            // Add images dynamically
            if (post.images > 0) {
              post.image_url.forEach(image_url => {postHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
              });
            }

            postElement.innerHTML = postHTML;
            newsFeed.appendChild(postElement)
            updateSize()
          });
        })
        .catch(error => console.error("Error loading news:", error));
  }


  if (selection === "oldest") {
    elementsArray.forEach(element => {
      element.remove()
    });
    fetch('Posts/posts.json')
        .then(response => response.json())
        .then(newsPosts => {
          const newsFeed = document.getElementById("news");

          newsPosts.forEach(post => {
            const postElement = document.createElement( "div");
            postElement.classList.add("post");
            postElement.style.float = "inline-start";

            // Basic post content
            let postHTML = `
          <h2>${post.title}</h2>
          <p><small>${post.date}</small></p>
          <p>${post.content}</p>
        `;

            // Add images dynamically
            if (post.images > 0) {
              post.image_url.forEach(image_url => {postHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
              });
            }

            postElement.innerHTML = postHTML;
            newsFeed.appendChild(postElement)
            updateSize()
          });
        })
        .catch(error => console.error("Error loading news:", error));
  }


  if (selection === "game") {
    elementsArray.forEach(element => {
      element.remove()
    });
    fetch('Posts/posts.json')
        .then(response => response.json())
        .then(newsPosts => {
          const newsFeed = document.getElementById("news");

          newsPosts.forEach(post => {
            if (post.major === true) {
              const postElement = document.createElement("div");
              postElement.classList.add("post");
              postElement.style.float = "inline-start";

              // Basic post content
              let postHTML = `
              <h2>${post.title}</h2>
              <p><small>${post.date}</small></p>
              <p>${post.content}</p>
              `;

              // Add images dynamically
              if (post.images > 0) {
                post.image_url.forEach(image_url => {
                  postHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                });
              }

              postElement.innerHTML = postHTML;
              newsFeed.appendChild(postElement)
              updateSize()
            }
            else {
              postElement = '<h2>no news here at the moment please check back later</h2>>'
              newsFeed.appendChild(postElement)
            }
          });
        })
        .catch(error => console.error("Error loading news:", error));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('Posts/posts.json')
      .then(response => response.json())
      .then(newsPosts => {
        const newsFeed = document.getElementById("news");

        newsPosts.forEach(post => {
          const postElement = document.createElement( "div");
          postElement.classList.add("post");
          postElement.style.float = "inline-start";

          // Basic post content
          let postHTML = `
          <h2>${post.title}</h2>
          <p><small>${post.date}</small></p>
          <p>${post.content}</p>
        `;

          // Add images dynamically
          if (post.images > 0) {
              post.image_url.forEach(image_url => {postHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
              });
          }

          postElement.innerHTML = postHTML;
          if (newsFeed.hasChildNodes() === false)
            newsFeed.appendChild(postElement)
          else
            newsFeed.insertBefore(postElement, newsFeed.firstChild);
          updateSize()
        });
      })
      .catch(error => console.error("Error loading news:", error));
});