let small = false;
let curr_moving = false;
function openTab(evt, tab) {

    let mode = $("#data").css('font-size');
    // mode 1 = normal, 2 = only tabs, 3 = only name
    if (mode === '1px') {
        if (small === false ) {
            if (tab !== 'me' && !curr_moving) {
                curr_moving = true;
                big2Small(evt, tab);
                small = true;
                changeTab(evt, tab);
            } else if (tab ==='me') {
                changeTab(evt, tab);
            }
        } else {
            if (tab === 'me' && !curr_moving) {
                changeTab(evt, tab);
                curr_moving = true;
                small2Big(evt, tab);
                small = false;
            } else if (tab !=='me') {
                changeTab(evt, tab);
            }


        }
    } else if (mode == '2px') {
        changeTab(evt, tab);
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
    copy('nameB', 'nameCopy', true);
    copy('occB', 'occCopy', true);

    document.getElementById('nameB').style.visibility = 'hidden';
    document.getElementById('occB').style.visibility = 'hidden';

    document.getElementById('small').style.display = 'block';
    document.getElementById('nameS').style.visibility = 'hidden';
    document.getElementById('occS').style.visibility = 'hidden';

    moveName('occCopy', 'occS');
    moveName('nameCopy', 'nameS');
}

function small2Big() {
    copy('nameS', 'nameCopy', false);
    copy('occS', 'occCopy', false);

    document.getElementById('small').style.display = 'none';

    moveName('occCopy', 'occB');
    moveName('nameCopy', 'nameB');
}

function moveName(from, to) {
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
                            document.getElementById(to).style.visibility = 'visible';
                            document.getElementById(from).parentNode.removeChild(document.getElementById(from));
                            curr_moving = false;
                        }
    });
}

function copy(id, newId, big) {
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
    if (big) {
        div.style.lineHeight = window.getComputedStyle(orig).lineHeight;
    }
    document.body.appendChild(div);
}