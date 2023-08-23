var notes_no = 0;

function new_notes() {
  document.getElementById("popup").style.display = "block";
  document
    .querySelectorAll("* :not(html,body,meta,title,link,main,.popup,#bold)")
    .forEach((element) => {
      element.style.opacity = 0.8;
    });
  document
    .querySelectorAll(".dis-button")
    .forEach((element) => (element.disabled = true));
}

function cancel() {
  document.getElementById("popup").style.display = "none";
  document
    .querySelectorAll("* :not(html,body,meta,title,link,main,.popup)")
    .forEach((element) => {
      element.style.opacity = 1;
    });
  document
    .querySelectorAll(".dis-button")
    .forEach((element) => (element.disabled = false));
}

function notecancel(noteid) {
  localStorage.removeItem("note_" + String(noteid) + "_main");
  localStorage.removeItem("note_" + String(noteid) + "_head");
  localStorage.setItem("noteno", --notes_no);
  document.getElementById("list-items").innerHTML = "";
  load();
}

function add_note() {
  heading = document.getElementById("heading").value;
  main = document.getElementById("content").value;
  if (heading != "" && main != "") {
    notes_no++;
    previous = document.getElementById("list-items").innerHTML;

    document.getElementById("list-items").innerHTML =
      `<li><h4>${heading}</h4><p>${main}</p>
      <span id="note${notes_no}" onclick="notecancel(${notes_no})" class="note-cancel">X</span>
      </</li>` + previous;

    document.getElementById("heading").value = "";
    document.getElementById("content").value = "";

    localStorage.setItem("note_" + String(notes_no) + "_main", main);
    localStorage.setItem("note_" + String(notes_no) + "_head", heading);
    localStorage.setItem("noteno", notes_no);
    cancel();
  }
}

function load() {
  current_no = localStorage.getItem("noteno");
  if (current_no != null) {
    notes_no = current_no;
    for (let i = current_no, new_i = 1; i > 0; i--, new_i++) {
      current_main = localStorage.getItem("note_" + String(i) + "_main");

      current_head = localStorage.getItem("note_" + String(i) + "_head");

      previous = document.getElementById("list-items").innerHTML;

      document.getElementById("list-items").innerHTML =
        previous +
        `<li><h4>${current_head}</h4><p>${current_main}</p>
        <span id="note${new_i}" onclick="notecancel(${new_i})" class="note-cancel">X</span></li>`;
    }
  }
}
