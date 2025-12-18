let minefield = document.getElementById("minefield");
const kysymys = document.getElementById("kysymys");
const cross = document.getElementById("cross");
const check = document.getElementById("check");
const select = document.getElementById("select");
const lose = document.getElementById("lose");
const reset = document.getElementById("reset");
const start = document.getElementById("start");

let gameover = false;
document.querySelectorAll("#kysymys").forEach((img) => {
  img.classList.add("locked");
});

let mines = [];
let minescount = 0;
reset.addEventListener("click", function () {
  minefield.innerHTML = "";
  document.querySelector("#start").classList.remove("locked");
  document.querySelector("#select").classList.remove("locked");
  document.querySelector("#reset").classList.remove("locked");

  mines = [];

  minescount = 0;
  gameOver = false;
  lose.innerHTML = "";
  select.value = "";
  document.querySelectorAll("#kysymys").forEach((img) => {
    img.classList.add("locked");

    start.addEventListener("click", function () {
      if (select.value !== "") {
        document.querySelectorAll("#kysymys").forEach((img) => {
          img.classList.remove("locked");
        });
      }
    });
  });

  for (let i = 0; i < 25; i++) {
    const box = document.createElement("div");
    const kysymysclone = kysymys.cloneNode(true);

    kysymysclone.style.display = "block";
    kysymysclone.dataset.index = i;
    kysymysclone.style.height = "104px";
    kysymysclone.style.width = "104px";

    // poista mahdollinen lukitus

    kysymysclone.addEventListener("click", function (e) {
      if (gameOver) return;

      const index = Number(e.target.dataset.index);

      if (mines.includes(index)) {
        e.target.src = cross.src;
        lose.innerHTML = "Hävisit";
        lose.style.color = "red";
        lose.style.fontSize = "30px";

        gameOver = true;
        document.querySelectorAll("#kysymys").forEach((img) => {
          img.classList.add("locked");
        });
      } else {
        e.target.src = check.src;
      }
    });

    box.appendChild(kysymysclone);
    minefield.appendChild(box);
  }
});
start.addEventListener("click", function () {
  if (select.value != "") {
    document.querySelectorAll("#kysymys").forEach((img) => {
      img.classList.remove("locked");
    });

    document.querySelector("#start").classList.add("locked");
    document.querySelector("#select").classList.add("locked");
    document.querySelector("#reset").classList.add("locked");
  }
});

select.addEventListener("input", function (e) {
  mines = [];
  minescount = Number(e.target.value);

  for (let i = 0; i < minescount; i++) {
    let random = Math.floor(Math.random() * 25);

    // estää duplikaatit
    if (!mines.includes(random)) {
      mines.push(random);
    } else {
      i--; // yritä uudelleen
    }
  }

  console.log("Miinat:", mines);
});

for (let i = 0; i < 25; i++) {
  const boxes = document.createElement("div");
  const kysymysclone = kysymys.cloneNode(true);

  kysymysclone.style.display = "block";
  kysymysclone.dataset.index = i;
  kysymysclone.style.height = "104px";
  kysymysclone.style.width = "104px";

  kysymysclone.addEventListener("click", function (e) {
    const index = Number(e.target.dataset.index);

    if (mines.includes(index)) {
      e.target.src = cross.src;
      lose.innerHTML = "Hävisit";
      lose.style.color = "red";
      lose.style.fontSize = "30px";

      document.querySelector("#reset").classList.remove("locked");

      gameover = true;
      document.querySelectorAll("#kysymys").forEach((img) => {
        img.classList.add("locked");
      });
    } else {
      e.target.src = check.src;
    }
  });

  boxes.appendChild(kysymysclone);
  minefield.appendChild(boxes);
}
