function updateSize() {
  let window_width = window.innerWidth;
  const elementHead = document.getElementById("news")
  const elements = document.getElementsByClassName("post");
  const elementsArray = Array.from(elements);
  const elementButton = document.getElementsByClassName("loadMoreButton");
  const elementButtonsArray = Array.from(elementButton);
  if (window_width > 768) {
    elementsArray.forEach(element => {
      element.style.float = "none";
    })
    elementHead.style.display = "block";
    elementButtonsArray.forEach(elementButtons => {
        elementButtons.style.height = "auto";
    })

  } else if (window_width > 600) {
    elementsArray.forEach(element => {
      element.style.float = "inline-start";
    })
    elementHead.style.display = "inline-flex";
    elementButtonsArray.forEach(elementButtons => {
        elementButtons.style.height = "1300";
    })

  } else if (window_width > 300) {
    elementsArray.forEach(element => {
      element.style.float = "inline-start";
    });
    elementHead.style.display = "inline-flex";
    elementButtonsArray.forEach(elementButtons => {
        elementButtons.style.height = "1300";
    })
  }
}

function change_order(selection) {
    const elements = document.getElementsByClassName("post");
    const elementsArray = Array.from(elements);
    const buttonElements = document.getElementsByClassName("loadMoreButton");
    const buttonElementsArray = Array.from(buttonElements);


    if (selection === "newest") {
        elementsArray.forEach(element => {
            element.remove()
        });
        buttonElementsArray.forEach(buttonElement => {
            buttonElement.remove()
        });
        fetch('/Web/Posts/posts.json')
            .then(response => response.json())
            .then(newsPosts => {
                const newsFeed = document.getElementById("news");
                let i = 0;
                let newsAdded = 0;
                newsPosts.forEach(post => {
                    if (i < 5) {
                        i++
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
                        newsAdded++;
                        updateSize()
                    }
                });
                if (newsAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("post")
                    noNews.innerHTML = `<h2>no news here at the moment please check back later</h2>`
                    newsFeed.appendChild(noNews)
                }
                if (newsAdded > 0 && newsPosts.length > 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButton")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoading
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    newsFeed.appendChild(loadMoreButton)
                }
            })
            .catch(error => console.error("Error loading news:", error));
    }


    if (selection === "oldest") {
        elementsArray.forEach(element => {
            element.remove()
        });
        buttonElementsArray.forEach(buttonElement => {
            buttonElement.remove()
        });
        fetch('/Web/Posts/posts.json')
            .then(response => response.json())
            .then(newsPosts => {
                const newsFeed = document.getElementById("news");
                let i = 0;
                let newsAdded = 0;
                newsPosts.reverse().forEach(post => {
                    if (i < 5) {
                        i++
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
                        newsAdded++
                    }
                });
                if (newsAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("post")
                    noNews.innerHTML = `<h2>no news here at the moment please check back later</h2>`
                    newsFeed.appendChild(noNews)
                }
                if (newsAdded > 0 && newsPosts.length > 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButton")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoading
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    newsFeed.appendChild(loadMoreButton)
                }
            })
            .catch(error => console.error("Error loading news:", error));
    }


    if (selection === "game") {
        elementsArray.forEach(element => {
            element.remove()
        });
        buttonElementsArray.forEach(buttonElement => {
            buttonElement.remove()
        });
        fetch('/Web/Posts/posts.json')
            .then(response => response.json())
            .then(newsPosts => {
                const newsFeed = document.getElementById("news");
                let i = 0;
                let newsAdded = 0;
                newsPosts.forEach(post => {
                    if (i < 5) {
                        if (post.major === true) {
                            i++
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
                            newsAdded++
                        }
                    }
                });
                if (newsAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("post")
                    noNews.innerHTML = `<h2>no news here at the moment please check back later</h2>`
                    newsFeed.appendChild(noNews)
                }
                if (newsAdded > 0 && newsPosts.length > 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButton")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoading
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    newsFeed.appendChild(loadMoreButton)
                }
            })
            .catch(error => console.error("Error loading news:", error));
    }

    if (selection === "devlog") {
        elementsArray.forEach(element => {
            element.remove()
        });
        buttonElementsArray.forEach(buttonElement => {
            buttonElement.remove()
        });
        fetch('/Web/Posts/posts.json')
            .then(response => response.json())
            .then(newsPosts => {
                const newsFeed = document.getElementById("news");
                let i = 0;
                let newsAdded = 0;
                newsPosts.forEach(post => {
                    if (i < 5) {
                        if (post.devlog === true) {
                            i++
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
                            newsAdded++
                        }
                    }
                });
                if (newsAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("post")
                    noNews.innerHTML = `<h2>no news here at the moment please check back later</h2>`
                    newsFeed.appendChild(noNews)
                }
                if (newsAdded > 0 && newsPosts.length > 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButton")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoading
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    newsFeed.appendChild(loadMoreButton)
                }
            })
            .catch(error => console.error("Error loading news:", error));
    }
}

function keepLoading() {
    const elements = document.getElementsByClassName("loadMoreButton");
    const elementsArray = Array.from(elements);
    let selection = document.getElementById("myselect")

    if (selection.value === "newest") {
        elementsArray.forEach(element => {
            element.remove()
        });
        fetch('/Web/Posts/posts.json')
            .then(response => response.json())
            .then(newsPosts => {
                const newsFeed = document.getElementById("news");
                let i = 0;
                let newsAdded = 0;
                let elementsLoaded = newsFeed.children.length
                newsPosts.forEach(function(post, index) {
                    if (index < elementsLoaded)
                    {
                        console.log("already loaded")
                    }
                    else {
                        if (i < 5) {
                            i++
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
                            newsAdded++;
                            updateSize()
                        }
                    }
                });
                if (newsAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("post")
                    noNews.innerHTML = `<h2>no more news</h2>`
                    newsFeed.appendChild(noNews)
                }
                if (newsAdded >= 5)
                {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButton")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoading
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    newsFeed.appendChild(loadMoreButton)
                }
            })
            .catch(error => console.error("Error loading news:", error));
    }


    if (selection.value === "oldest") {
        elementsArray.forEach(element => {
            element.remove()
        });
        fetch('/Web/Posts/posts.json')
            .then(response => response.json())
            .then(newsPosts => {
                const newsFeed = document.getElementById("news");
                let i = 0;
                let newsAdded = 0;
                let elementsLoaded = newsFeed.children.length
                newsPosts.reverse().forEach(function(post, index) {
                    if (index < elementsLoaded)
                    {
                        console.log("already loaded")
                    }
                    else {
                        if (i < 5) {
                            i++
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
                            newsAdded++
                        }
                    }
                });
                if (newsAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("post")
                    noNews.innerHTML = `<h2>no more news</h2>`
                    newsFeed.appendChild(noNews)
                }
                if (newsAdded >= 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButton")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoading
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    newsFeed.appendChild(loadMoreButton)
                }

            })
            .catch(error => console.error("Error loading news:", error));
    }


    if (selection.value === "game") {
        elementsArray.forEach(element => {
            element.remove()
        });
        fetch('/Web/Posts/posts.json')
            .then(response => response.json())
            .then(newsPosts => {
                const newsFeed = document.getElementById("news");
                let i = 0;
                let newsAdded = 0;
                let elementsLoaded = newsFeed.children.length
                newsPosts.forEach(function(post, index) {
                    if (index < elementsLoaded)
                    {
                        console.log("already loaded")
                    }
                    else {
                        if (i < 5) {
                            if (post.major === true) {
                                i++
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
                                newsAdded++
                            }
                        }
                    }
                });
                if (newsAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("post")
                    noNews.innerHTML = `<h2>no more news</h2>`
                    newsFeed.appendChild(noNews)
                }
                if (newsAdded >= 5)
                {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButton")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoading
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    newsFeed.appendChild(loadMoreButton)
                }
            })
            .catch(error => console.error("Error loading news:", error));
    }

    if (selection.value === "devlog") {
        elementsArray.forEach(element => {
            element.remove()
        });
        fetch('/Web/Posts/posts.json')
            .then(response => response.json())
            .then(newsPosts => {
                const newsFeed = document.getElementById("news");
                let i = 0;
                let newsAdded = 0;
                let elementsLoaded = newsFeed.children.length
                newsPosts.forEach(function(post, index) {
                    if (index < elementsLoaded)
                    {
                        console.log("already loaded")
                    }
                    else {
                        if (i < 5) {
                            if (post.devlog === true) {
                                i++
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
                                newsAdded++
                            }
                        }
                    }
                });
                if (newsAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("post")
                    noNews.innerHTML = `<h2>no more news</h2>`
                    newsFeed.appendChild(noNews)
                }
                if (newsAdded >= 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButton")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoading
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    newsFeed.appendChild(loadMoreButton)
                }

            })
            .catch(error => console.error("Error loading news:", error));
    }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('/Web/Posts/posts.json')
      .then(response => response.json())
      .then(newsPosts => {
        const newsFeed = document.getElementById("news");
        let i = 0;
        let newsAdded = 0;
        newsPosts.forEach(post => {
            if (i < 5) {
                i++
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
                newsAdded++;
                updateSize()
            }
        });
          if (newsAdded === 0) {
              const noNews = document.createElement("div");
              noNews.classList.add("post")
              noNews.innerHTML = `<h2>no news here at the moment please check back later</h2>`
              newsFeed.appendChild(noNews)
          }
          if (newsAdded > 0 && newsPosts.length > 5)
          {
              const loadMoreButton = document.createElement("button");
              loadMoreButton.classList.add("loadMoreButton")
              loadMoreButton.style.border = "1px";
              loadMoreButton.style.borderRadius = "10px";
              loadMoreButton.style.height = "1300px";
              loadMoreButton.onclick = keepLoading
              loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
              newsFeed.appendChild(loadMoreButton)
          }
      })
      .catch(error => console.error("Error loading news:", error));
});