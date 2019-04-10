let small = false;

function openTab(evt, tab) {
    if (small === false) {
        if (tab !=  'me') {
            big2Small(evt, tab);
            small = true;
        } else {
            changeTab(evt, tab);
        }
    } else {
        if (tab == 'me') {
            small2Big(evt, tab);
            small = false;
        } else {
            changeTab(evt, tab);
        }
    }
}

function changeTab(evt, tab) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}

function big2Small(a, b) {
    copy('nameB', 'nameCopy', "", "");
    copy('occB', 'occCopy', a, b);
    document.getElementById('me').style.display = 'none';
    moveName('occCopy', 'occS', "", "");
    moveName('nameCopy', 'nameS', a, b);
    //document.getElementById('occCopy').parentNode.removeChild(document.getElementById('occCopy'));
    //document.getElementById('nameCopy').parentNode.removeChild(document.getElementById('nameCopy'));
}

function small2Big(a, b) {
    copy('nameS', 'nameCopy', "", "");
    copy('occS', 'occCopy', a, b);

    moveName('occCopy', 'occB', "", "");
    moveName('nameCopy', 'nameB', a, b);
}

function moveName(from, to, a, b) {
    let end = document.getElementById(to);
    let style = {};

    style['font-size'] = window.getComputedStyle(end).fontSize;
    style['top'] = end.getBoundingClientRect().top + 'px';
    style['left'] = end.getBoundingClientRect().left + 'px';
    style['line-height'] = $('#' + to).height();
    style['color'] = window.getComputedStyle(end).color;
    $('#' + from).animate(style, {
                        duration: 1000,
                        complete: function() {
                            document.getElementById(from).parentNode.removeChild(document.getElementById(from));
                            if (a != "") {
                                changeTab(a, b);
                            }
                        }
    });
}

function copy(id, newId) {
    let orig = document.getElementById(id);
    let div = document.createElement('div');
    div.innerHTML = orig.textContent;
    // div.style.width = window.getComputedStyle(orig).width;
    // div.style.height = window.getComputedStyle(orig).height;

    div.style.fontSize = window.getComputedStyle(orig).fontSize;
    div.style.top = orig.getBoundingClientRect().top + 'px';
    div.style.left = orig.getBoundingClientRect().left + 'px';
    div.style.backgroundColor = "transparent";
    div.style.position = 'fixed';
    div.style.fontFamily = window.getComputedStyle(orig).fontFamily;
    div.style.color = window.getComputedStyle(orig).color;
    div.id = newId;
    div.style.lineHeight = window.getComputedStyle(orig).lineHeight;
    document.body.appendChild(div);
}