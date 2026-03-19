function changeSection(section) {
    for (let sec of document.getElementsByClassName("section"))
        sec.style.display = "none";
    document.getElementById(section.id.replace("a-", "")).style.display = "block";
}

function changeODS(ods) {
    for (let sec of document.getElementsByClassName("ODS-desc"))
        sec.style.display = "none";
    for (let sec of document.getElementsByClassName(ods))
        sec.style.display = "block";
}
