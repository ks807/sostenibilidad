function changeSection(section) {
    for (let sec of document.getElementsByClassName("section"))
        sec.style.display = "none";
    document.getElementById(section.id.replace("a-", "")).style.display = "block";
}