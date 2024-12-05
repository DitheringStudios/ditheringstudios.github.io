function updateSize() {
    let window_width = window.innerWidth;

    if (document.getElementById("games") !== null) {
        const elementHeadForGames = document.getElementById("game_releases");
        const elementsForGames = document.getElementsByClassName("gamePost");
        const elementsArrayGame = Array.from(elementsForGames);
        const elementButtonForGame = document.getElementsByClassName("loadMoreButtonForGame");
        const elementButtonsArrayForGame = Array.from(elementButtonForGame);

        if (window_width > 768) {
            elementHeadForGames.style.display = "block";
            elementsArrayGame.forEach(element => {
                element.style.float = "none";
            })
            elementButtonsArrayForGame.forEach(elementButtons => {
                elementButtons.style.height = "auto";
            })
        } else if (window_width > 600) {
            elementsArrayGame.forEach(element => {
                element.style.float = "inline-start";
            })
            elementHeadForGames.style.display = "inline-flex";
            elementButtonsArrayForGame.forEach(elementButtons => {
                elementButtons.style.height = "1300";
            })
        } else if (window_width > 300) {
            elementsArrayGame.forEach(element => {
                element.style.float = "inline-start";
            });
            elementHeadForGames.style.display = "inline-flex";
            elementButtonsArrayForGame.forEach(elementButtons => {
                elementButtons.style.height = "1300";
            })
        }
    }
    if (document.getElementById("projects") !== null) {
        const elementHeadForGames = document.getElementById("game_releases");
        const elementsForGames = document.getElementsByClassName("gamePost");
        const elementsArrayGame = Array.from(elementsForGames);
        const elementButtonForGame = document.getElementsByClassName("loadMoreButtonForGame");
        const elementButtonsArrayForGame = Array.from(elementButtonForGame);

        if (window_width > 768) {
            elementHeadForGames.style.display = "block";
            elementsArrayGame.forEach(element => {
                element.style.float = "none";
            })
            elementButtonsArrayForGame.forEach(elementButtons => {
                elementButtons.style.height = "auto";
            })
        } else if (window_width > 600) {
            elementsArrayGame.forEach(element => {
                element.style.float = "inline-start";
            })
            elementHeadForGames.style.display = "inline-flex";
            elementButtonsArrayForGame.forEach(elementButtons => {
                elementButtons.style.height = "1300";
            })
        } else if (window_width > 300) {
            elementsArrayGame.forEach(element => {
                element.style.float = "inline-start";
            });
            elementHeadForGames.style.display = "inline-flex";
            elementButtonsArrayForGame.forEach(elementButtons => {
                elementButtons.style.height = "1300";
            })
        }
    }

  const elementHead = document.getElementById("news");
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
        fetch('/Posts/posts.json')
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
        fetch('/Posts/posts.json')
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
        fetch('/Posts/posts.json')
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
        fetch('/Posts/posts.json')
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
        fetch('/Posts/posts.json')
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
        fetch('/Posts/posts.json')
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
        fetch('/Posts/posts.json')
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
        fetch('/Posts/posts.json')
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
  fetch('/Posts/posts.json')
      .then(response => response.json())
      .then(newsPosts => {
        const newsFeed = document.getElementById("news");
        let newsAdded = 0;
        newsPosts.forEach(post => {
            if (newsAdded < 5) {
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

function load_games() {
    fetch('/Posts/games.json')
        .then(response => response.json())
        .then(gameReleases => {
            const gameFeed = document.getElementById("game_releases");
            let i = 0;
            let gamesAdded = 0;
            gameReleases.forEach(game => {
                if (i < 5) {
                    i++
                    const GamePostElement = document.createElement("div");
                    GamePostElement.classList.add("gamePost");
                    GamePostElement.style.float = "inline-start";

                    // Basic post content
                    let gamePostHTML = `
                    <h2>${game.title}</h2>
                    <p><small>${game.date}</small></p>
                    <p>${game.content}</p>
                `;

                    // Add images dynamically
                    if (game.images > 0) {
                        game.image_url.forEach(image_url => {
                            gamePostHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                        });
                    }

                    GamePostElement.innerHTML = gamePostHTML;
                    gameFeed.appendChild(GamePostElement)
                    gamesAdded++;
                    updateSize()
                }
            });
            if (gamesAdded === 0) {
                const noNews = document.createElement("div");
                noNews.classList.add("gamePost")
                noNews.innerHTML = `<h2>no news here at the moment please check back later</h2>`
                gameFeed.appendChild(noNews)
            }
            if (gamesAdded > 0 && gameReleases.length > 5) {
                const loadMoreButton = document.createElement("button");
                loadMoreButton.classList.add("loadMoreButtonForGame")
                loadMoreButton.style.border = "1px";
                loadMoreButton.style.borderRadius = "10px";
                loadMoreButton.style.height = "1300px";
                loadMoreButton.onclick = keepLoadingGames
                loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                gameFeed.appendChild(loadMoreButton)
            }
        })
        .catch(error => console.error("Error loading news:", error));
}

function keepLoadingGames() {
    const elements = document.getElementsByClassName("loadMoreButtonForGame");
    const elementsArray = Array.from(elements);
    let selection = document.getElementById("mySelectForGames")

    if (selection.value === "newest") {
        elementsArray.forEach(element => {
            element.remove()
        });
        fetch('/Posts/games.json')
            .then(response => response.json())
            .then(gameReleases => {
                const gameFeed = document.getElementById("game_releases");
                let i = 0;
                let gamesAdded = 0;
                let elementsLoaded = gameFeed.children.length
                gameReleases.forEach(function(game, index) {
                    if (index < elementsLoaded)
                    {
                        console.log("already loaded")
                    }
                    else {
                        if (i < 5) {
                            i++
                            const GamePostElement = document.createElement("div");
                            GamePostElement.classList.add("gamePost");
                            GamePostElement.style.float = "inline-start";

                            // Basic post content
                            let gamePostHTML = `
                                <h2>${game.title}</h2>
                                <p><small>${game.date}</small></p>
                                <p>${game.content}</p>
                            `;

                            // Add images dynamically
                            if (game.images > 0) {
                                game.image_url.forEach(image_url => {
                                    gamePostHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                                });
                            }

                            GamePostElement.innerHTML = gamePostHTML;
                            gameFeed.appendChild(gamePostHTML)
                            gamesAdded++;
                            updateSize()
                        }
                    }
                });
                if (gamesAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("gamePost")
                    noNews.innerHTML = `<h2>no more news</h2>`
                    gameFeed.appendChild(noNews)
                }
                if (gamesAdded >= 5)
                {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButtonForGame")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoadingGames
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    gameFeed.appendChild(loadMoreButton)
                }
            })
            .catch(error => console.error("Error loading news:", error));
    }


    if (selection.value === "oldest") {
        elementsArray.forEach(element => {
            element.remove()
        });
        fetch('/Posts/games.json')
            .then(response => response.json())
            .then(gameReleases => {
                const gameFeed = document.getElementById("game_releases");
                let i = 0;
                let gamesAdded = 0;
                let elementsLoaded = newsFeed.children.length
                gameReleases.reverse().forEach(function(game, index) {
                    if (index < elementsLoaded)
                    {
                        console.log("already loaded")
                    }
                    else {
                        if (i < 5) {
                            i++
                            const GamePostElement = document.createElement("div");
                            GamePostElement.classList.add("gamePost");
                            GamePostElement.style.float = "inline-start";

                            // Basic post content
                            let gamePostHTML = `
                                <h2>${game.title}</h2>
                                <p><small>${game.date}</small></p>
                                <p>${game.content}</p>
                            `;

                            // Add images dynamically
                            if (game.images > 0) {
                                game.image_url.forEach(image_url => {
                                    gamePostHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                                });
                            }

                            GamePostElement.innerHTML = gamePostHTML;
                            gameFeed.appendChild(GamePostElement)
                            updateSize()
                            gamesAdded++
                        }
                    }
                });
                if (gamesAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("gamePost")
                    noNews.innerHTML = `<h2>no more news</h2>`
                    gameFeed.appendChild(noNews)
                }
                if (gamesAdded >= 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButtonForGame")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoadingGames
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    gameFeed.appendChild(loadMoreButton)
                }

            })
            .catch(error => console.error("Error loading news:", error));
    }
}

function change_order_games(selection) {
    const elements = document.getElementsByClassName("gamePost");
    const elementsArray = Array.from(elements);
    const buttonElements = document.getElementsByClassName("loadMoreButtonForGame");
    const buttonElementsArray = Array.from(buttonElements);


    if (selection === "newest") {
        elementsArray.forEach(element => {
            element.remove()
        });
        buttonElementsArray.forEach(buttonElement => {
            buttonElement.remove()
        });
        fetch('/Posts/games.json')
            .then(response => response.json())
            .then(gameReleases => {
                const gameFeed = document.getElementById("game_releases");
                let i = 0;
                let gamesAdded = 0;
                gameReleases.forEach(game => {
                    if (i < 5) {
                        i++
                        const GamePostElement = document.createElement("div");
                        GamePostElement.classList.add("gamePost");
                        GamePostElement.style.float = "inline-start";

                        // Basic post content
                        let gamePostHTML = `
                      <h2>${game.title}</h2>
                      <p><small>${game.date}</small></p>
                      <p>${game.content}</p>
                  `;

                        // Add images dynamically
                        if (game.images > 0) {
                            game.image_url.forEach(image_url => {
                                gamePostHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                            });
                        }

                        GamePostElement.innerHTML = gamePostHTML;
                        gameFeed.appendChild(GamePostElement)
                        gamesAdded++;
                        updateSize()
                    }
                });
                if (gamesAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("gamePost")
                    noNews.innerHTML = `<h2>no games here at the moment please check back later</h2>`
                    gameFeed.appendChild(noNews)
                }
                if (gamesAdded > 0 && gameReleases.length > 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButtonForGame")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoadingGames
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
        fetch('/Posts/games.json')
            .then(response => response.json())
            .then(gameReleases => {
                const gameFeed = document.getElementById("game_releases");
                let i = 0;
                let gamesAdded = 0;
                gameReleases.reverse().forEach(game => {
                    if (i < 5) {
                        i++
                        const GamePostElement = document.createElement("div");
                        GamePostElement.classList.add("gamePost");
                        GamePostElement.style.float = "inline-start";

                        // Basic post content
                        let gamePostHTML = `
                      <h2>${game.title}</h2>
                      <p><small>${game.date}</small></p>
                      <p>${game.content}</p>
                  `;

                        // Add images dynamically
                        if (game.images > 0) {
                            game.image_url.forEach(image_url => {
                                gamePostHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                            });
                        }

                        GamePostElement.innerHTML = gamePostHTML;
                        gameFeed.appendChild(GamePostElement)
                        updateSize()
                        gamesAdded++
                    }
                });
                if (gamesAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("gamePost")
                    noNews.innerHTML = `<h2>no news here at the moment please check back later</h2>`
                    gameFeed.appendChild(noNews)
                }
                if (gamesAdded > 0 && gameReleases.length > 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButtonForGame")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoadingGames
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    gameFeed.appendChild(loadMoreButton)
                }
            })
            .catch(error => console.error("Error loading news:", error));
    }
}





function load_projects() {
    fetch('/Posts/projects.json')
        .then(response => response.json())
        .then(gameReleases => {
            const gameFeed = document.getElementById("game_releases");
            let i = 0;
            let gamesAdded = 0;
            gameReleases.forEach(game => {
                if (i < 5) {
                    i++
                    const GamePostElement = document.createElement("div");
                    GamePostElement.classList.add("gamePost");
                    GamePostElement.style.float = "inline-start";

                    // Basic post content
                    let gamePostHTML = `
                    <h2>${game.title}</h2>
                    <p><small>${game.date}</small></p>
                    <p>${game.content}</p>
                `;

                    // Add images dynamically
                    if (game.images > 0) {
                        game.image_url.forEach(image_url => {
                            gamePostHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                        });
                    }

                    GamePostElement.innerHTML = gamePostHTML;
                    gameFeed.appendChild(GamePostElement)
                    gamesAdded++;
                    updateSize()
                }
            });
            if (gamesAdded === 0) {
                const noNews = document.createElement("div");
                noNews.classList.add("gamePost")
                noNews.innerHTML = `<h2>no news here at the moment please check back later</h2>`
                gameFeed.appendChild(noNews)
            }
            if (gamesAdded > 0 && gameReleases.length > 5) {
                const loadMoreButton = document.createElement("button");
                loadMoreButton.classList.add("loadMoreButtonForGame")
                loadMoreButton.style.border = "1px";
                loadMoreButton.style.borderRadius = "10px";
                loadMoreButton.style.height = "1300px";
                loadMoreButton.onclick = keepLoadingProjects
                loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                gameFeed.appendChild(loadMoreButton)
            }
        })
        .catch(error => console.error("Error loading news:", error));
}

function keepLoadingProjects() {
    const elements = document.getElementsByClassName("loadMoreButtonForGame");
    const elementsArray = Array.from(elements);
    let selection = document.getElementById("mySelectForGames")

    if (selection.value === "newest") {
        elementsArray.forEach(element => {
            element.remove()
        });
        fetch('/Posts/projects.json')
            .then(response => response.json())
            .then(gameReleases => {
                const gameFeed = document.getElementById("game_releases");
                let i = 0;
                let gamesAdded = 0;
                let elementsLoaded = gameFeed.children.length
                gameReleases.forEach(function(game, index) {
                    if (index < elementsLoaded)
                    {
                        console.log("already loaded")
                    }
                    else {
                        if (i < 5) {
                            i++
                            const GamePostElement = document.createElement("div");
                            GamePostElement.classList.add("gamePost");
                            GamePostElement.style.float = "inline-start";

                            // Basic post content
                            let gamePostHTML = `
                                <h2>${game.title}</h2>
                                <p><small>${game.date}</small></p>
                                <p>${game.content}</p>
                            `;

                            // Add images dynamically
                            if (game.images > 0) {
                                game.image_url.forEach(image_url => {
                                    gamePostHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                                });
                            }

                            GamePostElement.innerHTML = gamePostHTML;
                            gameFeed.appendChild(gamePostHTML)
                            gamesAdded++;
                            updateSize()
                        }
                    }
                });
                if (gamesAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("gamePost")
                    noNews.innerHTML = `<h2>no more news</h2>`
                    gameFeed.appendChild(noNews)
                }
                if (gamesAdded >= 5)
                {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButtonForGame")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoadingProjects
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    gameFeed.appendChild(loadMoreButton)
                }
            })
            .catch(error => console.error("Error loading news:", error));
    }


    if (selection.value === "oldest") {
        elementsArray.forEach(element => {
            element.remove()
        });
        fetch('/Posts/projects.json')
            .then(response => response.json())
            .then(gameReleases => {
                const gameFeed = document.getElementById("game_releases");
                let i = 0;
                let gamesAdded = 0;
                let elementsLoaded = newsFeed.children.length
                gameReleases.reverse().forEach(function(game, index) {
                    if (index < elementsLoaded)
                    {
                        console.log("already loaded")
                    }
                    else {
                        if (i < 5) {
                            i++
                            const GamePostElement = document.createElement("div");
                            GamePostElement.classList.add("gamePost");
                            GamePostElement.style.float = "inline-start";

                            // Basic post content
                            let gamePostHTML = `
                                <h2>${game.title}</h2>
                                <p><small>${game.date}</small></p>
                                <p>${game.content}</p>
                            `;

                            // Add images dynamically
                            if (game.images > 0) {
                                game.image_url.forEach(image_url => {
                                    gamePostHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                                });
                            }

                            GamePostElement.innerHTML = gamePostHTML;
                            gameFeed.appendChild(GamePostElement)
                            updateSize()
                            gamesAdded++
                        }
                    }
                });
                if (gamesAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("gamePost")
                    noNews.innerHTML = `<h2>no more news</h2>`
                    gameFeed.appendChild(noNews)
                }
                if (gamesAdded >= 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButtonForGame")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoadingProjects
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    gameFeed.appendChild(loadMoreButton)
                }

            })
            .catch(error => console.error("Error loading news:", error));
    }
}

function change_order_projects(selection) {
    const elements = document.getElementsByClassName("gamePost");
    const elementsArray = Array.from(elements);
    const buttonElements = document.getElementsByClassName("loadMoreButtonForGame");
    const buttonElementsArray = Array.from(buttonElements);


    if (selection === "newest") {
        elementsArray.forEach(element => {
            element.remove()
        });
        buttonElementsArray.forEach(buttonElement => {
            buttonElement.remove()
        });
        fetch('/Posts/projects.json')
            .then(response => response.json())
            .then(gameReleases => {
                const gameFeed = document.getElementById("game_releases");
                let i = 0;
                let gamesAdded = 0;
                gameReleases.forEach(game => {
                    if (i < 5) {
                        i++
                        const GamePostElement = document.createElement("div");
                        GamePostElement.classList.add("gamePost");
                        GamePostElement.style.float = "inline-start";

                        // Basic post content
                        let gamePostHTML = `
                      <h2>${game.title}</h2>
                      <p><small>${game.date}</small></p>
                      <p>${game.content}</p>
                  `;

                        // Add images dynamically
                        if (game.images > 0) {
                            game.image_url.forEach(image_url => {
                                gamePostHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                            });
                        }

                        GamePostElement.innerHTML = gamePostHTML;
                        gameFeed.appendChild(GamePostElement)
                        gamesAdded++;
                        updateSize()
                    }
                });
                if (gamesAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("gamePost")
                    noNews.innerHTML = `<h2>no games here at the moment please check back later</h2>`
                    gameFeed.appendChild(noNews)
                }
                if (gamesAdded > 0 && gameReleases.length > 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButtonForGame")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoadingProjects
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
        fetch('/Posts/projects.json')
            .then(response => response.json())
            .then(gameReleases => {
                const gameFeed = document.getElementById("game_releases");
                let i = 0;
                let gamesAdded = 0;
                gameReleases.reverse().forEach(game => {
                    if (i < 5) {
                        i++
                        const GamePostElement = document.createElement("div");
                        GamePostElement.classList.add("gamePost");
                        GamePostElement.style.float = "inline-start";

                        // Basic post content
                        let gamePostHTML = `
                      <h2>${game.title}</h2>
                      <p><small>${game.date}</small></p>
                      <p>${game.content}</p>
                  `;

                        // Add images dynamically
                        if (game.images > 0) {
                            game.image_url.forEach(image_url => {
                                gamePostHTML += `<img style="height:50px;width:50px;" src="${image_url}" alt=post.imageText>`;
                            });
                        }

                        GamePostElement.innerHTML = gamePostHTML;
                        gameFeed.appendChild(GamePostElement)
                        updateSize()
                        gamesAdded++
                    }
                });
                if (gamesAdded === 0) {
                    const noNews = document.createElement("div");
                    noNews.classList.add("gamePost")
                    noNews.innerHTML = `<h2>no news here at the moment please check back later</h2>`
                    gameFeed.appendChild(noNews)
                }
                if (gamesAdded > 0 && gameReleases.length > 5) {
                    const loadMoreButton = document.createElement("button");
                    loadMoreButton.classList.add("loadMoreButtonForGame")
                    loadMoreButton.style.border = "1px";
                    loadMoreButton.style.borderRadius = "10px";
                    loadMoreButton.style.height = "1300px";
                    loadMoreButton.onclick = keepLoadingProjects
                    loadMoreButton.innerHTML = `<buttonText>load more</buttonText>`
                    gameFeed.appendChild(loadMoreButton)
                }
            })
            .catch(error => console.error("Error loading news:", error));
    }
}

function LoadVideos() {
    fetch('Posts/videos.json')
        .then(response => response.json())
        .then(videos => {
            const videoColum = document.getElementById("videoColum");
            let videosAdded = 0;
            videos.forEach(video => {
                if (videosAdded < 5) {
                    videosAdded++;
                    const videoElement = document.createElement("div");
                    videoElement.id = 'video';

                    videoElement.innerHTML = `
					<iframe class="media-content-l media-content-m media-content-s"
							src="${video.url}"
							width="90%"
							height="90%"
							allowfullscreen>
					</iframe>
                  `

                    videoColum.appendChild(videoElement);
                    updateSize();
                }
            });

            if (videosAdded === 0) {
                const noVideos = document.createElement("div");
                noVideos.classList.add("video");
                noVideos.innerHTML = '<h2>No videos here at the moment. Please check back later.</h2>';
                videoColum.appendChild(noVideos);
            }

            if (videosAdded > 0 && videos.length > 5) {
                const loadMoreButton = document.createElement("a");
                loadMoreButton.innerHTML = '<button><buttonText>View More</buttonText></button>';
                loadMoreButton.style.border = "1px solid";
                loadMoreButton.style.borderRadius = "10px";
                loadMoreButton.style.height = "130px";
                loadMoreButton.href = "https://github.com/Cat5TV/pinecraft";
                videoColum.appendChild(loadMoreButton);
            }
        })
        .catch(error => console.error("Error loading videos:", error));
}