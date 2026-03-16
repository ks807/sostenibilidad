function changeSection(section) {
    const sections = document.getElementsByClassName("select");
    for (let i = 0; i < sections.length; i++)
        document.getElementById(sections[i].value).style.display = "none";
    document.getElementById(section.value).style.display = "block";
}