let minefield = document.getElementById("minefield");
const kysymys = document.getElementById("kysymys");
const cross = document.getElementById("cross");
const check = document.getElementById("check");
const select = document.getElementById("select");
const lose = document.getElementById("lose");

const start = document.getElementById("start");

function showall(miinat) {
  const kaikkiruudut = document.querySelectorAll(".cell");
  kaikkiruudut.forEach((ruutu) => {
    const index = Number(ruutu.dataset.index);
    if (miinat.includes(index)) {
      ruutu.src = cross.src;
    } else {
      ruutu.src = check.src;
    }
    ruutu.classList.add("locked");
  });
}
document.querySelectorAll(".kysymys").forEach((img) => {
  img.classList.add("locked");
});

let mines = [];
let minescount = 0;
function luomiinat(miinamaara) {
  minefield.innerHTML = "";
  select.addEventListener("input", function (e) {
    miinamaara = Number(e.target.value);

    console.log("Miinat:", mines);
  });
  const miinat = [];

  while (miinat.length < miinamaara) {
    const random = Math.floor(Math.random() * 25);
    if (!miinat.includes(random)) {
      miinat.push(random);
    }
  }
  for (let i = 0; i < 25; i++) {
    const box = document.createElement("div");
    const kysymysclone = kysymys.cloneNode(true);
    kysymysclone.style.display = "block";

    kysymysclone.style.height = "104px";
    kysymysclone.style.width = "104px";
    kysymysclone.classList.add("cell");
    kysymysclone.classList.add("clone");
    kysymysclone.dataset.index = i;
    kysymysclone.addEventListener("click", function (e) {
      const index = Number(e.target.dataset.index);

      if (miinat.includes(index)) {
        e.target.src = cross.src;
        lose.innerHTML = "Hävisit";
        lose.style.color = "red";
        lose.style.fontSize = "30px";

        document.querySelectorAll(".kysymys").forEach((img) => {
          img.classList.add("locked");
          document.querySelector("#start").classList.remove("locked");
          document.querySelector("#select").classList.remove("locked");

          showall(miinat);
        });
      } else {
        e.target.src = check.src;
      }
    });

    box.appendChild(kysymysclone);
    minefield.appendChild(box);
  }
}
start.addEventListener("click", function () {
  if (select.value != "") {
    luomiinat(select.value);
    document.querySelectorAll(".kysymys").forEach((img) => {
      img.classList.remove("locked");
    });

    document.querySelector("#start").classList.add("locked");
    document.querySelector("#select").classList.add("locked");
  }
});
luomiinat();
