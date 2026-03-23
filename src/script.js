function changeSection(section) {
    for (let sec of document.getElementsByClassName("section"))
        sec.style.display = "none";
    document.getElementById(section.replace("a-", "")).style.display = "block";
    localStorage.setItem("page", section);
}

function changeODS(ods) {
    for (let sec of document.getElementsByClassName("ODS-desc"))
        sec.style.display = "none";
    for (let sec of document.getElementsByClassName(ods))
        sec.style.display = "block";
    localStorage.setItem("ods", ods);
}

changeSection(localStorage.getItem("page") || "part-1");
changeODS(localStorage.getItem("ods") || "ODS4");
document.getElementById("dark").checked = localStorage.getItem('theme') === 'true' || false;

