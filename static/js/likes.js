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