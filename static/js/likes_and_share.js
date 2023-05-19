function like(gameId) {
    const likeCount = document.getElementById(`likes-count-${gameId}`);
    const likeButton = document.getElementById(`like-button-${gameId}`);

    fetch(`/like-game/${gameId}`, {method: "POST"})
        .then((res) => res.json())
        .then((data) => {
            likeCount.innerHTML = data["likes"];
            if (data["liked"]) {
            likeButton.className = "fas fa-thumbs-up";
            } else {
            likeButton.className = "far fa-thumbs-up";
            }
        })
        .catch((e) => alert("Could not like game."));
}

$('.copy_text').click(function (e) {
   e.preventDefault();
   var copyText = $(this).attr('href');
   var temp = new URL(copyText, document.baseURI).href
   copyText = temp

   document.addEventListener('copy', function(e) {
      e.clipboardData.setData('text/plain', copyText);
      e.preventDefault();
   }, true);

   document.execCommand('copy');
   alert("Copied text!");
 });