function change_order(post) {
  const dbParam = JSON.stringify({table:post,limit:10});
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    const myObj = JSON.parse(this.responseText);
    let text = "<table border='1'>"
    for (let x in myObj) {
      text += "<tr><td>" + myObj[x].name + "</td></tr>";
    }
    text += "</table>"
    document.getElementById("news").innerHTML = text;
  }
  xmlhttp.open("POST", "posts.json", true);
  xmlhttp.send("x=" + dbParam);
}